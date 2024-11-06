import eslintConfig from '@porsche-design-system/shared/eslint/index.js';
// import pluginVue from 'eslint-plugin-vue'
// import vueEslintConfigTypescript from "@vue/eslint-config-typescript";
// import vueEslintPrettierConfig from "@vue/eslint-config-prettier";

// console.log(vueEslintPluginVue.configs['flat/recommended'])

export default [
  ...eslintConfig,
  // ...pluginVue.configs['flat/recommended'],
  // ...vueEslintConfigTypescript(),
  // vueEslintPrettierConfig,
  {
    ignores: ['projects/vue-wrapper/src/lib/'],
    rules: {
      'vue/no-deprecated-slot-attribute': 'off',
    },
  },
];
