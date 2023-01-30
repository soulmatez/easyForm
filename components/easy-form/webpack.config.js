const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
 
module.exports = {
    mode: 'production', // 环境
    entry: './index.js', // 入口文件
    output: {
        path: path.resolve(__dirname, './dist'), // 输出文件夹
        filename: 'easyform.js', // 文件名称
        libraryTarget: 'umd', // 打包方式
        globalObject: 'this', // 全局对象
        library: 'easyform', // 类库名称
    },
    plugins: [
        new CleanWebpackPlugin(), // 清除上一次打包内容
    ],
    externals: {
        jquery: "jQuery", // 不参与打包编译
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    { loader: 'style-loader' },
                    {
                    loader: 'css-loader',
                    options: {
                        modules: true
                    }
                    },
                    { loader: 'sass-loader' }
                ]
            },
            {
                test: /\.vue$/,  // .需要通过\转义
                loader: 'vue-loader', // 自动加载模块功能
            },
            //{test: /\.js$/, loader: 'babel-loader'},
            {
                test: /\.js$/,
                exclude: /(node_modul|bower_components)/,
                use: {
                    loader:"babel-loader"
                },
                exclude: /node_modules/,
                include: path.resolve(__dirname, 'src')
            }
        ]
    }
}