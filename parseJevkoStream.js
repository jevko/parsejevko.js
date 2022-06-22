// todo: rename to parseJevkoChunks?
export const parseJevkoStream = ({
  opener = '[',
  closer = ']',
  escaper = '`'
} = {}) => {
  const parents = []
  let parent = {subjevkos: []}, prefix = '', h = 0, isEscaped = false
  let line = 1, column = 1

  const self = {
    chunk(str) {
      for (let i = 0; i < str.length; ++i) {
        const c = str[i]

        if (isEscaped) {
          if (c === escaper || c === opener || c === closer) isEscaped = false
          else throw SyntaxError(`Invalid digraph (${escaper}${c}) at ${line}:${column}!`)
        } else if (c === escaper) {
          prefix += str.slice(h, i)
          h = i + 1
          isEscaped = true
        } else if (c === opener) {
          const jevko = {subjevkos: []}
          parent.subjevkos.push({prefix: prefix + str.slice(h, i), jevko})
          prefix = ''
          h = i + 1
          parents.push(parent)
          parent = jevko
        } else if (c === closer) {
          parent.suffix = prefix + str.slice(h, i)
          prefix = ''
          h = i + 1
          if (parents.length < 1) throw SyntaxError(`Unexpected closer (${closer}) at ${line}:${column}!`)
          parent = parents.pop()
        }
    
        if (c === '\n') {
          ++line
          column = 1
        } else {
          ++column
        }
      }
      prefix += str.slice(h)
      h = 0
      return self
    },
    end() {
      if (isEscaped) throw SyntaxError(`Unexpected end after escaper (${escaper})!`)
      if (parents.length > 0) throw SyntaxError(`Unexpected end: missing ${parents.length} closer(s) (${closer})!`)
      parent.suffix = prefix
      parent.opener = opener
      parent.closer = closer
      parent.escaper = escaper
      return parent
    }
  }

  return self
}