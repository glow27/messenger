import { Block } from "../utils/block";

const template = `
  <form class="form">
    <h3>{{ formTitle }}</h3>
    {{#each fields}}
      {{{ this }}}
    {{/each}}
    {{{ button }}}
    {{{ link }}}
  </form>`;

export class Form extends Block {
  constructor(props) {
    super("div", props);
  }

  init() {
    const currentElement = this.getContent();
    currentElement?.classList.add("centeredContainer");
  }

  render() {
    return this.compile(template, {
      formTitle: this.props.formTitle,
      button: this.props.button,
      fields: this.props.fields,
      link: this.props.link,
    });
  }
}
