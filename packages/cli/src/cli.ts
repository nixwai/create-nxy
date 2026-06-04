import chalk from 'chalk';
import ora from 'ora';
import prompts from 'prompts';
import { cloneList, projectMode, promptsOptions, toolingMode } from './config';
import { filterFiles, generateTooling, gitClone, updatePackages } from './utils';

function runCli() {
  create();
}

/** 创建 */
async function create() {
  const answers = await prompts(promptsOptions);
  if (answers.mode === projectMode) {
    await createProject(answers);
    return;
  }
  if (answers.mode === toolingMode) {
    await createTooling(answers);
  }
}

/** 创建项目 */
async function createProject(answers: prompts.Answers<string>) {
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

/** 仅生成tooling */
async function createTooling(answers: prompts.Answers<string>) {
  if (
    typeof answers.clone !== 'number'
    || typeof answers.targetPath !== 'string'
    || typeof answers.hasTooling !== 'boolean'
    || typeof answers.toolingLib !== 'string'
    || typeof answers.pkgDirName !== 'string'
    || typeof answers.targetDirName !== 'string'
  ) {
    return;
  }

  const downSpinner = ora('正在生成tooling...').start();
  try {
    await generateTooling({
      remote: cloneList[answers.clone],
      targetPath: answers.targetPath,
      hasTooling: answers.hasTooling,
      lib: answers.toolingLib,
      pkgDirName: answers.pkgDirName,
      targetDirName: answers.targetDirName,
    });
    downSpinner.succeed(chalk.green('tooling生成成功！'));
  }
  catch (err) {
    downSpinner.fail();
    console.log('err', chalk.red(err));
  }
}

runCli();
