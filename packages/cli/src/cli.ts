import chalk from 'chalk';
import ora from 'ora';
import prompts from 'prompts';
import { cloneList, promptsOptions } from './config';
import { filterFiles, gitClone, updatePackages } from './utils';

function runCli() {
  createProject();
}

/** 创建项目 */
async function createProject() {
  const answers = await prompts(promptsOptions);
  if (!answers.name || typeof answers.clone !== 'number' || typeof answers.format !== 'number') {
    return;
  }
  const libs = Array.isArray(answers.libs) ? answers.libs : [];
  const features = Array.isArray(answers.features) ? answers.features : [];

  const downSpinner = ora('正在构建...').start();
  try {
    await gitClone(cloneList[answers.clone], answers.name);
    await filterFiles(answers.name, libs, features);
    await updatePackages(answers.name, answers.name, libs, answers.format, features);
    downSpinner.succeed(chalk.green('构建成功！'));
  }
  catch (err) {
    downSpinner.fail();
    console.log('err', chalk.red(err));
  }
}

runCli();
