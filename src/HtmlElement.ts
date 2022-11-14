import { Element, PluginException } from "./consts";
import { notify } from "./helpers";
import {
  AcceptedNodes,
  TailwindClasses,
  TailwindFontClasses,
} from "./TailwindClasses";

export default class HtmlElement {
  node: AcceptedNodes | TextNode;
  classes: string;
  classAttr: string;

  constructor(componentNode: AcceptedNodes | TextNode) {
    this.node = componentNode;
    this.classes =
      this.node.type === "TEXT"
        ? new TailwindFontClasses(this.node).generateClass()
        : new TailwindClasses(this.node).generateClass();

    this.classAttr = this.classes !== " " ? ` class="${this.classes}"` : "";
  }

  nameArray() {
    const nameArray = this.node.name.split("/");
    if (nameArray.length < 2) {
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

  svg() {
    return null;
  }

  generateElement() {
    return {
      [Element.Button]: this.button(),
      [Element.Form]: this.form(),
      [Element.Div]: this.div(),
      [Element.Span]: this.span(),
      [Element.P]: this.p(),
      [Element.Svg]: this.svg(),
    }[this.elementName()];
  }
}
