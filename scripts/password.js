const LATIN_ALPHABET = 'abcdefghijklmnopqrstuvwxyz'

/* Experimental function chaining
const chain = (thing, fns) => {
  let copy = thing

  if (Array.isArray(thing)) copy = thing.slice()

  for (let i = 0; i < fns.length; i++) {
    copy = fns[i](copy)
  }

  return copy
}
*/

const intoArray = str => str.split('')
// Cannot use toString() because it is a property of window
const intoString = arr => arr.join('')

const getRandomEl = arr => arr[Math.floor(Math.random() * arr.length)]
const shuffle = (arr) => {
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
const trim = str => str.replace(/^\s+|\s+$/g, '')

const sets = {
  uppercase: LATIN_ALPHABET.toUpperCase(),
  lowercase: LATIN_ALPHABET,
  numbers: '0123456789',
  symbols: '?!@#$%^&*()-_=+[]{}/\\|:;\'",.<>',
  spaces: ' '
}

// Transform all strings into arrays
for (const key of Object.keys(sets)) {
  sets[key] = intoArray(sets[key])
}

const def = {
  sets,
  length: 16,
  uppercase: true,
  lowercase: true,
  numbers: true,
  symbols: true,
  spaces: true
}

const generate = (custom = {}) => {
  // Use Object.assign() to overwrite any default values
  // {} is passed in to avoid mutation
  const config = Object.assign({}, def, custom)
  config.sets = Object.assign({}, sets, custom.sets || {})

  let fullSet = []
  // Build collection of all sets
  for (const key of Object.keys(config.sets)) {
    if (config[key]) {
      // Guarantee that the password contains
      // at least one character from each set
      // password.push(getRandomEl(config.sets[key]))
      fullSet = fullSet.concat(config.sets[key])
    }
  }

  const password = []
  // Select random character from total set each time
  // Add until the password is the desired length
  while (password.length < config.length) password.push(getRandomEl(fullSet))

  while (password[0] === ' ' || password[password.length - 1] === ' ') {
    password = shuffle(password)
  }

  // Human-readable and usable format
  return intoString(password)
}
