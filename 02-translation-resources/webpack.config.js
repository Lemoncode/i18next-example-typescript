const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");
const basePath = __dirname;

module.exports = {
  context: path.resolve(basePath, "src"),
  resolve: {
    extensions: [".js", ".ts", ".tsx"],
  },
  entry: {
    app: ["./index.tsx"],
  },
  devtool: "eval-source-map",
  stats: "errors-only",
  output: {
    filename: "[name].[chunkhash].js",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "index.html",
      scriptLoading: "blocking",
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "locales"),
          to: path.resolve(__dirname, "dist/locales"),
        },
      ],
    }),
  ],
};
