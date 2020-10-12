const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");

process.env.NODE_ENV = "development";

// const commonCssLoader = [
//   {
//     loader: MiniCssExtractPlugin.loader,
//     options: { publicPath: "../" },
//   },
//   "css-loader",
//   {
//     loader: "postcss-loader",
//     options: {
//       postcssOptions: {
//         plugins: ["postcss-preset-env"],
//       },
//     },
//   },
// ];

const commonCssLoader = ["style-loader", "css-loader"];

module.exports = {
  entry: ["./src/index.js", "./public/index.html"],
  output: {
    filename: "js/built.js",
    path: resolve(__dirname, "build"),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [...commonCssLoader],
      },
      {
        test: /\.less$/,
        use: [...commonCssLoader, "less-loader"],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: [
            [
              "@babel/preset-env",
              {
                useBuiltIns: "usage",
                corejs: 3.6,
                targets: {
                  chrome: "60",
                  firefox: "50",
                },
              },
            ],
          ],
        },
      },
      {
        test: /\.(jpg|png|gif)$/,
        loader: "url-loader",
        options: {
          limit: 8 * 1024,
          name: "[name].[ext]",
          outputPath: "imgs",
        },
      },
      {
        test: /\.html$/,
        loader: "html-loader",
        options: {
          esModule: true,
        },
      },
      {
        exclude: /\.(js|css|less|html|jpg|png|gif)/,
        loader: "file-loader",
        options: {
          outputPath: "media",
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/built.css",
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      minify: true,
    }),
    new OptimizeCssAssetsWebpackPlugin(),
    new ESLintPlugin({
      fix: true,
    }),
  ],
  mode: "development",
  devServer: {
    contentBase: resolve(__dirname, "build"),
    compress: true,
    port: 4000,
    open: true,
    hot: true,
    // HMR
    // css -> working on style-loader,
    // html -> needs to add index.html to entry to refresh, don't need HMR cause it's only one file
    // js -> add if(module.hot){} in imported file
    // restart webpack-dev-server to make it happen
  },
};
