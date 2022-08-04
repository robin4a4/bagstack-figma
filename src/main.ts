import { PluginException } from "./consts";
import { notify } from "./helpers";
import HtmlElement from "./HtmlElement";

figma.showUI(__html__);

figma.ui.onmessage = (msg) => {
  // One way of distinguishing between different types of messages sent from
  // your HTML page is to use an object with a "type" property like this.
  if (msg.type === "extract-components") {
    const componentsPages = figma.root.children.filter(
      (page) => page.name == "components"
    );
    let componentsPage: PageNode | null = null;
    switch (componentsPages.length) {
      case 0:
        notify(PluginException.NoComponentPage);
        break;
      case 1:
        componentsPage = componentsPages[0];
        break;
      default:
        notify(PluginException.TooManyComponentPage);
    }

    function traverse(node: PageNode) {
      node
        .findAllWithCriteria({
          types: ["COMPONENT"],
        })
        .forEach((el) => {
          const html = new HtmlElement(el);
          console.log(html.generateElement());
        });
    }
    if (componentsPage) {
      traverse(componentsPage);
    }
  }

  figma.closePlugin();
};
