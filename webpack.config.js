const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

process.env.NODE_ENV = "development";

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "js/built.js",
    path: path.resolve(__dirname, "build"),
  },
  //loader
  module: {
    rules: [
      {
        // 符合哪些文件
        test: /\.(css|less)$/,
        //使用哪些loader
        use: [
          //use loader 執行順序，從右到左 or 從下到上
          //生成 style tag，將 js 中的樣式插入進行，添加到 head 中
          // "style-loader", // 2
          //replace style-loader, extract css from .js file
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "../",
            },
          },
          //將 css 轉成 commonjs module 載入 js 中，內容為 string
          "css-loader", // 1
          {
            // css compatible using postcss -> postcss-loader, postcss-preset-env
            loader: "postcss-loader",
            options: {
              //postcss 的 plugin
              //help postcss find the configuration of browerslist in package.json
              postcssOptions: {
                plugins: ["postcss-preset-env"],
              },
            },
          },
          { loader: "less-loader" },
        ],
      },
      {
        test: /\.(jpg|png|gif)$/,
        // 只有一個 loader
        //download url-loader file-loader
        loader: "url-loader", //compress file, compare to file-loader
        options: {
          limit: 8 * 1024,
          // turn off es6 module, use commonjs (html-loader)
          esModule: false,
          //[hash:10] 取 hash 前 10 位
          //[ext] 原檔名
          name: "[hash:10].[ext]",
          outputPath: "imgs",
        },
      },
      {
        test: /\.html$/,
        //handle image in .html, then can be load by url-loader
        loader: "html-loader",
        // outputPath: "medias",
      },
      {
        //打包其他資源（html/js/css以外的資源）
        exclude: /\.(css|html|js|less|json|jpg|png|gif)$/,
        loader: "file-loader",
        options: {
          name: "[hash:10].[ext]",
          outputPath: "media",
        },
      },
    ],
  },
  //plugins
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "css/built.css",
    }),
  ],
  //mode
  mode: "development", //開發模式
  //devServer: auto compile, launch browser, auto refresh... (live server)
  //no output file
  devServer: {
    //build directory
    contentBase: path.resolve(__dirname, "build"),
    //gzip compress
    compress: true,
    port: 4000,
    //auto launch browser
    open: true,
  },
};
