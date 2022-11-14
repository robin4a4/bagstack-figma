/// <reference types="plugin-typings" />
declare type TailwindSizesObj = {
    [x in number]: string;
};
export declare type AcceptedNodes = ComponentNode | FrameNode | InstanceNode;
declare class TailwindClassesBase {
    node: AcceptedNodes | TextNode;
    tailwindSizes: TailwindSizesObj;
    constructor(componentNode: AcceptedNodes | TextNode);
    isInTailwindSizes(propertyValue: number): boolean;
    color(styleId: string): string;
}
export declare class TailwindClasses extends TailwindClassesBase {
    node: AcceptedNodes;
    isAutoLayout(): boolean;
    padding(): string;
    display(): string;
    gap(): string;
    borderRadius(): string;
    background(): string;
    border(): string;
    borderColor(): string;
    generateClass(): string;
}
export declare class TailwindFontClasses extends TailwindClassesBase {
    node: TextNode;
    fontSize(): string;
    textCase(): any;
    textDecoration(): any;
    fontWeight(): string;
    generateClass(): string;
}
export {};
