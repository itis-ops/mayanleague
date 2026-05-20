#!/usr/bin/env node
/**
 * Stops the mayanleague dev server started via `npm run dev`.
 */
import { execSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PROJECT_ROOT = path.resolve(__dirname, '..')
const PID_FILE = path.join(PROJECT_ROOT, '.next', 'dev-server.pid')
const PORT = Number(process.env.PORT || process.env.DEV_PORT || 3000)

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

function removePidFile() {
  try {
    fs.unlinkSync(PID_FILE)
  } catch {
    /* already gone */
  }
}

function stopProcessTree(pid) {
  if (!isRunning(pid)) return false
  try {
    execSync(`pkill -TERM -P ${pid}`, { stdio: 'ignore' })
  } catch {
    /* no child processes */
  }
  try {
    process.kill(pid, 'SIGTERM')
    return true
  } catch {
    return false
  }
}

const pid = readPid()
let stopped = false

if (pid) {
  stopped = stopProcessTree(pid)
  removePidFile()
}

if (stopped) {
  console.log(`Stopped mayanleague dev server (pid ${pid}).`)
} else {
  try {
    const out = execSync(`lsof -iTCP:${PORT} -sTCP:LISTEN -t`, { encoding: 'utf8' }).trim()
    if (out) {
      console.log(`No pid file, but port ${PORT} is in use (pid ${out.split('\n')[0]}).`)
      console.log('If that is an old mayanleague server, stop it manually or run:')
      console.log(`  kill ${out.split('\n')[0]}`)
    } else {
      console.log('No mayanleague dev server is running.')
    }
  } catch {
    console.log('No mayanleague dev server is running.')
  }
  removePidFile()
}
