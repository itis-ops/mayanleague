#!/usr/bin/env node
/**
 * Starts a single Next.js dev server for mayanleague.
 * Refuses to spawn duplicates (common cause of multi‑GB RAM use with Turbopack).
 */
import { spawn } from 'node:child_process'
import { execSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PROJECT_ROOT = path.resolve(__dirname, '..')
const PID_FILE = path.join(PROJECT_ROOT, '.next', 'dev-server.pid')
const PORT = Number(process.env.PORT || process.env.DEV_PORT || 3000)
const NEXT_BIN = path.join(PROJECT_ROOT, 'node_modules', '.bin', 'next')

function readPid() {
  try {
    const value = Number(fs.readFileSync(PID_FILE, 'utf8').trim())
    return Number.isFinite(value) ? value : null
  } catch {
    return null
  }
}

function isRunning(pid) {
  try {
    process.kill(pid, 0)
    return true
  } catch {
    return false
  }
}

function pidsOnPort(port) {
  try {
    const out = execSync(`lsof -iTCP:${port} -sTCP:LISTEN -t`, { encoding: 'utf8' }).trim()
    if (!out) return []
    return out.split('\n').map((line) => Number(line.trim())).filter(Number.isFinite)
  } catch {
    return []
  }
}

function removePidFile() {
  try {
    fs.unlinkSync(PID_FILE)
  } catch {
    /* already gone */
  }
}

function writePid(pid) {
  fs.mkdirSync(path.dirname(PID_FILE), { recursive: true })
  fs.writeFileSync(PID_FILE, String(pid), 'utf8')
}

function stopProcessTree(pid) {
  if (!isRunning(pid)) return
  try {
    execSync(`pkill -TERM -P ${pid}`, { stdio: 'ignore' })
  } catch {
    /* no children */
  }
  try {
    process.kill(pid, 'SIGTERM')
  } catch {
    /* already stopped */
  }
}

const stalePid = readPid()
if (stalePid) {
  if (isRunning(stalePid)) {
    console.error(`\n⚠️  Mayan League dev server is already running (pid ${stalePid}).`)
    console.error(`   → http://localhost:${PORT}`)
    console.error(`\n   Stop it first:  npm run dev:stop\n`)
    process.exit(1)
  }
  removePidFile()
}

const portPids = pidsOnPort(PORT)
if (portPids.length > 0) {
  console.error(`\n⚠️  Port ${PORT} is already in use (pid ${portPids.join(', ')}).`)
  console.error('   Another app may be holding it.')
  console.error(`   Try:  PORT=3005 npm run dev`)
  console.error('   Or stop the other process before starting mayanleague.\n')
  process.exit(1)
}

if (!fs.existsSync(NEXT_BIN)) {
  console.error('Next.js is not installed. Run: npm install')
  process.exit(1)
}

console.log(`Starting mayanleague dev server on http://localhost:${PORT}\n`)

const child = spawn(NEXT_BIN, ['dev', '-p', String(PORT)], {
  cwd: PROJECT_ROOT,
  stdio: 'inherit',
  env: {
    ...process.env,
    MAYANLEAGUE_DEV_GUARD: '1',
  },
})

writePid(child.pid)

function shutdown(signal) {
  removePidFile()
  if (!child.killed) {
    child.kill(signal)
  }
}

child.on('exit', (code, signal) => {
  removePidFile()
  if (signal) {
    process.exit(1)
  }
  process.exit(code ?? 0)
})

child.on('error', (error) => {
  removePidFile()
  console.error(error.message)
  process.exit(1)
})

process.on('SIGINT', () => shutdown('SIGINT'))
process.on('SIGTERM', () => shutdown('SIGTERM'))
