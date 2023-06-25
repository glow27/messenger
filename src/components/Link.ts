import { Block } from "../utils/block";

interface LinkProps {
  href: string;
  linkText: string;
}

const template = `{{ linkText }}`

export class Link extends Block {
  constructor(props) {
    super("a", props);
  }

  init() {
    const currentElement = this.getContent();

    if (currentElement) {
      const { href } = this.props;

      currentElement.setAttribute("href", href);
    }

    
  }

  render() {
    const { linkText } = this.props;

    return this.compile(template, { linkText });
  }
}
