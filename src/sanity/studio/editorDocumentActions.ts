import type {
  DocumentActionComponent,
  NewDocumentOptionsContext,
  TemplateItem,
} from 'sanity'

const SINGLETON_TYPES = new Set([
  'homepage',
  'siteSettings',
  'aboutPage',
  'boardOfDirectorsPage',
  'ourPathPage',
  'coreValuesPage',
  'jobOpportunitiesPage',
])

/** Hide scheduling / release actions — editors publish directly. */
function withoutSchedulingActions(actions: DocumentActionComponent[]) {
  return actions.filter(({ action }) => {
    const id = String(action ?? '').toLowerCase()
    return !id.includes('schedule') && !id.includes('release')
  })
}

export function resolveDocumentActions(
  prev: DocumentActionComponent[],
  context: { schemaType: string },
): DocumentActionComponent[] {
  let actions = withoutSchedulingActions(prev)

  if (SINGLETON_TYPES.has(context.schemaType)) {
    actions = actions.filter(
      ({ action }) =>
        action !== 'duplicate' && action !== 'delete' && action !== 'unpublish',
    )
  }

  return actions
}

export function resolveNewDocumentOptions(
  prev: TemplateItem[],
  context: NewDocumentOptionsContext,
) {
  if (context.creationContext.type === 'global') {
    return prev.filter((template) => !SINGLETON_TYPES.has(template.templateId))
  }
  return prev
}
