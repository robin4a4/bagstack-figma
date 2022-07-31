export var PluginException;
(function (PluginException) {
    PluginException[PluginException["NoComponentPage"] = 0] = "NoComponentPage";
    PluginException[PluginException["TooManyComponentPage"] = 1] = "TooManyComponentPage";
})(PluginException || (PluginException = {}));
export const PluginExceptionMessage = {
    [PluginException.NoComponentPage]: "There is no components page. Please put all your comnponents in this page.",
    [PluginException.NoComponentPage]: "There is too many components page.",
};
