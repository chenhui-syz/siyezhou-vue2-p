module.exports = {
  root: true,
  env: {
    node: true,
  },
  // 这里直接引入了一些拓展配置，不需要我们去一条条的再在rules进行配置
  extends: ["plugin:vue/essential", "eslint:recommended"],
  parserOptions: {
    parser: "babel-eslint",
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    // single为优先使用单引号，double为双引号
    // quotes: ["error", "double"],
    // 不要有分号
    // semi: ["error", "never"],
  },
};
