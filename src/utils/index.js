export const isExternalLink = link => {
  return /^https?:\/\//.test(link)
}

export const slugify = str => {
  const RE = /[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g
  const REPLACEMENT = '-'
  const WHITESPACE = /\s/g

  return str
    .trim()
    .replace(RE, '')
    .replace(WHITESPACE, REPLACEMENT)
    .toLowerCase()
}

export const getFileUrl = (sourcePath, path) => {
  sourcePath = sourcePath || '.'

  // Remove trailing slash in `sourcePath`
  // Since `path` always starts with slash
  sourcePath = sourcePath.replace(/\/$/, '')

  const result = sourcePath + path

  return result.replace(/^\.\//, '')
}

export const getFilenameByPath = path => {
  // Ensure path always starts with slash
  path = path.replace(/^\/?/, '/')

  // Add .md suffix
  if (!/\.md$/.test(path)) {
    path = /\/$/.test(path) ? `${path}README.md` : `${path}.md`
  }

  return path
}

export const getCurrentOverrideByPath = path => {
  path = path.replace(/^\/?/, '')

  const index = path.indexOf('/-')
  if (index !== -1) {
    return path.substring(0, index)
  }
  return ''
}

export const removeOverrideInPath = path => {
  const index = path.indexOf('/-')
  if (index === -1) {
    return path
  }
  return path.substr(index + 2)
}

export const inBrowser = typeof window !== 'undefined'
