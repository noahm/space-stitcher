const path = require("path");
const hwp = require("html-webpack-plugin");
const package = require("./package.json");

module.exports = {
  entry: "./src/main.ts",
  devtool: "source-map",
  resolve: {
    extensions: [".ts", ".js"]
  },
  output: {
    filename: "[name].js",
    sourceMapFilename: "[file].map",
    path: path.resolve(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|bmp|wav|mp3)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              emitFile: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new hwp({
      title: package.description,
      favicon: "favicon.png"
    })
  ]
};
