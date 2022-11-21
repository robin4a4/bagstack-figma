/// <reference types="plugin-typings" />
import { Element } from "./consts";
import { AcceptedNodes } from "./TailwindClasses";
export default class HtmlElement {
    node: AcceptedNodes | TextNode;
    classes: string;
    classAttr: string;
    elementName: Element | string;
    componentName: string;
    constructor(componentNode: AcceptedNodes | TextNode);
    button(): string;
    form(): string;
    div(): string;
    span(): string;
    p(): string;
    text(): string;
    svg(): any;
    generateElement(): any;
}
