import type { PromptObject } from 'prompts';

export const cssPreset = 'css';
export const projectMode = 'project';
export const toolingMode = 'tooling';

export const libFileMap: Record<string, string> = {
  design: 'components',
  preset: 'presets',
  use: 'hooks',
  tool: 'utils',
  icon: 'icons',
};

export const libChoices = [
  { title: 'Vue 组件库', value: 'design' },
  { title: 'Unocss 预设', value: 'preset' },
  { title: '工具库', value: 'tool' },
  { title: 'Vue 组合式工具库', value: 'use' },
  { title: 'Vue 图标库', value: 'icon' },
];

function isProjectMode(_prev: any, values: Record<string, any>) {
  return values.mode === projectMode;
}

function isToolingMode(_prev: any, values: Record<string, any>) {
  return values.mode === toolingMode;
}

function validateRequired(value: string) {
  return value.trim().length > 0 || '请输入内容';
}

function validatePathSegment(value: string) {
  const name = value.trim();
  if (!name) {
    return '请输入目录名称';
  }
  if (name === '.' || name === '..' || /[<>:"|?*\\/']/.test(name)) {
    return '请输入有效的单级目录名称';
  }
  return true;
}

export const promptsOptions: PromptObject[] = [
  {
    type: 'select',
    name: 'mode',
    message: '构建模式',
    choices: [
      { title: '创建完整的库项目', value: projectMode },
      { title: '为已有项目生成打包工具', value: toolingMode },
    ],
  },
  {
    type: (prev, values) => isProjectMode(prev, values) ? 'text' : null,
    name: 'name',
    message: '项目名',
    validate: validateRequired,
  },
  {
    type: (prev, values) => isToolingMode(prev, values) ? 'text' : null,
    name: 'targetPath',
    message: '项目路径',
    initial: '.',
    validate: validateRequired,
  },
  {
    type: (prev, values) => isToolingMode(prev, values) ? 'select' : null,
    name: 'hasTooling',
    message: '项目是否已有 tooling 文件夹',
    choices: [
      { title: '否，生成完整 tooling', value: false },
      { title: '是，追加打包库', value: true },
    ],
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
    type: (prev, values) => isProjectMode(prev, values) ? 'select' : null,
    name: 'format',
    message: '库名格式',
    choices: [
      { title: '@项目名/库类型', value: 0 },
      { title: '项目名-库类型', value: 1 },
    ],
  },
  {
    type: (prev, values) => isProjectMode(prev, values) ? 'multiselect' : null,
    name: 'libs',
    message: '库类型',
    choices: libChoices,
  },
  {
    type: (prev, values) => isProjectMode(prev, values) ? 'multiselect' : null,
    name: 'features',
    message: '附加功能',
    choices: [
      { title: 'CSS 样式预设（SCSS + stylelint）', value: cssPreset },
      { title: '文档 docs', value: 'docs', selected: true },
      { title: '演练场 playground', value: 'playground', selected: true },
    ],
  },
  {
    type: (prev, values) => isToolingMode(prev, values) ? 'select' : null,
    name: 'toolingLib',
    message: '打包库',
    choices: libChoices,
  },
  {
    type: (prev, values) => isToolingMode(prev, values) ? 'text' : null,
    name: 'pkgDirName',
    message: 'pkg 根目录名称',
    initial: 'packages',
    validate: validatePathSegment,
  },
  {
    type: (prev, values) => isToolingMode(prev, values) ? 'text' : null,
    name: 'targetDirName',
    message: '打包目标库文件夹名称',
    initial: (_prev, values) => libFileMap[values.toolingLib],
    validate: validatePathSegment,
  },
];

export const cloneList = [
  'https://github.com/nixwai/create-nxy.git',
  'git@github.com:nixwai/create-nxy.git',
];

export const featureFileMap: Record<string, string> = {
  docs: 'docs',
  playground: 'playground',
};

export const featureScriptMap: Record<string, string> = {
  docs: 'docs',
  playground: 'play',
};

export const cssConfigFiles = [
  'stylelint.config.cjs',
  '.stylelintignore',
];

export const cssPackageScripts = [
  'lint:style',
];

export const cssPackageDependencies = [
  'postcss',
  'postcss-html',
  'postcss-scss',
  'sass',
  'stylelint',
  'stylelint-config-recess-order',
  'stylelint-config-recommended-scss',
  'stylelint-config-recommended-vue',
  'stylelint-config-standard',
  'stylelint-order',
  'stylelint-scss',
];
