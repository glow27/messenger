import Handlebars from 'handlebars';

export const Link = ({ href, linkText }) =>
  Handlebars.compile(`<a href={{ href }}>{{ linkText }}</a>`)({
    href,
    linkText,
  });
