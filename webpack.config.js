module.exports = {
    // mode: 'production',
    entry:{
        bundle : __dirname + '/src/index.js' 
    },
    output:{
        path: __dirname + '/dist',
        filename: '[name].js'
    },
    /**
     * webpack@4版本之前可以这样写
     */
    // module:{
    //     loaders:[{
    //         test: /\.js$/,
    //         loader: 'babel?presets=es2015'
    //     }]
    // },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                options: {
                    presets: [[
                        "@babel/preset-env",
                        {
                            useBuiltIns: "usage"
                        }
                    ]]
                }
            }
        ]
    }
}