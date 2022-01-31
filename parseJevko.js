export const parseJevko = (str, {
  opener = '[',
  closer = ']',
  escaper = '`'
} = {}) => {
  const parents = []
  let parent = {subjevkos: []}, buffer = '', isEscaped = false
  let line = 1, column = 1
  for (let i = 0; i < str.length; ++i) {
    const c = str[i]

    if (isEscaped) {
      if (c === escaper || c === opener || c === closer) {
        buffer += c
        isEscaped = false
      } else throw SyntaxError(`Invalid escape at ${line}:${column}!`)
    } else if (c === escaper) {
      isEscaped = true
    } else if (c === opener) {
      const jevko = {subjevkos: []}
      parent.subjevkos.push({prefix: buffer, jevko})
      parents.push(parent)
      parent = jevko
      buffer = ''
    } else if (c === closer) {
      parent.suffix = buffer
      buffer = ''
      if (parents.length < 1) throw SyntaxError(`Unexpected close at ${line}:${column}!`)
      parent = parents.pop()
    } else {
      buffer += c
    }

    if (c === '\n') {
      ++line
      column = 1
    } else {
      ++column
    }
  }
  if (isEscaped || parents.length > 0) throw SyntaxError(`Unexpected end!`)
  parent.suffix = buffer
  parent.opener = opener
  parent.closer = closer
  parent.escaper = escaper
  return parent
}