const 
    Webpack = require("webpack"),
    webpackConfig = require("./webpack.config.dev");
    webpackDevMiddleware = require('webpack-dev-middleware'),
    Express = require('express'),
    path = require('path');

const devClient = path.resolve(__dirname, 'dev-client')
const 
    app = Express(),
    port = 7000;

webpackConfig.entry.main = [devClient].concat(webpackConfig.entry.main);

const compiler = Webpack(webpackConfig);


app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
    stats: {
        colors: true
    }
}))

// wdbpack-hot-middleware
var hotMiddleware = require('webpack-hot-middleware')(compiler)

compiler.plugin('compilation', function (compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
        hotMiddleware.publish({ action: 'reload' })
        cb()
    })
})

app.use(hotMiddleware)

app.listen(port,function() {
    console.log(`Hello xshaobaozi Express localhost:${port}`)
});