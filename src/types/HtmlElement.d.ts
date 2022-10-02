import { AcceptedNodes } from "./TailwindClasses";
export default class HtmlElement {
    node: AcceptedNodes;
    classes: string;
    classAttr: string;
    constructor(componentNode: AcceptedNodes);
    nameArray(): string[];
    elementName(): string;
    componentName(): string;
    button(): string;
    form(): string;
    div(): string;
    span(): string;
    p(): string;
    generateElement(): string;
}
