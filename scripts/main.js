const d = document

// const input = d.createElement('input')

let config = {}

d.addEventListener('DOMContentLoaded', () => {
  const $container = d.getElementsByClassName('config-container')[0]
  const $textarea = $container.getElementsByTagName('textarea')[0]
  const $button = $container.getElementsByTagName('button')[0]

  const $password = d.getElementsByClassName('password')[0]

  const displayPassword = () => {
    const password = generate(config)
    $password.textContent = password
  }

  $button.addEventListener('click', () => {
    try {
      config = JSON.parse($textarea.value)
    } catch (e) { console.log('Problem with configuration') }

    displayPassword()
  })

  displayPassword()
})
