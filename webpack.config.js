const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { merge } = require("webpack-merge");
const modeConfig = (env) => require(`./config/webpack.${env}`)(env);

// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = ({ mode, presets } = { mode: "production", presets: [] }) => {
    return merge(
        {
            mode,
            entry: {
                bundle: path.resolve(__dirname, "src/index.tsx"),
            },
            output: {
                filename: "[name].[contenthash].js",
                path: path.resolve(__dirname, "dist"),
                clean: true,
                assetModuleFilename: "[name][ext]",
            },
            devtool: "source-map",
            devServer: {
                static: {
                    directory: path.resolve(__dirname, "dist"),
                },
                port: 3000,
                open: false,
                hot: true,
                compress: true,
                historyApiFallback: true,
            },
            module: {
                rules: [
                    {
                        test: /\.js$/,
                        exclude: /node_modules/,
                        use: {
                            loader: "babel-loader",
                            options: {
                                presets: ["@babel/preset-env", "@babel/preset-react"],
                            },
                        },
                    },
                    {
                        test: /\.([cm]?ts|tsx)$/,
                        exclude: /node_modules/,
                        use: {
                            loader: "ts-loader",
                            // options: {
                            //     presets: ["@babel/preset-typescript"],
                            // },
                        },
                    },
                    {
                        test: /\.css$/i,
                        use: ["style-loader", "css-loader"],
                    },
                    {
                        test: /\.(png|jpe?g|gif|ico)$/,
                        type: "asset/resource",
                        generator: {
                            filename: "images/[name].[contenthash][ext][query]",
                        },
                    },
                    {
                        test: /\.svg$/i,
                        issuer: /\.(ts|tsx)?$/,
                        use: ["@svgr/webpack"],
                    },
                ],
            },
            resolve: {
                extensions: [".tsx", ".ts", ".jsx", ".js"],
            },
            plugins: [
                // new MiniCssExtractPlugin(),
                new HtmlWebpackPlugin({
                    title: "Ahmad's Portfolio",
                    // filename: "index.html",
                    template: "src/index.html",
                }),
                new webpack.ProgressPlugin(),
                // new BundleAnalyzerPlugin(),
            ],
        },
        modeConfig(mode)
    );
};
