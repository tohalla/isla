module.exports = {
  extends: ['google'],
  plugins: ['angular'],
  env: {
    browser: true
  },
  ecmaFeatures: {
    arrowFunctions: true,
    generators: true
  },
  globals: {
    angular: true,
    SockJS: true,
    Stomp: true
  },
  rules: {
    'require-jsdoc': [0]
  }
};
