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

  div() {
    return `
    <div class="${this.classes}">
        test
    </div>
    `;
  }

  span() {
    return `
    <span class="${this.classes}">
        test
    </span>
    `;
  }

  p() {
    return `
    <p class="${this.classes}">
        test
    </p>
    `;
  }

  generateElement() {
    return {
      [Element.Button]: this.button(),
      [Element.Form]: this.form(),
      [Element.Div]: this.div(),
      [Element.Span]: this.span(),
      [Element.P]: this.p(),
    }[this.elementName()];
  }
}
