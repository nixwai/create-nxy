import chalk from 'chalk';
import ora from 'ora';
import prompts from 'prompts';
import { cloneList, promptsOptions } from './config';
import { filterFiles, gitClone, updateName } from './utils';

function runCli() {
  createProject();
}

/** 创建项目 */
async function createProject() {
  const res = await prompts(promptsOptions);
  if (!res.name) {
    return;
  }

  const downSpinner = ora('正在构建...').start();
  try {
    await gitClone(cloneList[res.clone], res.name);
    await filterFiles(res.name, res.libs);
    await updateName(res.name, res.name, res.libs);
    downSpinner.succeed(chalk.green('构建成功！'));
  }
  catch (err) {
    downSpinner.fail();
    console.log('err', chalk.red(err));
  }
}

runCli();
