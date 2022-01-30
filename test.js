import {parseJevko} from './parseJevko.js'

// todo

const parsed = parseJevko(`Name [Horse]

Conservation status [Domesticated]
Scientific classification [
  Kingdom [Animalia]
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

console.assert(parsed.subjevkos.length === 5)
console.assert(parsed.suffix === "")

console.assert(parsed.subjevkos[2].jevko.subjevkos.some(({prefix}) => prefix.includes(" Kingdom ")))