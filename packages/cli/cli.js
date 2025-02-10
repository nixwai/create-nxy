import { readFile } from 'node:fs/promises';
import commandLineArgs from 'command-line-args';
import commandLineUsage from 'command-line-usage';
import prompts from 'prompts';
import gitClone from './utils/gitClone.js';

const pkg = JSON.parse(
  await readFile(new URL('./package.json', import.meta.url)),
);
// 配置命令参数
const optionDefinitions = [
  { name: 'version', alias: 'v', type: Boolean },
  { name: 'help', alias: 'h', type: Boolean },
];
const options = commandLineArgs(optionDefinitions);

const helpSections = [
  {
    header: 'xy-cli',
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

const promptsOptions = [
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
      { title: 'Vue组件库', value: 0 },
      { title: 'Vue组合式工具库', value: 1 },
      { title: 'Unocss预设', value: 2 },
      { title: '工具库', value: 2 },
    ],
  },
];

if (options.version) {
  console.log(`v${pkg.version}`);
}

if (options.help) {
  console.log(commandLineUsage(helpSections));
}

const cloneList = [
  'https://github.com/nixwai/create-libs.git',
  'git@github.com:nixwai/create-libs.git',
];

async function getUserInfo() {
  const res = await prompts(promptsOptions);
  if (!res.name) {
    return;
  }
  gitClone(cloneList[res.clone], res.name);
}

getUserInfo();
