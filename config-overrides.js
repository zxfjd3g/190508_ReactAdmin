const {override, fixBabelImports, addLessLoader} = require('customize-cra');

module.exports = override(
  
  // 复用babel-plugin-import对antd根据improt的组件进行打包
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),

  // 添加lessloader配置对antd的less文件进行编译, 并primary的颜色值为指定的绿色
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {'@primary-color': '#1DA57A'},
  }),
);