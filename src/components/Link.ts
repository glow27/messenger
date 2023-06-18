import Handlebars from 'handlebars';

interface LinkProps {
  href: string;
  linkText: string;
}

export const Link = ({ href, linkText }: LinkProps) =>
  Handlebars.compile(`<a href={{ href }}>{{ linkText }}</a>`)({
    href,
    linkText,
  });
