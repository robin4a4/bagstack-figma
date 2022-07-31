class TailwindClasses {
    constructor(componentNode) {
        this.node = componentNode;
    }
    padding() {
        let horizontalPadding;
        if (this.node.paddingRight > 0 &&
            this.node.paddingRight === this.node.paddingLeft) {
            horizontalPadding = `px-${this.node.paddingRight}`;
        }
        else {
            horizontalPadding = `pl-${this.node.paddingLeft} pr-${this.node.paddingRight}`;
        }
        return this.node.paddingRight;
    }
}
