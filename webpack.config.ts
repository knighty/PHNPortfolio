// Generated using webpack-cli https://github.com/webpack/webpack-cli

import path from "path";
import webpack from 'webpack';
import MiniCssExtractPlugin from "mini-css-extract-plugin";

const isProduction = process.env.NODE_ENV == 'production';

const rules = {
    typescript: {
        test: /\.(ts|tsx)$/i,
        loader: 'ts-loader',
        exclude: ['/node_modules/'],
    },

    static: {
        test: /\.(eot|svg|ttf|woff|woff2|gif|wav|mp3)$/i,
        type: 'asset/resource',
        generator: {
            filename: "[name].[hash][ext]",
        }
    },

    css: {
        test: /\.s[ac]ss$/i,
        use: [
            {
                loader: MiniCssExtractPlugin.loader,
                options: {
                },
            },
            "css-loader",
            "sass-loader"
        ],
        /*type: "asset/resource",
        generator: {
            filename: '[name].css'
        }*/
    },

    data: {
        test: /\.(jpg|png)$/i,
        use: [{
            loader: "data-loader",
            options: {
                filename: "images/[filename].[size].[contenthash].[ext]",
                quality: 70
            },
        }],
        //type: "asset/resource",
    }
}

const config: webpack.Configuration = {
    cache: {
        type: 'filesystem'
    },
    entry: {
        main: './static/js/scripts.ts',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        //clean: true,
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css",
        }),
    ],
    module: {
        rules: [rules.data, rules.typescript, rules.css, rules.static],
    },
    resolveLoader: {
        alias: {
            'data-loader': path.resolve(__dirname, 'data-loader.ts'),
        },
    },
    optimization: {
        usedExports: true,
        moduleIds: "deterministic",
        splitChunks: {
            cacheGroups: {
                styles: {
                    test: /style\.scss/,
                    name: "style",
                    type: "css/mini-extract",
                    chunks: "all",
                    enforce: true,
                },
                dark: {
                    test: /dark\.scss/,
                    name: "dark",
                    type: "css/mini-extract",
                    chunks: "all",
                    enforce: true,
                },
            },
        },
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js', '...'],
    },
    mode: "production",
};

if (isProduction) {
    config.mode = 'production';
} else {
    config.mode = 'development';
    config.devtool = 'source-map';
}

export default config;

/*module.exports = () => {
    if (isProduction) {
        config.mode = 'production';
    } else {
        config.mode = 'development';
        config.devtool = 'source-map';
    }

    return config;
};*/