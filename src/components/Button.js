import Handlebars from 'handlebars';

export const Button = ({ label, type = 'button' }) =>
  Handlebars.compile(`<button type={{ type }} >{{ label }}</button>`)({ label, type });
