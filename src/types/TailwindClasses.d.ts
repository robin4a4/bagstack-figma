/// <reference types="plugin-typings" />
declare type TailwindSizesObj = {
    [x in number]: string;
};
declare class TailwindClassesBase {
    node: ComponentNode;
    tailwindSizes: TailwindSizesObj;
    constructor(componentNode: ComponentNode);
    isInTailwindSizes(propertyValue: number): boolean;
    isAutoLayout(): boolean;
}
export default class TailwindClasses extends TailwindClassesBase {
    padding(): string;
    display(): string;
    gap(): string;
    borderRadius(): "rounded" | "rounded-md" | "sdfjhsk";
    generateClass(): string;
}
export {};
