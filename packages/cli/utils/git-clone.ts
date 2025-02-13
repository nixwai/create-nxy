import simpleGit from 'simple-git';

export async function gitClone(remote: string, name: string, option = {}) {
  await simpleGit().clone(remote, name, option);
};
