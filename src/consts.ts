export enum PluginException {
  NoComponentPage,
  TooManyComponentPage,
  propertyNotInTailwindSizes,
  wrongElementName,
}

export const PluginExceptionMessage = {
  [PluginException.NoComponentPage]:
    "There is no components page. Please put all your comnponents in this page.",
  [PluginException.TooManyComponentPage]: "There is too many components page.",
  [PluginException.propertyNotInTailwindSizes]:
    "The following property is not in the available tailwind sizes:",
  [PluginException.wrongElementName]:
    "The component is not named correctly. It should be <Element type>/<Component name>, for example button/my-secondary-button.",
};

export enum Element {
  Button = "button",
  Div = "div",
  Span = "span",
  P = "p",
  Form = "form",
}
