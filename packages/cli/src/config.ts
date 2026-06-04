import type { PromptObject } from 'prompts';

export const cssPreset = 'css';

export const promptsOptions: PromptObject[] = [
  {
    type: 'text',
    name: 'name',
    message: '项目名',
  },
  {
    type: 'select',
    name: 'clone',
    message: '下载方式',
    choices: [
      { title: 'HTTPS', value: 0 },
      { title: 'SSH', value: 1 },
    ],
  },
  {
    type: 'select',
    name: 'format',
    message: '库名格式',
    choices: [
      { title: '@项目名/库类型', value: 0 },
      { title: '项目名-库类型', value: 1 },
    ],
  },
  {
    type: 'multiselect',
    name: 'libs',
    message: '库类型',
    choices: [
      { title: 'Vue 组件库', value: 'design' },
      { title: 'Unocss 预设', value: 'preset' },
      { title: '工具库', value: 'tool' },
      { title: 'Vue 组合式工具库', value: 'use' },
      { title: 'Vue 图标库', value: 'icon' },
    ],
  },
  {
    type: 'multiselect',
    name: 'features',
    message: '附加功能',
    choices: [
      { title: 'CSS 样式预设', value: cssPreset },
      { title: '文档 docs', value: 'docs', selected: true },
      { title: '演练场 playground', value: 'playground', selected: true },
    ],
  },
];

export const cloneList = [
  'https://github.com/nixwai/create-nxy.git',
  'git@github.com:nixwai/create-nxy.git',
];

export const libFileMap: Record<string, string> = {
  design: 'components',
  preset: 'presets',
  use: 'hooks',
  tool: 'utils',
  icon: 'icons',
};

export const featureFileMap: Record<string, string> = {
  docs: 'docs',
  playground: 'playground',
};

export const featureScriptMap: Record<string, string> = {
  docs: 'docs',
  playground: 'play',
};

export const cssConfigFiles = [
  'stylelint.config.cjs',
  '.stylelintignore',
];

export const cssPackageScripts = [
  'lint:style',
];

export const cssPackageDependencies = [
  'postcss',
  'postcss-html',
  'postcss-scss',
  'sass',
  'stylelint',
  'stylelint-config-recess-order',
  'stylelint-config-recommended-scss',
  'stylelint-config-recommended-vue',
  'stylelint-config-standard',
  'stylelint-order',
  'stylelint-scss',
];
