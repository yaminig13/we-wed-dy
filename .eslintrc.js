module.exports = {
  env: {
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
  ],
  rules: {
    // override/add rules settings here, such as:
    // 'vue/no-unused-vars': 'error'
    "vue/no-parsing-error": [
      "error",
      {
        "invalid-first-character-of-tag-name": false,
      }
    ],
    "indent": ["error", 2],
    "space-before-blocks": ["error", "always"],
    "space-in-parens": ["error", "never"],
    "space-unary-ops": "error",
    "space-before-function-paren": ["error", "never"],
    "keyword-spacing": ["error", { before: true, after: true }],
    "object-curly-spacing": ["error", "always"],
    "comma-spacing": ["error", { before: false, after: true }],
    "no-trailing-spaces": "error",
    "no-multi-spaces": "error",
    "semi-spacing": ["error", { before: false, after: true }],
    "arrow-spacing": ["error", { before: true, after: true }],
    "key-spacing": ["error", { beforeColon: false, afterColon: true }],
  }
}