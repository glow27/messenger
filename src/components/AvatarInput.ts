import { Block } from "../utils/block";
import emptyAva from "../../static/emptyAva.png";

interface ButtonProps {
  label: string;
  type?: "button" | "submit" | "reste";
}

const template = `
    <label class="avatarLabel"><img class="avatarImg" src=${emptyAva} width="120" height="120" />
    <input type="file" class="avatarInput" name="avatar" accept="image/png, image/jpeg" /></label>`;

export class AvatarInput extends Block {
  constructor(props) {
    super("div", props);
  }

  init() {
    const currentElement = this.getContent();
    currentElement?.classList.add("avatarContainer");
  }

  render() {
    return this.compile(template, {});
  }
}
