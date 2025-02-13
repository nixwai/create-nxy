import commandLineArgs from 'command-line-args';
import commandLineUsage from 'command-line-usage';
import prompts from 'prompts';
import { version } from '../core/build-cli/package.json';
import { cloneList, helpSections, promptsOptions } from './config';
import { filterFiles, gitClone, updateName } from './utils';

// 配置命令参数
const optionDefinitions = [
  { name: 'version', alias: 'v', type: Boolean },
  { name: 'help', alias: 'h', type: Boolean },
];
const options = commandLineArgs(optionDefinitions);

function runCli() {
  if (options.version) {
    console.log(`v${version}`);
    return;
  }

  if (options.help) {
    console.log(commandLineUsage(helpSections));
    return;
  }

  createProject();
}

/** 创建项目 */
async function createProject() {
  const res = await prompts(promptsOptions);
  if (!res.name) {
    return;
  }

  await gitClone(cloneList[res.clone], res.name);

  await filterFiles(res.name, res.libs);

  await updateName(res.name, res.name, res.libs);
}

runCli();
