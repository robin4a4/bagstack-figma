export enum PluginException {
  NoComponentPage,
  TooManyComponentPage,
}

export const PluginExceptionMessage = {
  [PluginException.NoComponentPage]:
    "There is no components page. Please put all your comnponents in this page.",
  [PluginException.NoComponentPage]: "There is too many components page.",
};
