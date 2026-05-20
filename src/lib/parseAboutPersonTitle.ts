export function parseAboutPersonTitle(title: string) {
  const commaIndex = title.indexOf(',')

  if (commaIndex === -1) {
    return { name: title, role: '' }
  }

  return {
    name: title.slice(0, commaIndex).trim(),
    role: title.slice(commaIndex + 1).trim(),
  }
}

export function aboutPersonInitials(name: string) {
  return name
    .replace(/^Dr\.\s*/i, '')
    .split(/\s+/)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}
