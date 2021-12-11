const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');

module.exports = {
  chainWebpack: config => {
    if (process.env.UNI_PLATFORM === 'h5') {
      // 抽取公共资源
      config
      .plugin('htmlWebpackExternalsPlugin')
      .use(HtmlWebpackExternalsPlugin)
      .tap(args => {
        if (!args[0]) args[0] = {};
        args[0] = {
          externals: [
            {
              module: 'jweixin',
              entry: '//res.wx.qq.com/open/js/jweixin-1.6.0.js',
            },
            {
              module: 'app-bridge',
              entry: 'https://cdn-hz.renrenjiang.cn/html/js/app-bridge.js',
            },
            {
              module: 'vConsole',
              entry: 'https://cdn.bootcss.com/vConsole/3.3.4/vconsole.min.js',
            },
            {
              module: 'debug',
              entry: 'https://cdn-hz.renrenjiang.cn/html/js/debug.js',
            },
          ],
        };
        return args;
      })
    }
  },
};
