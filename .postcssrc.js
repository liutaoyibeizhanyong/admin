// module.exports = {
//   plugins: {
//     // 配置使用 autoprefixer 插件
//     // 作用：生成浏览器 CSS 样式规则前缀
//     // VueCLI 内部已经配置了 autoprefixer 插件
//     // 所以又配置了一次，所以产生冲突了 所以需要删掉 'autoprefixer'
//     //'autoprefixer': {
//     //browsers: ['Android >= 4.0', 'iOS >= 8']
//     //},
//     // 配置使用 postcss-pxtorem 插件
//     // 作用：把 px 转为 rem
//     "postcss-import": {},
//     "postcss-url": {},
//     // to edit target browsers: use "browserslist" field in package.json
//     "autoprefixer": {},

//     'postcss-pxtorem': {
//       //通过查阅文档我们可以看到 rootValue 支持两种参数类型：
//       //数字：固定值
//       //函数：动态计算返回
//       //postcss-pxtorem 处理每个 CSS 文件的时候都会来调用这个函数
//       //它会把被处理的 CSS 文件相关的信息通过参数传递给该函数
//       //rootValue: 37.5,
//       rootValue({
//         file
//       }) {
//         //将 vant 组件 rem 设置成 37.5  自己写的样式设置为 75 这样就不需要考虑二倍图 除二了
//         return file.indexOf('vant') !== -1 ? 80 : 80
//       },
//       // （数组）可以从px更改为rem的属性。
//       // 值必须完全匹配。
//       // 使用通配符*启用所有属性。例：['*']
//       // *在单词的开头或结尾使用。（['*position*']会匹配background-position-y）
//       // 用于!与属性不匹配。例：['*', '!letter-spacing']
//       // 将“not”前缀与其他前缀组合在一起。例：['*', '!font*']
//       propList: ['*'],
//       //       数组）要忽略的选择器并保留为px。
//       // 如果value是string，则检查selector是否包含字符串。
//       // ['body'] 会匹配 .body-class
//       // 如果value是regexp，它会检查选择器是否与正则表达式匹配。
//       // [/^body$/]会匹配body但不会.body
//       selectorBlackList: [],
//       //替换包含rems的规则，而不是添加回退。
//       replace: true,
//       //允许在媒体查询中转换px。
//       mediaQuery: false,
//       //设置要替换的最小像素值。
//       minPixelValue: 4
//     }
//   }
// }
