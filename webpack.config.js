const createExpoWebpackConfigAsync = require("@expo/webpack-config");

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);
  config.resolve.alias["react-native$"] = "react-native-web";
  config.resolve.alias["react-native-maps"] = "@teovilla/react-native-web-maps";
  config.resolve.alias["@teovilla/react-native-web-maps/src/utils/region"] =
    "../../utils/region";
  return config;
};
