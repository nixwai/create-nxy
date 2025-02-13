import type { Section } from 'command-line-usage';
import type { PromptObject } from 'prompts';

export const helpSections: Section[] = [
  {
    header: 'create-nxy',
    content: '用于快速搭建各种库环境的脚手架',
  },
  {
    header: 'Options',
    optionList: [
      {
        name: 'version',
        alias: 'v',
        typeLabel: '{underline boolean}',
        description: '版本号',
      },
      {
        name: 'help',
        alias: 'h',
        typeLabel: '{underline boolean}',
        description: '帮助',
      },
    ],
  },
];

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
