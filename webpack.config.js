const webpack = require("webpack");
const path = require("path");

module.exports = (env, argv) => {
  const isDev = argv.mode === "development";
  if (!isDev) {
    return {
      watch: true,

      devtool: "source-map",

      entry: "./src/index.js",

      output: {
        path: `${__dirname}/dist`,
        filename: "index.js",
        libraryTarget: "umd"
      },

      module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            use: "babel-loader"
          }
        ]
      },

      externals: {
        react: "react"
      },

      resolve: {
        extensions: [".js", ".json", ".jsx"]
      }
    };
  }
  return {
    watch: true,

    target: "web",

    devtool: "inline-source-map",

    entry: ["@babel/polyfill", path.join(__dirname, "example/src/index.js")],

    output: {
      path: path.join(__dirname, "build"),
      publicPath: "/",
      filename: "bundle.js",
      libraryTarget: "umd",
      hotUpdateChunkFilename: "hot/hot-update.js",
      hotUpdateMainFilename: "hot/hot-update.json"
    },

    devServer: {
      contentBase: path.join(__dirname, "example"),
      publicPath: "/",
      compress: true,
      hot: true,
      overlay: true,
      port: 8080
    },

    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          use: "babel-loader"
        }
      ]
    },

    resolve: {
      extensions: [".js", ".json", ".jsx"]
    },

    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin()
    ]
  };
};
