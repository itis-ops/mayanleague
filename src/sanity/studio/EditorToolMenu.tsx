import type { ToolMenuProps } from 'sanity'

/** Tools shown to content editors (no Vision, no Releases). */
const EDITOR_TOOL_ORDER = ['structure', 'presentation'] as const

export function EditorToolMenu(props: ToolMenuProps) {
  const tools = EDITOR_TOOL_ORDER.flatMap((name) => {
    const tool = props.tools.find((entry) => entry.name === name)
    return tool ? [tool] : []
  })

  return props.renderDefault({ ...props, tools })
}
