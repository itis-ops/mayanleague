/**
 * Sanity CLI configuration. Used by `npx sanity` commands (e.g. dataset import,
 * `sanity dataset export`, `sanity manage`). The Studio mount itself does not
 * depend on this file — it just lets the CLI know which project to target.
 */
import { defineCliConfig } from 'sanity/cli'

import { dataset, projectId } from './src/sanity/env'

export default defineCliConfig({
  api: { projectId, dataset },
})
