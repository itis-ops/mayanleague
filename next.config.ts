import type { NextConfig } from 'next'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const projectRoot = path.dirname(fileURLToPath(import.meta.url))

const nextConfig: NextConfig = {
  // Pin Turbopack to this app so parent workspace lockfiles do not hijack the dev server.
  turbopack: {
    root: projectRoot,
  },
}

export default nextConfig
