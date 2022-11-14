import { PluginException } from "./consts";
import { notify } from "./helpers";

type TailwindSizesObj = { [x in number]: string };

export type AcceptedNodes = ComponentNode | FrameNode | InstanceNode;

class TailwindClassesBase {
  node: AcceptedNodes | TextNode;
  tailwindSizes: TailwindSizesObj;

  constructor(componentNode: AcceptedNodes | TextNode) {
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
    if (!propertyValue) return false;
    return Object.keys(this.tailwindSizes).includes(propertyValue.toString());
  }

  color(styleId: string) {
    const paintStyle = figma.getStyleById(styleId);
    return paintStyle?.name.replace("/", "-");
  }
}

export class TailwindClasses extends TailwindClassesBase {
  node: AcceptedNodes;

  isAutoLayout() {
    return this.node.layoutMode !== "NONE";
  }

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
    if (typeof cornerRadius == "number") {
      if (cornerRadius === 4) return "rounded";
      if (cornerRadius === 8) return "rounded-md";
      if (cornerRadius > 100) return "rounded-full";
    } else {
      const topLeftRadius = this.node.topLeftRadius;
      const topRightRadius = this.node.topRightRadius;
      const bottomLeftRadius = this.node.bottomLeftRadius;
      const bottomRightRadius = this.node.bottomRightRadius;
      const cornerRadiusArray = [];
      if (topLeftRadius === topRightRadius) {
        if (topRightRadius === 4) cornerRadiusArray.push("rounded-t");
        if (topRightRadius === 8) cornerRadiusArray.push("rounded-t-md");
        if (topRightRadius > 100) cornerRadiusArray.push("rounded-t-full");
      } else {
        if (topRightRadius === 4) cornerRadiusArray.push("rounded-tr");
        if (topRightRadius === 8) cornerRadiusArray.push("rounded-tr-md");
        if (topLeftRadius === 4) cornerRadiusArray.push("rounded-tl");
        if (topLeftRadius === 8) cornerRadiusArray.push("rounded-tl-md");
        if (topLeftRadius > 100) cornerRadiusArray.push("rounded-tl-full");
      }
      if (bottomLeftRadius === bottomRightRadius) {
        if (bottomRightRadius === 4) cornerRadiusArray.push("rounded-b");
        if (bottomRightRadius === 8) cornerRadiusArray.push("rounded-b-md");
        if (bottomRightRadius > 100) cornerRadiusArray.push("rounded-b-full");
      } else {
        if (bottomRightRadius === 4) cornerRadiusArray.push("rounded-br");
        if (bottomRightRadius === 8) cornerRadiusArray.push("rounded-br-md");
        if (bottomLeftRadius === 4) cornerRadiusArray.push("rounded-bl");
        if (bottomLeftRadius === 8) cornerRadiusArray.push("rounded-bl-md");
        if (bottomLeftRadius > 100) cornerRadiusArray.push("rounded-bl-full");
      }
      return cornerRadiusArray.join(" ");
    }
  }

  background() {
    if (
      typeof this.node.fillStyleId === "string" &&
      this.node.fillStyleId !== ""
    ) {
      return `bg-${this.color(this.node.fillStyleId)}`;
    }
  }

  border() {
    if (!this.node.strokeStyleId) return;
    const strokeWeight = this.node.strokeWeight;
    const borderTop = this.node.strokeTopWeight;
    const borderBottom = this.node.strokeBottomWeight;
    const borderLeft = this.node.strokeLeftWeight;
    const borderRight = this.node.strokeRightWeight;
    const hasCustomBorder =
      strokeWeight | borderTop | borderBottom | borderLeft | borderRight;

    if (strokeWeight && !hasCustomBorder) {
      return `border-${strokeWeight}`;
    } else {
      const borderArray = [];
      if (borderTop) {
        if (borderTop === borderBottom) {
          borderArray.push(`border-y-${borderTop}`);
        } else {
          borderArray.push(`border-t-${borderTop}`);
        }
      } else if (borderBottom) {
        borderArray.push(`border-b-${borderBottom}`);
      }
      if (borderLeft) {
        if (borderLeft === borderRight) {
          borderArray.push(`border-x-${borderLeft}`);
        } else {
          borderArray.push(`border-l-${borderLeft}`);
        }
      } else if (borderRight) {
        borderArray.push(`border-r-${borderRight}`);
      }
      return borderArray.join(" ");
    }
  }

  borderColor() {
    if (
      typeof this.node.fillStyleId === "string" &&
      this.node.fillStyleId !== ""
    )
      return;
    return `border-${this.color(this.node.strokeStyleId)}`;
  }

  generateClass() {
    return [
      this.display(),
      this.gap(),
      this.padding(),
      this.borderRadius(),
      this.background(),
      this.border(),
      this.borderColor(),
    ]
      .filter((item) => item)
      .join(" ");
  }
}

export class TailwindFontClasses extends TailwindClassesBase {
  node: TextNode;

  fontSize() {
    if (this.node.type === "TEXT" && typeof this.node.fontSize === "number") {
      return `font-${this.node.fontSize}`;
    }
  }

  textCase() {
    if (this.node.type === "TEXT") {
      const mapTextCase = {
        ORIGINAL: "normal-case",
        UPPER: "uppercase",
        LOWER: "lowercase",
        TITLE: "capitalize",
      };
      return mapTextCase[this.node.textCase];
    }
  }

  textDecoration() {
    if (this.node.type === "TEXT") {
      const mapTextDecoration = {
        NONE: "",
        UNDERLINE: "underline",
        STRIKETHROUGH: "line-through",
      };
      return mapTextDecoration[this.node.textDecoration];
    }
  }

  fontWeight() {
    // @ts-ignore
    if (this.node.type === "TEXT" && typeof this.node.fontWeight === "number") {
      const mapWeightToString = {
        100: "thin",
        200: "extralight",
        300: "light",
        400: "normal",
        500: "medium",
        600: "semibold",
        700: "bold",
        800: "extrabold",
        900: "black",
      };
      // @ts-ignore
      return `font-${mapWeightToString[this.node.fontWeight]}`;
    }
  }

  generateClass() {
    return [
      this.fontSize(),
      this.fontWeight(),
      this.textDecoration(),
      this.textCase(),
    ]
      .filter((item) => item)
      .join(" ");
  }
}
