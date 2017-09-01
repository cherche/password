# password.js

A configurable JavaScript password generator.

## Configuration

Passwords are generated using the `generate()` function.

To configure the generator, pass in a JavaScript object as the first argument.

```javascript
generate({ length: 100 })
```

The default object is as follows:

```javascript
{
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
```

You may pick and choose which properties to change. Omitting a property will leave it to be its default.

Any object within the `config` object is considered a set. A set consists of two parts:

`enabled`: whether or not it will used in generation,
`chars`: and the characters in it (in a string).

This means that you may create additional sets for the generator to use.

```javascript
const config = {
  ampersands: {
    // Omitting the `enabled` property in a custom
    // set will have it default to `true`
    chars: '&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&'
  }
}

generate(config)
```
```
>> '&&F.>f\&&&\kI-fU'
```

Keep in mind that duplicate characters are not removed from the aggregate set and each character has an equal chance of being selected regardless of its set.
