import antfu from '@antfu/eslint-config'
// TODO: Uncomment and configure if you plan to use Vitest or Tailwind CSS linting in the future
// import pluginVitest from '@vitest/eslint-plugin'
// TODO: Uncomment if you add eslint-plugin-better-tailwindcss to your project
// import eslintPluginBetterTailwindcss from 'eslint-plugin-better-tailwindcss'

export default antfu(
  {
    formatters: true,
    // vue: true,
    // react: true,
    // astro: true,
  },

  {
    plugins: {
      // TODO: Uncomment if you add eslint-plugin-better-tailwindcss to your project
      // 'better-tailwindcss': eslintPluginBetterTailwindcss,
    },

    rules: {
      // TODO: Uncomment if you add eslint-plugin-better-tailwindcss to your project
      // ...eslintPluginBetterTailwindcss.configs['recommended-warn'].rules,
      // ...eslintPluginBetterTailwindcss.configs['recommended-error'].rules,
      // 'better-tailwindcss/enforce-consistent-line-wrapping': ['warn', { printWidth: 100 }],
      // 'better-tailwindcss/no-restricted-classes': 'off',
      // 'better-tailwindcss/no-unregistered-classes': 'off',

      // https://perfectionist.dev/rules/sort-imports.html
      'sort-imports': 'off',
      'perfectionist/sort-imports': [
        'error',
        {
          partitionByNewLine: true,
          newlinesBetween: 'ignore',
        },
      ],

      // https://eslint.style/rules/space-before-function-paren
      'space-before-function-paren': ['error', {
        anonymous: 'never',
        named: 'never',
        asyncArrow: 'always',
        // catch: 'never',
      }],

      // https://eslint.style/rules/padding-line-between-statements
      'style/padding-line-between-statements': [
        'error',
        // require blank line before all return statements
        { blankLine: 'always', prev: '*', next: 'return' },
      ],

      // TODO: Uncomment if you add Vue support to your project
      // 'vue/object-property-newline': ['error', {
      //   allowAllPropertiesOnSameLine: true,
      // }],
    },

    settings: {
      // TODO: Uncomment if you add eslint-plugin-better-tailwindcss to your project
      // 'better-tailwindcss': {
      //   entryPoint: 'src/registry/styles/global.css',
      // },
    },
  },

  {
    name: 'app/files-to-ignore',
    ignores: [
      '**/dist/**',
      '**/dist-ssr/**',
      '**/coverage/**',
      'logs',
      '**/logs',
      'tsconfig.*',
      '**/tsconfig.*',
    ],
  },

  // TODO: Uncomment and configure if you plan to use Vitest for testing
  // {
  //   rules: pluginVitest.configs.recommended.rules,
  //   files: [
  //     'client/src/**/__tests__/*',
  //     'client/tests/**/*'
  //   ],
  // },
)
