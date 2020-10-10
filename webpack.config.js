const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "built.js",
    path: path.resolve(__dirname, "build"),
  },
  //loader
  module: {
    rules: [
      {
        // 符合哪些文件
        test: /\.css$/,
        //使用哪些loader
        use: [
          //use loader 執行順序，從右到左 or 從下到上
          //生成 style tag，將 js 中的樣式插入進行，添加到 head 中
          "style-loader", // 2
          //將 css 轉成 commonjs module 載入 js 中，內容為 string
          "css-loader", // 1
        ],
      },
      {
        test: /\.less$/,
        //多個 loader 用 use
        use: ["style-loader", "css-loader", "less-loader"],
      },
      {
        test: /\.(jpg|png|gif)$/,
        // 只有一個 loader
        //download url-loader file-loader
        loader: "url-loader",
        options: {
          limit: 8 * 1024,
          // turn off es6 module, use commonjs
          esModule: false,
          //[hash:10] 取 hash 前 10 位
          //[ext] 原檔名
          name: "[hash:10].[ext]",
        },
      },
      {
        test: /\.html$/,
        //handle image in html file, then can be load by url-loader
        loader: "html-loader",
      },
      {
        //打包其他資源（html/js/css以外的資源）
        exclude: /\.(css|html|js|less|json|jpg|png|gif)$/,
        loader: "file-loader",
        options: {
          name: "[hash:10].[ext]",
        },
      },
    ],
  },
  //plugins
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
  //mode
  mode: "development", //開發模式
  //   mode:'production'
};
