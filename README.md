⚠️⚠️⚠️ DEPRECATED

parsejevko.js is now deprecated in favor of [jevko.js](https://github.com/jevko/jevko.js)

⚠️⚠️⚠️ DEPRECATED

# parsejevko.js

[![](https://data.jsdelivr.com/v1/package/gh/jevko/parsejevko.js/badge)](https://www.jsdelivr.com/package/gh/jevko/parsejevko.js)

A simple parser for Jevko in JavaScript.

## Installation

### Node.js

```
npm install jevko/parsejevko.js#semver:0.1.6
```

### Deno and the browser

Import from [jsDelivr](https://www.jsdelivr.com/):

```js
import {parseJevko} from 'https://cdn.jsdelivr.net/gh/jevko/parsejevko.js@v0.1.6/mod.js'
```

## Quickstart

```js
import {parseJevko} from 'https://cdn.jsdelivr.net/gh/jevko/parsejevko.js@v0.1.6/mod.js'

parseJevko(`hello [world]`) 
// -> {
//   "subjevkos": [
//     {
//       "prefix": "hello ",
//       "jevko": {
//         "subjevkos": [],
//         "suffix": "world"
//       }
//     }
//   ],
//   "suffix": ""
// }
```

## parseJevko

`parseJevko` takes a string which must conform to the [Standard Jevko Grammar](#standard-jevko-grammar) and returns a parse tree for it.

## Standard Jevko Grammar

This is the Standard Jevko Grammar in ABNF:

```abnf
; start symbol, main rule #1
Jevko = *Subjevko Suffix
; main rule #2, mutually recursive with #1
Subjevko = Prefix Opener Jevko Closer

; delimiters
Delimiter = Opener / Closer / Escaper

Opener  = %x5b ; left square bracket 
Closer  = %x5d ; right square bracket
Escaper = %x60 ; grave accent

; aliases
Suffix = Text
Prefix = Text

; text
Text = *Symbol
Symbol = Digraph / Character
Digraph = Escaper Delimiter
; Character is any code point which is not a Delimiter
Character = %x0-5a / %x5c / %x5e-5f / %x61-10ffff
```

For details, see [specifications](https://github.com/jevko/specifications).

## License

[MIT](LICENSE)