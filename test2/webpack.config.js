const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

// process.env.NODE_ENV = "development";

// tree shaking -> remove unused code -> 1. es6 module, 2. production mode
// sideEffects: false -> all codes have no sideEffect -> all can be tree shaking
// may remove css/@babel/polyfill or others
// solution: sideEffects: ["*.css", "*.less",...]

const commonCssLoader = [
  {
    loader: MiniCssExtractPlugin.loader,
    options: { publicPath: "../" },
  },
  "css-loader",
  {
    loader: "postcss-loader",
    options: {
      postcssOptions: {
        plugins: ["postcss-preset-env"],
      },
    },
  },
];

// const commonCssLoader = ["style-loader", "css-loader"];

module.exports = {
  entry: ["./src/index.js", "./public/index.html"],
  output: {
    // hash: if alter entry file, the imported file will also create a new hash,
    // meaning all the file cache will be updated in the browser
    // chunkhash: if bundled items are from the same file,
    // chunkhash will be the same, file cache will also be updated
    // contenthash: creating hash according to content
    filename: "js/built.[contenthash:10].js",
    path: resolve(__dirname, "build"),
  },
  module: {
    rules: [
      {
        // only the first matching Rule is used when the Rule matches.
        oneOf: [
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
              cacheDirectory: true,
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
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/built.[contenthash:10].css",
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      minify: true,
    }),
    new OptimizeCssAssetsWebpackPlugin(),
    new ESLintPlugin({
      fix: true,
    }),
    new CleanWebpackPlugin(),
  ],
  mode: "production",
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
  // mapping source code, indicating error code.
  devtool: "eval-source-map",
  // development
  // inline|eval|cheap...
  // speed: eval-cheap > eval > inline > cheap ...
  // production
  // hidden|nosources...
};
