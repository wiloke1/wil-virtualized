module.exports = function(api) {
  api.cache(true);
  return {
    presets: ["@babel/preset-env", "@babel/preset-react", "@babel/preset-flow"],
    plugins: [
      "@babel/plugin-transform-arrow-functions",
      "@babel/plugin-proposal-class-properties",
      "@babel/plugin-transform-flow-strip-types"
    ]
  };
};
