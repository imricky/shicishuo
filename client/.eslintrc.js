module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  rules: {
    //'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    //'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    //"off"或者0    //关闭规则关闭
    //"warn"或者1    //在打开的规则作为警告（不影响退出代码）
    //"error"或者2    //把规则作为一个错误（退出代码触发时为1）
    "no-var": 2,//禁用var，用let和const代替
    "no-use-before-define": 2,//未定义前不能使用
    "semi": [2, "always"],//语句强制分号结尾
    "indent": [2],//缩进风格
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
      ],
      env: {
        mocha: true,
      },
    },
  ],
};
