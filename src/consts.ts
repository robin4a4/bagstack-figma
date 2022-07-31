export enum PluginException {
  NoComponentPage,
  TooManyComponentPage,
  propertyNotInTailwindSizes,
}

export const PluginExceptionMessage = {
  [PluginException.NoComponentPage]:
    "There is no components page. Please put all your comnponents in this page.",
  [PluginException.TooManyComponentPage]: "There is too many components page.",
  [PluginException.propertyNotInTailwindSizes]:
    "The following property is not in the available tailwind sizes:",
};
