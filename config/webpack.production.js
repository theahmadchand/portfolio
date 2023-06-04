const path = require("path");
const { merge } = require("webpack-merge");
const webpackConfig = require("../webpack.config");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = () => ({
    mode: "production",
    // output: {
    //     filename: "bundle.js",
    // },
    // module: {
    //     rules: [
    //         {
    //             test: /\.css$/,
    //             use: [MiniCssExtractPlugin.loader, "css-loader"],
    //         },
    //     ],
    // },
    // plugins: [new MiniCssExtractPlugin()],
});
