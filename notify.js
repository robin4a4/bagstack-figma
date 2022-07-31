import { PluginExceptionMessage } from "./consts";
export default function notify(pluginException) {
    return figma.notify(PluginExceptionMessage[pluginException]);
}
