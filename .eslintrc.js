module.exports = {
  extends: [
    'eslint-config-airbnb-base',
    'plugin:vue/vue3-recommended',
  ],
  rules: {
    'vue/html-self-closing': ['error', { html: { void: 'always' } }],
  },
};
