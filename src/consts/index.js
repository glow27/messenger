export const routes = {
  signin: '/signin',
  signup: '/signup'
}

export const singinFormFields = [
  { fieldLabel: 'Login', fieldName: 'login' },
  { fieldLabel: 'Password', fieldName: 'password' },
];

export const singupFormFields = [
  { fieldLabel: 'Email', fieldName: 'email' },
  { fieldLabel: 'First name', fieldName: 'first_name' },
  { fieldLabel: 'Second name', fieldName: 'second_name' },
  { fieldLabel: 'Phone', fieldName: 'phone' },
  ...singinFormFields,
  { fieldLabel: 'Repeat password', fieldName: 'repeatPass' },
];
