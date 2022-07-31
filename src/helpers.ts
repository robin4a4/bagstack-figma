import { PluginException, PluginExceptionMessage } from "./consts";

export function notify(
  pluginException: PluginException,
  optionalMessage: string = ""
) {
  return figma.notify(
    `${PluginExceptionMessage[pluginException]} ${
      optionalMessage && ` ${optionalMessage}`
    }`
  );
}
