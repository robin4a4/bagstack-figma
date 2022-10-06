import { PluginException } from "./consts";
import { notify } from "./helpers";
import HtmlElement from "./HtmlElement";

figma.showUI(__html__, { themeColors: true, width: 700, height: 900 });

figma.ui.onmessage = (msg) => {
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
          const result = treeBrowsing(el);
          figma.ui.postMessage({ result, name: el.name });
        });
    }
    if (componentsPage) {
      traverse(componentsPage);
    }
  }
};

function treeBrowsing(node): string {
  const html = new HtmlElement(node).generateElement();
  if (node.children && node.children.length > 0) {
    let result = "";
    node.children.forEach((element) => {
      result += treeBrowsing(element);
    });
    return html.replace("$children", result);
  } else {
    if (node.characters) {
      return html.replace("$children", node.characters);
    }
    return html.replace("$children", "");
  }
}
