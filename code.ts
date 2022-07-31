import { PluginException } from "./consts";
import notify from "./notify";

figma.showUI(__html__);

figma.ui.onmessage = (msg) => {
  // One way of distinguishing between different types of messages sent from
  // your HTML page is to use an object with a "type" property like this.
  if (msg.type === "extract-components") {
    const componentsPages = figma.root.children.filter(
      (page) => page.name == "components"
    );
    let componentsPage: PageNode;
    switch (componentsPages.length) {
      case 0:
        notify(PluginException.NoComponentPage);
        break;
      case 1:
        componentsPage = componentsPages[0];
      default:
        notify(PluginException.TooManyComponentPage);
    }

    function traverse(node) {
      node
        .findAllWithCriteria({
          types: ["COMPONENT_SET"],
        })
        .forEach((el) => {
          console.log(el.name, el.children);
        });
    }
    if (componentsPage) {
      traverse(componentsPage);
    }
  }

  figma.closePlugin();
};
