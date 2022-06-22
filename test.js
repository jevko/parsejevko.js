import {parseJevko} from './parseJevko.js'

import {assert} from './devDeps.js'

const parsed = parseJevko(`Name [Horse]

Conservation status [Domesticated]
Scientific classification [
  \`[Kingdom\`] [Animalia]
  Phylum [Chordata]
  Class [Mammalia]
  Order [Perissodactyla]
  Family [Equidae]
  Genus [Equus]
  Species [E. ferus]
  Subspecies [E. f. caballus]
]
Trinomial name [
  [Equus ferus caballus]
  [Linnaeus, 1758]
] 
Synonyms [at least 48 published]`)

Deno.test('parseJevko', () => {
  assert(parsed.subjevkos.length === 5)
  assert(parsed.suffix === "")
  
  assert(parsed.subjevkos[2].jevko.subjevkos.some(({prefix}) => prefix.includes(" [Kingdom] ")), JSON.stringify(parsed.subjevkos[2].jevko.subjevkos, null, 2))
  
  try {
    parseJevko(`
  this should crash [
    with unexpected \`] at 5:1
  ]
]`)
  } catch (e) {
    assert(e.message.includes('5:1'), e)
  }
})

Deno.test('slicing optimization', () => {
  assert(parseJevko(`  \`\`\`\`aaa\`[bbb\`]\`]ccc\`\`  `).suffix === '  ``aaa[bbb]]ccc`  ')
  assert(parseJevko(`  \`\`\`\`aaa\`[bbb\`]\`]ccc\`\`  []`).subjevkos[0].prefix === '  ``aaa[bbb]]ccc`  ')
})