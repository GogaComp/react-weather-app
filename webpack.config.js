const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // extract css
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); // clean dist folder
const HtmlWebpackPlugin = require("html-webpack-plugin"); // for html

module.exports = {
  entry: "./src/index.js", // main entry
  output: {
    path: path.join(__dirname + "/dist"), // path to build
    chunkFilename: "js/[hash].bundle.js", // chunk name
    filename: "js/bundle.js", // output js file
  },
  module: {
    rules: [
      {
        test: /\.js$/, // all js
        exclude: /node_modules/, // not node_modules
        use: {
          loader: "babel-loader", // babel for react and ES6 to ES5
        },
      },
      {
        test: /\.scss$/, // all scss
        use: [
          "style-loader", // loader for styles
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader", // loader for css
            options: {
              sourceMap: true, // create sourcemaps
            },
          },
          "postcss-loader", // postcss
          {
            // sass
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(jpg|png|webp|ico|svg)$/,
        use: {
          loader: "file-loader", // loader for all files
          options: {
            name: "img/[name].[ext]", // keep name
          },
        },
      },
    ],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: "styles",
          test: /\.scss$/,
          chunks: "all",
          enforce: true,
        },
      },
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/[name].css", // css output file
      chunkFilename: "css/[hash].css", // css hash
    }),
    new CleanWebpackPlugin(), // clean dist
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      favicon: "./src/favicon.svg",
      filename: "./index.html",
    }), // html support
  ],
};
