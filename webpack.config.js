const pathModule =require("path")
const TerserPlugin = require("terser-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports={

    entry:"./src/index.js",
    output:{
        filename:"bundle.js",
        path: pathModule.resolve(__dirname,"dist"),
        assetModuleFilename: 'images/[name][ext]'
    },
    mode:"development",
    module: {
        rules: [
          {
            test: /\.css$/i,
            use: [MiniCssExtractPlugin.loader, 'css-loader'],
          },
          {
            test: /\.s[ac]ss$/i,
            use: [
              // Creates `style` nodes from JS strings
              MiniCssExtractPlugin.loader,
              // Translates CSS into CommonJS
              "css-loader",
              // Compiles Sass to CSS
              "sass-loader",
            ],
          },
          {
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
            type: 'asset/resource',
          },
        ],
      },
    plugins:[
         new HtmlWebpackPlugin(),
        new MiniCssExtractPlugin(),
        new ImageMinimizerPlugin({
            minimizerOptions: {
              // Lossless optimization with custom option
              // Feel free to experiment with options for better result for you
              plugins: [
                ['gifsicle', { interlaced: true }],
                ['optipng', { optimizationLevel: 5 }],
                ['mozjpeg', { quality: 60 }],
                [
                  'svgo',
                  {
                    plugins: [
                      {
                        removeViewBox: false,
                      },
                    ],
                  },
                ],
              ],
            },
          }),
          new CssMinimizerPlugin(),
          new CleanWebpackPlugin()
    ],
    optimization:{
        minimize: true,
        minimizer: [
            '...'
           /*  , new TerserPlugin({
                extractComments: true,
            }), */
        ]
    }
    /* ,devServer: {
        contentBase: pathModule.join(__dirname, 'dist'),
        port: 9000,
      }, */
}