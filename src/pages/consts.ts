export const settingsWithId = { withId: true };

export const settingsIdandInputSelector = {
  selectorForEvent: 'input',
  withId: true,
};

export const settingsIdandFormSelector = {
  selectorForEvent: 'form',
  withId: true,
};

export function SubmitFormValues(e: Event) {
  e.preventDefault()
  const formData = new FormData(e.target as HTMLFormElement);
  const data = Object.fromEntries(formData as unknown as Iterable<unknown[]>);

  console.log(data)
}
