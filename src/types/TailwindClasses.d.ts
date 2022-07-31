/// <reference types="plugin-typings" />
export default class TailwindClasses {
    node: ComponentNode;
    tailwindSizes: {
        1: string;
        2: string;
        4: string;
        8: string;
        12: string;
        14: string;
        16: string;
        20: string;
        24: string;
        32: string;
        40: string;
        48: string;
        56: string;
        64: string;
        72: string;
        80: string;
        88: string;
        96: string;
        104: string;
        112: string;
    };
    constructor(componentNode: ComponentNode);
    isInTailwindSizes(property: any): boolean;
    padding(): string;
    generateClass(): string;
}
