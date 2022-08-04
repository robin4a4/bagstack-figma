import { Element, PluginException } from "./consts";
import { notify } from "./helpers";
import TailwindClasses from "./TailwindClasses";

export default class HtmlElement {
  node: ComponentNode;
  classes: string;

  constructor(componentNode: ComponentNode) {
    this.node = componentNode;
    this.classes = new TailwindClasses(this.node).generateClass();
  }

  nameArray() {
    const nameArray = this.node.name.split("/");
    if (nameArray.length != 2) {
      notify(PluginException.wrongElementName);
      return;
    }
    return nameArray;
  }

  elementName() {
    return this.nameArray()[0];
  }

  componentName() {
    return this.nameArray()[1];
  }

  button() {
    return `
    <button type="button" class="${this.classes}">
        test
    </button>
    `;
  }

  form() {
    return `
    <form action="" method="POST" class="${this.classes}">
        test
    </form>
    `;
  }

  generateElement() {
    return {
      [Element.Button]: this.button(),
      [Element.Form]: this.form(),
    }[this.elementName()];
  }
}
