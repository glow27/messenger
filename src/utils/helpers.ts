import { UnknownObject } from '../types/common';

const errorMessages = {
  email: 'enter valid email address',
  first_name: 'only letters and starts with uppercase letter',
  second_name: 'only letters and starts with uppercase letter',
  phone: 'only digits, can start with a "+", 10-15 signs',
  login:'no spaces and special symbols',
  password: '8-40 signs, at least one digit and uppercase letter',
  repeatPass: 'invalid password',
}

export function getFormValues(e: Event) {
  const formData = new FormData(e.target as HTMLFormElement);
  const data = Object.fromEntries(formData as unknown as Iterable<unknown[]>);

  return data
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

export function validatePasswordMatch(e: Event, field?: string) {
  const currentElement = e.target as HTMLInputElement

  const passwordInput = document.querySelector(`input[name="${field ?? 'password'}"]`) as HTMLInputElement

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

export function merge(lhs: UnknownObject, rhs: UnknownObject): UnknownObject {
  for (const p in rhs) {
    if (!rhs.hasOwnProperty(p)) {
      continue;
    }

    try {
      if ((rhs[p] as object).constructor === Object) {
        rhs[p] = merge(lhs[p] as UnknownObject, rhs[p] as UnknownObject);
      } else {
        lhs[p] = rhs[p];
      }
    } catch (e) {
      lhs[p] = rhs[p];
    }
  }

  return lhs;
}

export function set(object: UnknownObject | unknown, path: string, value: unknown): UnknownObject | unknown {
  if (typeof object !== 'object' || object === null) {
    return object;
  }

  if (typeof path !== 'string') {
    throw new Error('path must be string');
  }

  const result = path.split('.').reduceRight<UnknownObject>((acc, key) => ({
    [key]: acc,
  }), value as UnknownObject);

  return merge(object as UnknownObject, result);
}
