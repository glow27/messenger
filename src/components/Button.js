import Handlebars from 'handlebars';

export const Button = ({ label }) =>
  Handlebars.compile(`<button>{{ label }}</button>`)({ label });
