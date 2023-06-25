import { Block } from "../utils/block";

interface ProfileFieldProps {
  fieldName: string;
  fieldLabel: string;
}

const template = `
  {{ fieldLabel }}
  <input type="text"  name={{ fieldName }} class="profileField" />`;

export class ProfileField extends Block {
  constructor(props) {
    super("label", props);
  }

  init() {
    const currentElement = this.getContent();
    currentElement?.classList.add("profileFieldLabel");
  }


  render() {
    const { fieldLabel, fieldName } = this.props;

    return this.compile(template, { fieldLabel, fieldName });
  }
}
