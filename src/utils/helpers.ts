export function submitFormValues(e: Event) {
  e.preventDefault()

  const formData = new FormData(e.target as HTMLFormElement);
  const data = Object.fromEntries(formData as unknown as Iterable<unknown[]>);

  console.log(data)
}

export function validateField(e: Event) {
  const currentInput = e.target as HTMLInputElement

  if (!currentInput.validity.valid) {
    currentInput.classList.add('invalidInput')
  } else {
    currentInput.classList.remove('invalidInput')
  }
}

export function validatePasswordMatch(e: Event) {
  const currentElement = e.target as HTMLInputElement

  const passwordInput = document.querySelector('input[name="password"]') as HTMLInputElement

  if (currentElement.value !== passwordInput.value) {
    currentElement.setCustomValidity('password missmatch')
    currentElement.classList.add('invalidInput')
  } else {
    currentElement.setCustomValidity('')
    currentElement.classList.remove('invalidInput')
  }

}
