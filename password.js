const LATIN_ALPHABET = 'abcdefghijklmnopqrstuvwxyz'

const toArray = str => str.split('')
const shuffle = (arr) => {
  if (arr.length === 1) return arr

  // Create copy to avoid mutation
  const copy = arr.slice()
  let i = copy.length

  while (i > 0) {
    // Get random element
    const r = Math.floor(Math.random() * i--)

    // Swap current element and random element
    ;[copy[i], copy[r]] = [copy[r], copy[i]]
  }

  return copy
}

const sets = {
  uppercase: LATIN_ALPHABET.toUpperCase(),
  lowercase: LATIN_ALPHABET,
  numbers: '0123456789',
  symbols: '?!@#$%^&*()-_=+[]{}/\\|:;\'",.<>',
  spaces: ' '
}

// Transform all strings into arrays
for (const key of Object.keys(sets)) {
  sets[key] = toArray(sets[key])
}

const def = {
  sets,
  length: 15,
  uppercase: true,
  lowercase: true,
  numbers: true,
  symbols: true,
  spaces: true
}

const generate = (custom) => {
  // Use Object.assign() to overwrite any default values
  // {} is passed in to avoid mutation
  const config = Object.assign({}, def, custom)
}
