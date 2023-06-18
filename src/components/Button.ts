import Handlebars from 'handlebars';

interface ButtonProps {
  label: string;
  type?: 'button' | 'submit' | 'reste'
}

export const Button = ({ label, type = 'button' }: ButtonProps) =>
  Handlebars.compile(`<button type={{ type }} >{{ label }}</button>`)({ label, type });
