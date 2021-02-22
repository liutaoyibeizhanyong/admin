const moment = require('moment');
const TerserPlugin = require('terser-webpack-plugin')
const FileManageerPlugin = require('filemanager-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'components': '@/components',
        'views': '@/views',
      }
    },
  },
  //打包去掉console.log (通过npm包 terser-webpack-plugin 来实现)
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true;
      const plugins = [];
      const fileTimeName = moment().format('YYYY-MM-DD-HHmm');
      plugins.push(
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: true,
              drop_debugger: true
            }
          },
          cache: true, // 启用文件缓存
          parallel: true // 使用多进程并行运行来提高构建速度
          // sourceMap: false // 映射错误信息到模块
        })
      )
      plugins.push(
        new FileManageerPlugin({
          onEnd: {
            //创建目录
            mkdir: ['./tempzip/' + 'dist'],
            //复制文件到tempzip
            copy: [{
              source: './dist',
              destination: './tempzip/' + 'dist'
            },],
            //打包temzip，输出到根目录下
            archive: [{
              source: './tempzip/',
              destination: `dist-web-time:${fileTimeName}.zip`
            }],
            //删除tempzip
            delete: [
              './tempzip/'
            ]
          }
        })
      );
      config.plugins = [
        ...config.plugins,
        ...plugins
      ]
    }
  },
  chainWebpack: (config) => {
    config.module.rule('js').use('babel-loader')
    config.entry('main').add('babel-polyfill')
    // 开启图片压缩
    config.module.rule('images')
      .test(/\.(png|gif|jpe?g|svg)(\?.*)?$/)
      .use('image-webpack-loader')
      .loader('image-webpack-loader')
      .options({
        bypassOnDebug: true
      })
      .tap(options => Object.assign(options, {
        limit: 6140
      }))
    // 开启js、css压缩
    if (process.env.NODE_ENV === 'production') {
      config.plugin('compressionPlugin')
        .use(new CompressionPlugin({
          test: /\.js$|\.html$|.\css/, // 匹配文件名
          threshold: 10240, // 对超过10k的数据压缩
          deleteOriginalAssets: false // 不删除源文件
        }))
    }

  },
  productionSourceMap: false,
  publicPath: process.env.BASE_URL,
  outputDir: 'dist', // 运行时生成的生产环境构建文件的目录(默认''dist''，构建之前会被清除)
  assetsDir: 'static', //放置生成的静态资源(js、css、img、fonts)的(相对于 outputDir 的)目录(默认'')
  indexPath: 'home.html', //指定生成的 home.html 的输出路径(相对于 outputDir)也可以是一个绝对路径。
  lintOnSave: false, // 是否在保存的时候检查
  devServer: { // 环境配置
    // host: '192.168.2.42',
    port: 8086,
    https: false,
    hotOnly: false,
    open: true, //配置自动启动浏览器
    proxy: {
      '/api': {
        target: "http://demo-backapi.hntamu.com/",
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    },
  },
};
