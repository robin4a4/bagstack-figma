import { Element, PluginException } from "./consts";
import { notify } from "./helpers";
import TailwindClasses, { AcceptedNodes } from "./TailwindClasses";

export default class HtmlElement {
  node: AcceptedNodes;
  classes: string;
  classAttr: string;

  constructor(componentNode: AcceptedNodes) {
    this.node = componentNode; 
    this.classes = new TailwindClasses(this.node).generateClass();
    console.log(this.classes)
    this.classAttr = this.classes !== " " ? ` class="${this.classes}"` : "";
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
    return `<button type="button"${this.classAttr}>$children</button>`;
  }

  form() {
    return `<form action="" method="POST"${this.classAttr}>$children</form>`;
  }

  div() {
    return `<div${this.classAttr}>$children</div>`;
  }

  span() {
    return `<span${this.classAttr}>$children</span>`;
  }

  p() {
    return `<p${this.classAttr}>$children</p>`;
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
