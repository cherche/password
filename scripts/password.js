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

const isArray = Array.isArray
const isObject = thing => typeof thing === 'object' && !isArray(thing)

const intoArray = str => str.split('')
// Cannot use toString() because it is already a property of window
const intoString = arr => arr.join('')

const getRandomEl = thing => thing[Math.floor(Math.random() * thing.length)]
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

const def = {
  length: 16,
  uppercase: {
    enabled: true,
    chars: LATIN_ALPHABET.toUpperCase()
  },
  lowercase: {
    enabled: true,
    chars: LATIN_ALPHABET
  },
  numbers: {
    enabled: true,
    chars: '0123456789'
  },
  symbols: {
    enabled: true,
    chars: '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~'
  },
  spaces: {
    enabled: true,
    chars: ' '
  }
}

const generate = (overwrite = {}) => {
  // Use Object.assign() to overwrite any default values
  // {} is passed in to avoid mutation
  const config = Object.assign({}, def, overwrite)
  // Merge all child objects of def and custom
  Object.keys(overwrite)
    .filter(isObject)
    .forEach((key) => {
      config[key] = Object.assign({}, def[key], overwrite[key])
      console.log(key, config[key])
    })

  // Build collection of all enabled characters
  const fullChars = Object.keys(config)
    .filter((key) => {
      const set = config[key]
      // Idiot-proofing (though I'm guilty of it myself ...)
      // If it wasn't specified whether or not the set
      // was enabled, it will be considered enabled
      if (set.enabled === undefined) set.enabled = true

      return set.enabled
    })
    .reduce((sum, key) => {
      const set = config[key]

      return sum + set.chars
    }, '')

  let password = []
  // Select random character from total set each time
  // Add until the password is the desired length
  while (password.length < config.length) password.push(getRandomEl(fullChars))

  // Ensure that the password neither begins nor ends with a space
  while (password[0] === ' ' || password[password.length - 1] === ' ') {
    password = shuffle(password)
  }

  // Return in a human-readable and usable format
  return intoString(password)
}
