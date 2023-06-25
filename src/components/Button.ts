import { Block } from "../utils/block";

interface ButtonProps {
  label: string;
  type?: "button" | "submit" | "reste";
}

const template = `{{label}}`;

export class Button extends Block {
  constructor(props) {
    super("button", props);
  }

  init() {
    const currentElement = this.getContent();

    if (currentElement) {
      const { type = "button" } = this.props;

      currentElement.setAttribute("type", type);
    }
  }

  render() {
    const { label } = this.props;

    return this.compile(template, { label });
  }
}
