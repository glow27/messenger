import { Block } from "../utils/block";

const template = `
  <form class="form profile">
    {{{ avatar }}}
    {{#each fields}}
      {{{ this }}}
    {{/each}}
    {{{ button }}}
    {{{ link }}}
  </form>`;

export class Profile extends Block {
  constructor(props) {
    super("div", props);
  }

  init() {
    const currentElement = this.getContent();
    currentElement?.classList.add("centeredContainer");
  }

  render() {
    return this.compile(template, {
      avatar: this.props.avatar,
      button: this.props.button,
      fields: this.props.fields,
      link: this.props.link,
    });
  }
}
