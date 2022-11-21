import { Element, PluginException } from "./consts";
import { notify } from "./helpers";
import {
  AcceptedNodes,
  TailwindClasses,
  TailwindFontClasses,
} from "./TailwindClasses";

function toPascalCase(text: string) {
  return text.replace(/(^\w|-\w)/g, clearAndUpper);
}

function clearAndUpper(text: string) {
  return text.replace(/-/, "").toUpperCase();
}

export default class HtmlElement {
  node: AcceptedNodes | TextNode;
  classes: string;
  classAttr: string;
  elementName: Element | string;
  componentName: string = "";

  constructor(componentNode: AcceptedNodes | TextNode) {
    this.node = componentNode;
    this.classes =
      this.node.type === "TEXT"
        ? new TailwindFontClasses(this.node).generateClass()
        : new TailwindClasses(this.node).generateClass();

    this.classAttr = this.classes !== " " ? ` class="${this.classes}"` : "";
    const nameArray = this.node.name.split("/");
    console.log(this.node.type);
    if (nameArray.length < 2) {
      if (this.node.type === "TEXT") {
        this.elementName = Element.Text;
      } else {
        this.elementName = Element.Div;
      }
    } else {
      this.componentName = nameArray[1];
      if (this.node.type === "COMPONENT" || this.node.type === "INSTANCE") {
        this.elementName = toPascalCase(this.componentName);
      } else {
        this.elementName = nameArray[0] as Element;
      }
    }
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

  text() {
    return `$children`;
  }

  svg() {
    return null;
  }

  generateElement() {
    //@ts-ignore
    if (Object.values(Element).includes(this.elementName))
      return {
        [Element.Button]: this.button(),
        [Element.Form]: this.form(),
        [Element.Div]: this.div(),
        [Element.Span]: this.span(),
        [Element.P]: this.p(),
        [Element.Svg]: this.svg(),
        [Element.Text]: this.text(),
      }[this.elementName];

    return `<${this.elementName}/>`;
  }
}
