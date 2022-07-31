import { PluginException } from "./consts";
import { notify, objectsKeys } from "./helpers";
export default class TailwindClasses {
    node;
    tailwindSizes = {
        1: "1px",
        2: "2px",
        4: "4px",
        8: "8px",
        12: "12px",
        14: "14px",
        16: "16px",
        20: "20px",
        24: "24px",
        32: "32px",
        40: "40px",
        48: "48px",
        56: "56px",
        64: "64px",
        72: "72px",
        80: "80px",
        88: "88px",
        96: "96px",
        104: "104px",
        112: "112px",
    };
    constructor(componentNode) {
        this.node = componentNode;
    }
    isInTailwindSizes(property) {
        return objectsKeys(this.tailwindSizes).includes(property);
    }
    padding() {
        let horizontalPadding;
        let verticalPadding;
        if (!this.isInTailwindSizes(this.node.paddingLeft)) {
            notify(PluginException.propertyNotInTailwindSizes);
        }
        if (!this.isInTailwindSizes(this.node.paddingRight)) {
            notify(PluginException.propertyNotInTailwindSizes);
        }
        if (!this.isInTailwindSizes(this.node.paddingTop)) {
            notify(PluginException.propertyNotInTailwindSizes);
        }
        if (!this.isInTailwindSizes(this.node.paddingBottom)) {
            notify(PluginException.propertyNotInTailwindSizes);
        }
        if (this.node.paddingRight > 0 &&
            this.node.paddingRight === this.node.paddingLeft) {
            horizontalPadding = `px-${this.node.paddingRight}`;
        }
        else {
            horizontalPadding = `pl-${this.node.paddingLeft} pr-${this.node.paddingRight}`;
        }
        if (this.node.paddingTop > 0 &&
            this.node.paddingTop === this.node.paddingBottom) {
            verticalPadding = `px-${this.node.paddingTop}`;
        }
        else {
            verticalPadding = `pt-${this.node.paddingTop} pb-${this.node.paddingBottom}`;
        }
        return horizontalPadding;
    }
    generateClass() {
        return [this.padding].join(" ");
    }
}
