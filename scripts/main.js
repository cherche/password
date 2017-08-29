const d = document

const input = d.createElement('input')

const config = {}

d.addEventListener('DOMContentLoaded', () => {
  const password = generate(config)
  console.log(password)
  d.getElementsByClassName('password')[0].textContent = password
})
