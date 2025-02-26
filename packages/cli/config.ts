import type { PromptObject } from 'prompts';

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
      { title: 'Vue组件库', value: 'design' },
      { title: 'Vue组合式工具库', value: 'use' },
      { title: 'Unocss预设', value: 'preset' },
      { title: '工具库', value: 'tool' },
    ],
  },
];

export const cloneList = [
  'https://github.com/nixwai/create-libs.git',
  'git@github.com:nixwai/create-libs.git',
];

export const libFileMap: Record<string, string> = {
  design: 'components',
  preset: 'presets',
  use: 'hooks',
  tool: 'utils',
};
