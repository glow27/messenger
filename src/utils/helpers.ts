const errorMessages = {
  email: 'enter valid email address',
  first_name: 'only letters and starts with uppercase letter',
  second_name: 'only letters and starts with uppercase letter',
  phone: 'only digits, can start with a "+", 10-15 signs',
  login:'no spaces and special symbols',
  password: '8-40 signs, at least one digit and uppercase letter',
  repeatPass: 'invalid password',
}

export function submitFormValues(e: Event) {
  e.preventDefault()

  const formData = new FormData(e.target as HTMLFormElement);
  const data = Object.fromEntries(formData as unknown as Iterable<unknown[]>);

  console.log(data)
}

export function validateField(e: Event) {
  const currentInput = e.target as HTMLInputElement
  const inputName = currentInput.name as keyof typeof errorMessages
  const errorElement = document.querySelector(`input[name="${currentInput.name}"] + span`) as HTMLElement

  if (!currentInput.validity.valid) {
    currentInput.classList.add('invalidInput')
    errorElement.textContent = errorMessages[inputName]
  } else {
    currentInput.classList.remove('invalidInput')
  }
}

export function validatePasswordMatch(e: Event) {
  const currentElement = e.target as HTMLInputElement

  const passwordInput = document.querySelector('input[name="password"]') as HTMLInputElement

  const errorElement = document.querySelector(`input[name="${currentElement.name}"] + span`) as HTMLElement

  if (currentElement.value !== passwordInput.value) {
    currentElement.setCustomValidity('password missmatch')
    errorElement.textContent = 'password missmatch'
    currentElement.classList.add('invalidInput')
  } else {
    currentElement.setCustomValidity('')
    currentElement.classList.remove('invalidInput')
  }

}
