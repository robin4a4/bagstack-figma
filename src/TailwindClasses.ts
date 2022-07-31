import { PluginException } from "./consts";
import { notify } from "./helpers";

type TailwindSizesObj = { [x in number]: string };

class TailwindClassesBase {
  node: ComponentNode;
  tailwindSizes: TailwindSizesObj;

  constructor(componentNode: ComponentNode) {
    this.node = componentNode;
    this.tailwindSizes = {
      0: "0px",
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
  }

  isInTailwindSizes(propertyValue: number) {
    return Object.keys(this.tailwindSizes).includes(propertyValue.toString());
  }

  isAutoLayout() {
    return this.node.layoutMode !== "NONE";
  }
}

export default class TailwindClasses extends TailwindClassesBase {
  padding() {
    if (!this.isAutoLayout()) return; // if no autolayout there is no padding

    const paddingTop = this.node.paddingTop;
    const paddingBottom = this.node.paddingBottom;
    const paddingRight = this.node.paddingRight;
    const paddingLeft = this.node.paddingLeft;

    function getPaddingArray(
      firstPadding: number,
      secondPadding: number,
      firstPaddingString: string,
      secondPaddingString: string
    ) {
      const paddingArray = [];
      if (firstPadding > 0)
        paddingArray.push(`${firstPaddingString}-${firstPadding}`);
      if (secondPadding > 0)
        paddingArray.push(`${secondPaddingString}-${secondPadding}`);
      return paddingArray;
    }

    let horizontalPadding: string;
    let verticalPadding: string;
    if (!this.isInTailwindSizes(paddingLeft)) {
      notify(PluginException.propertyNotInTailwindSizes, "paddingLeft");
      return;
    }
    if (!this.isInTailwindSizes(paddingRight)) {
      notify(PluginException.propertyNotInTailwindSizes, "paddingRight");
      return;
    }
    if (!this.isInTailwindSizes(paddingTop)) {
      notify(PluginException.propertyNotInTailwindSizes, "paddingTop");
      return;
    }
    if (!this.isInTailwindSizes(paddingBottom)) {
      notify(PluginException.propertyNotInTailwindSizes, "paddingBottom");
      return;
    }

    if (paddingRight > 0 && paddingRight === paddingLeft) {
      horizontalPadding = `px-${paddingRight}`;
    } else {
      horizontalPadding = getPaddingArray(
        paddingRight,
        paddingLeft,
        "pr",
        "pl"
      ).join(" ");
    }

    if (
      this.node.paddingTop > 0 &&
      this.node.paddingTop === this.node.paddingBottom
    ) {
      verticalPadding = `py-${this.node.paddingTop}`;
    } else {
      verticalPadding = getPaddingArray(
        paddingTop,
        paddingBottom,
        "pt",
        "pb"
      ).join(" ");
    }
    return [horizontalPadding, verticalPadding].join(" ");
  }

  display() {
    const layoutMode = this.node.layoutMode;
    if (layoutMode === "NONE") return;
    const displayArray = ["flex"];
    if (layoutMode === "VERTICAL") displayArray.push("flex-col");
    return displayArray.join(" ");
  }

  gap() {
    if (!this.isAutoLayout()) return; // if no autolayout there is no padding
    const itemSpacing = this.node.itemSpacing;
    if (!this.isInTailwindSizes(itemSpacing)) {
      notify(PluginException.propertyNotInTailwindSizes, "itemSpacing");
      return;
    }

    return `gap-${itemSpacing}`;
  }

  borderRadius() {
    const cornerRadius = this.node.cornerRadius;
    console.log(cornerRadius);
    if (cornerRadius === 4) return "rounded";
    if (cornerRadius === 8) return "rounded-md";
  }

  generateClass() {
    return [this.display(), this.gap(), this.padding()].join(" ");
  }
}
