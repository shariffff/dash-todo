const defaultConfig = require("@wordpress/scripts/config/webpack.config.js");

if (process.env.NODE_ENV !== "production") {
  defaultConfig.devServer.server = {
    type: "https",
    options: {
      cert: "/Users/sharif/Projects/testwp/wp-content/plugins/dash-todo/localhost+2.pem",
      key: "/Users/sharif/Projects/testwp/wp-content/plugins/dash-todo/localhost+2-key.pem",
    },
  };
  defaultConfig.devServer.allowedHosts = "all";
}

module.exports = defaultConfig;
