const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");
// const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const webpack = require("webpack");
const AddAssetHtmlPlugin = require("add-asset-html-webpack-plugin");

// const isProduction = process.env.NODE_ENV === "production";

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

module.exports = {
  entry: "./src/index.js",
  // {
  //   main: "./src/index.js",
  //   print: "./src/print.js",
  // },
  output: {
    filename: "js/[name].[contenthash:10].js",
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
        use: [
          // packed with multiple thread
          // Each worker is a separate node.js process, which has an overhead
          // of ~600ms.
          // There is also an overhead of inter-process communication.
          // Use the loader only for expensive operations
          // "thread-loader",
          {
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
        ],
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
    // new BundleAnalyzerPlugin(),
    new webpack.DllReferencePlugin({
      manifest: resolve(__dirname, "dll/manifest.json"),
    }),
    new AddAssetHtmlPlugin({
      filepath: resolve(__dirname, "dll/jquery.js"),
    }),
    new MiniCssExtractPlugin({
      filename: "css/built.[hash:10].css",
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
    new WorkboxPlugin.GenerateSW({
      // these options encourage the ServiceWorkers to get in there fast
      // and not allow any straggling "old" SWs to hang around
      clientsClaim: true,
      skipWaiting: true,
    }),
  ],
  // divide node_modules files, or duplicate import files
  // the entry can be single or multiple
  // single entry should use dynamic import
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  mode: "development",
  // externals: {
  //   // ignore npm package
  //   // import from CDN
  //   jquery: "jquery",
  // },
};
