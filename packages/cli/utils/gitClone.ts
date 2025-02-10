import chalk from 'chalk';
import ora from 'ora';
import simpleGit from 'simple-git';

export default (remote: string, name: string, option = {}) => {
  const downSpinner = ora('正在构建...').start();
  return new Promise<void>((resolve, reject) => {
    simpleGit().clone(remote, name, option).then(() => {
      downSpinner.succeed(chalk.green('构建成功！'));
      resolve();
    }).catch((err) => {
      downSpinner.fail();
      console.log('err', chalk.red(err));
      reject(err);
    });
  });
};
