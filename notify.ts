import { PluginException, PluginExceptionMessage } from "./consts";

export default function notify(pluginException: PluginException) {
  return figma.notify(PluginExceptionMessage[pluginException]);
}
