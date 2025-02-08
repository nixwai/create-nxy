import { readFile } from 'node:fs/promises';
import commandLineArgs from 'command-line-args';
import commandLineUsage from 'command-line-usage';

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
    header: 'create-xwai',
    content: '一个快速生成各种库搭建环境的脚手架',
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

if (options.version) {
  console.log(`v${pkg.version}`);
}

if (options.help) {
  console.log(commandLineUsage(helpSections));
}
