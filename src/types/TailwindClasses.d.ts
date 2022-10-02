/// <reference types="plugin-typings" />
declare type TailwindSizesObj = {
    [x in number]: string;
};
export declare type AcceptedNodes = ComponentNode | FrameNode | InstanceNode;
declare class TailwindClassesBase {
    node: AcceptedNodes;
    tailwindSizes: TailwindSizesObj;
    constructor(componentNode: AcceptedNodes);
    isInTailwindSizes(propertyValue: number): boolean;
    isAutoLayout(): boolean;
    color(styleId: string): string;
}
export default class TailwindClasses extends TailwindClassesBase {
    padding(): string;
    display(): string;
    gap(): string;
    borderRadius(): string;
    background(): string;
    border(): string;
    borderColor(): string;
    generateClass(): string;
}
export {};
