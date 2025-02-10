import chalk from 'chalk';
import ora from 'ora';
import simpleGit from 'simple-git';

export default (remote, name, option = {}) => {
  const downSpinner = ora('正在构建...').start();
  return new Promise((resolve, reject) => {
    simpleGit({ timeout: 60000 }).clone(remote, name, option).then(() => {
      downSpinner.succeed(chalk.green('构建成功！'));
      resolve();
    }).catch((err) => {
      downSpinner.fail();
      console.log('err', chalk.red(err));
      reject(err);
    });
  });
};
