#!/usr/bin/env node
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
    return Number(fs.readFileSync(PID_FILE, 'utf8').trim())
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

const pid = readPid()
const alive = pid && isRunning(pid)

if (alive) {
  console.log(`running  pid=${pid}  http://localhost:${PORT}`)
} else {
  console.log('stopped')
  if (pid) {
    console.log(`(stale pid file removed: was ${pid})`)
    try {
      fs.unlinkSync(PID_FILE)
    } catch {
      /* ignore */
    }
  }
}

try {
  const listeners = execSync(`lsof -iTCP:3000-3010 -sTCP:LISTEN -P -n`, { encoding: 'utf8' }).trim()
  if (listeners) {
    console.log('\nOther listeners on 3000–3010:')
    console.log(listeners)
  }
} catch {
  /* none */
}
