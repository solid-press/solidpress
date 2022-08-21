const OFF = 0;
const WARNING = 1;
const ERROR = 2;

const ClientRestrictedImportPatterns = [
  // Prevent importing lodash in client bundle for bundle size
  'lodash',
  'lodash.**',
  'lodash/**',
  // Prevent importing server code in client bundle
  '**/../server/**',
  '**/../commands/**',
];

module.exports = {
  root: true,
  env: {
    browser: true,
    commonjs: true,
    jest: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    // tsconfigRootDir: __dirname,
    // project: ['./tsconfig.json', './website/tsconfig.json'],
  },
  globals: {
    JSX: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:solid/typescript',
    'plugin:@typescript-eslint/recommended',
    // 'plugin:@typescript-eslint/recommended-requiring-type-checking',
    // 'plugin:@typescript-eslint/strict',
    'plugin:regexp/recommended',
    'prettier',
  ],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  reportUnusedDisableDirectives: true,
  plugins: [
    'import',
    'header',
    '@typescript-eslint',
    'solid',
    'regexp',
  ],
  rules: {
    'array-callback-return': WARNING,
    camelcase: WARNING,
    'class-methods-use-this': OFF, // It's a way of allowing private variables.
    curly: [WARNING, 'all'],
    'global-require': WARNING,
    'lines-between-class-members': OFF,
    'max-classes-per-file': OFF,
    'max-len': [
      WARNING,
      {
        code: Infinity, // Code width is already enforced by Prettier
        tabWidth: 2,
        comments: 80,
        ignoreUrls: true,
        ignorePattern: '(eslint-disable|@)',
      },
    ],
    'no-await-in-loop': OFF,
    'no-case-declarations': WARNING,
    'no-console': OFF,
    'no-constant-binary-expression': ERROR,
    'no-continue': OFF,
    'no-control-regex': WARNING,
    'no-else-return': [WARNING, { allowElseIf: true }],
    'no-empty': [WARNING, { allowEmptyCatch: true }],
    'no-lonely-if': WARNING,
    'no-nested-ternary': WARNING,
    'no-param-reassign': [WARNING, { props: false }],
    'no-prototype-builtins': WARNING,
    'no-restricted-exports': OFF,
    'no-restricted-properties': [
      ERROR,
      .../** @type {[string, string][]} */ ([
        // TODO: TS doesn't make Boolean a narrowing function yet,
        // so filter(Boolean) is problematic type-wise
        // ['compact', 'Array#filter(Boolean)'],
        ['concat', 'Array#concat'],
        ['drop', 'Array#slice(n)'],
        ['dropRight', 'Array#slice(0, -n)'],
        ['fill', 'Array#fill'],
        ['filter', 'Array#filter'],
        ['find', 'Array#find'],
        ['findIndex', 'Array#findIndex'],
        ['first', 'foo[0]'],
        ['flatten', 'Array#flat'],
        ['flattenDeep', 'Array#flat(Infinity)'],
        ['flatMap', 'Array#flatMap'],
        ['fromPairs', 'Object.fromEntries'],
        ['head', 'foo[0]'],
        ['indexOf', 'Array#indexOf'],
        ['initial', 'Array#slice(0, -1)'],
        ['join', 'Array#join'],
        // Unfortunately there's no great alternative to _.last yet
        // Candidates: foo.slice(-1)[0]; foo[foo.length - 1]
        // Array#at is ES2022; could replace _.nth as well
        // ['last'],
        ['map', 'Array#map'],
        ['reduce', 'Array#reduce'],
        ['reverse', 'Array#reverse'],
        ['slice', 'Array#slice'],
        ['take', 'Array#slice(0, n)'],
        ['takeRight', 'Array#slice(-n)'],
        ['tail', 'Array#slice(1)'],
      ]).map(([property, alternative]) => ({
        object: '_',
        property,
        message: `Use ${alternative} instead.`,
      })),
      ...[
        'readdirSync',
        'readFileSync',
        'statSync',
        'lstatSync',
        'existsSync',
        'pathExistsSync',
        'realpathSync',
        'mkdirSync',
        'mkdirpSync',
        'mkdirsSync',
        'writeFileSync',
        'writeJsonSync',
        'outputFileSync',
        'outputJsonSync',
        'moveSync',
        'copySync',
        'copyFileSync',
        'ensureFileSync',
        'ensureDirSync',
        'ensureLinkSync',
        'ensureSymlinkSync',
        'unlinkSync',
        'removeSync',
        'emptyDirSync',
      ].map((property) => ({
        object: 'fs',
        property,
        message: 'Do not use sync fs methods.',
      })),
    ],
    'no-restricted-syntax': [
      WARNING,
      // Copied from airbnb, removed for...of statement, added export all
      {
        selector: 'ForInStatement',
        message:
          'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.',
      },
      {
        selector: 'LabeledStatement',
        message:
          'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.',
      },
      {
        selector: 'WithStatement',
        message:
          '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.',
      },
      {
        selector: 'ExportAllDeclaration',
        message:
          "Export all does't work well if imported in ESM due to how they are transpiled, and they can also lead to unexpected exposure of internal methods.",
      },
      // TODO make an internal plugin to ensure this
      // {
      //   selector:
      // @   'ExportDefaultDeclaration > Identifier, ExportNamedDeclaration[source=null] > ExportSpecifier',
      //   message: 'Export in one statement'
      // },
      ...['path', 'fs-extra', 'webpack', 'lodash'].map((m) => ({
        selector: `ImportDeclaration[importKind=value]:has(Literal[value=${m}]) > ImportSpecifier[importKind=value]`,
        message:
          'Default-import this, both for readability and interoperability with ESM',
      })),
    ],
    'no-template-curly-in-string': WARNING,
    'no-unused-expressions': [WARNING, { allowTaggedTemplates: true }],
    'no-useless-escape': WARNING,
    'no-void': [ERROR, { allowAsStatement: true }],
    'prefer-destructuring': WARNING,
    'prefer-named-capture-group': WARNING,
    'prefer-template': WARNING,
    yoda: WARNING,

    'import/extensions': OFF,
    // This rule doesn't yet support resolving .js imports when the actual file
    // is .ts. Plus it's not all that useful when our code is fully TS-covered.
    'import/no-unresolved': [
      OFF,
      {
        // Ignore certain webpack aliases because they can't be resolved
        ignore: [
          '^@theme',
          '^@solidpress',
          '^@generated',
          '^@site',
          '^@testing-utils',
        ],
      },
    ],
    'import/order': [
      WARNING,
      {
        groups: [
          'builtin',
          'external',
          'internal',
          ['parent', 'sibling', 'index'],
          'type',
        ],
        pathGroups: [
          // always put css import to the last, ref:
          // https://github.com/import-js/eslint-plugin-import/issues/1239
          {
            pattern: '*.+(css|sass|less|scss|pcss|styl)',
            group: 'unknown',
            patternOptions: { matchBase: true },
            position: 'after',
          },
          { pattern: 'vite', group: 'builtin', position: 'before' },
          { pattern: 'solid', group: 'builtin', position: 'before' },
          { pattern: 'fs-extra', group: 'builtin' },
          { pattern: 'ramda', group: 'external', position: 'before' },
          { pattern: 'clsx', group: 'external', position: 'before' },
          // 'Bit weird to not use the `import/internal-regex` option, but this
          // way, we can make `import type { Props } from "@theme/*"` appear
          // before `import styles from "styles.module.css"`, which is what we
          // always did. This should be removable once we stop using ambient
          // module declarations for theme aliases.
          { pattern: '@theme/**', group: 'internal' },
          { pattern: '@site/**', group: 'internal' },
          { pattern: '@theme-init/**', group: 'internal' },
          { pattern: '@theme-original/**', group: 'internal' },
        ],
        pathGroupsExcludedImportTypes: [],
        // example: let `import './nprogress.css';` after importing others
        // see more: https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/order.md#warnonunassignedimports-truefalse
        warnOnUnassignedImports: true,
      },
    ],
    'import/prefer-default-export': OFF,
    // 'jsx-a11y/click-events-have-key-events': WARNING,
    // 'jsx-a11y/no-noninteractive-element-interactions': WARNING,
    // 'jsx-a11y/html-has-lang': OFF,

    '@typescript-eslint/consistent-type-definitions': OFF,
    '@typescript-eslint/require-await': OFF,

    '@typescript-eslint/ban-ts-comment': [
      ERROR,
      { 'ts-expect-error': 'allow-with-description' },
    ],
    '@typescript-eslint/consistent-indexed-object-style': [
      WARNING,
      'index-signature',
    ],
    '@typescript-eslint/consistent-type-imports': [
      WARNING,
      { disallowTypeAnnotations: false },
    ],
    '@typescript-eslint/explicit-module-boundary-types': WARNING,
    '@typescript-eslint/method-signature-style': ERROR,
    '@typescript-eslint/no-empty-function': OFF,
    '@typescript-eslint/no-empty-interface': [
      ERROR,
      {
        allowSingleExtends: true,
      },
    ],
    '@typescript-eslint/no-inferrable-types': OFF,
    '@typescript-eslint/no-namespace': [WARNING, { allowDeclarations: true }],
    'no-use-before-define': OFF,
    '@typescript-eslint/no-use-before-define': [
      ERROR,
      { functions: false, classes: false, variables: true },
    ],
    '@typescript-eslint/no-non-null-assertion': OFF,
    'no-redeclare': OFF,
    '@typescript-eslint/no-redeclare': ERROR,
    'no-shadow': OFF,
    '@typescript-eslint/no-shadow': ERROR,
    'no-unused-vars': OFF,
    // We don't provide any escape hatches for this rule. Rest siblings and
    // function placeholder params are always ignored, and any other unused
    // locals must be justified with a disable comment.
    '@typescript-eslint/no-unused-vars': [ERROR, { ignoreRestSiblings: true }],
    '@typescript-eslint/prefer-optional-chain': ERROR,
    //  '@solidpress/no-untranslated-text': [
    //    WARNING,
    //    {
    //      ignoredStrings: [
    //        '·',
    //        '-',
    //        '—',
    //        '×',
    // eslint-disable-next-line no-irregular-whitespace
    //        '​', // zwj: &#8203;
    //        '@',
    //        'WebContainers',
    //        'Twitter',
    //        'GitHub',
    //        'Dev.to',
    //        '1.x',
    //      ],
    //    },
    //  ],
  },
  overrides: [
    {
      files: ['packages/solidpress/src/client/**/*.{js,ts,tsx}'],
      rules: {
        'no-restricted-imports': [
          'error',
          {
            patterns: ClientRestrictedImportPatterns,
          },
        ],
      },
    },
    {
      files: ['packages/solidpress-*/src/theme/**/*.{js,ts,tsx}'],
      excludedFiles: '*.test.{js,ts,tsx}',
      rules: {
        'no-restricted-imports': [
          'error',
          {
            patterns: ClientRestrictedImportPatterns.concat(
              [
                '../**',
                './**',
                // Allows relative styles module import with consistent filename
                '!./styles.module.css',
              ],
            ),
          },
        ],
      },
    },
    {
      files: [
        'packages/solidpress-*/src/theme/**/*.{js,ts,tsx}',
        'packages/solidpress/src/client/theme-fallback/**/*.{js,ts,tsx}',
      ],
      rules: {
        'import/no-named-export': ERROR,
      },
    },
    {
      files: ['packages/create-solidpress/templates/**/*.{js,ts,tsx}'],
      rules: {
        'header/header': OFF,
        'global-require': OFF,
        '@typescript-eslint/no-var-requires': OFF,
        '@solidpress/no-untranslated-text': OFF,
      },
    },
    {
      files: ['*.d.ts'],
      rules: {
        'import/no-duplicates': OFF,
      },
    },
    {
      files: ['*.{ts,tsx}'],
      rules: {
        'no-undef': OFF,
        'import/no-import-module-exports': OFF,
      },
    },
    {
      files: ['*.{js,mjs,cjs}'],
      rules: {
        // Make JS code directly runnable in Node.
        '@typescript-eslint/no-var-requires': OFF,
        '@typescript-eslint/explicit-module-boundary-types': OFF,
      },
    },
    {
      files: [
        '**/__tests__/**',
        'packages/solidpress-plugin-debug/**',
      ],
      rules: {
        '@solidpress/no-untranslated-text': OFF,
      },
    },
    {
      // Internal files where extraneous deps don't matter much at long as
      // they run
      files: [
        '*.test.{js,ts,tsx}',
        'website/**',
        'packages/solidpress-theme-common/removeThemeInternalReexport.mjs',
        'packages/solidpress-theme-translations/update.mjs',
        'packages/solidpress-theme-translations/src/utils.ts',
      ],
      rules: {
        'import/no-extraneous-dependencies': OFF,
      },
    },
    {
      files: ['packages/eslint-plugin/**/*.{js,ts}'],
      extends: ['plugin:eslint-plugin/recommended'],
    },
  ],
};