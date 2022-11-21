/// <reference types="plugin-typings" />
import { AcceptedNodes } from "./TailwindClasses";
export default class HtmlElement {
    node: AcceptedNodes | TextNode;
    classes: string;
    classAttr: string;
    constructor(componentNode: AcceptedNodes | TextNode);
    nameArray(): string[];
    elementName(): string;
    componentName(): string;
    button(): string;
    form(): string;
    div(): string;
    span(): string;
    p(): string;
    svg(): any;
    generateElement(): any;
}
