# create-nxy

`create-nxy` 是一个面向前端库开发的 monorepo 脚手架。它既可以从零创建一套可多包库项目，也可以只给已有项目生成或追加 `tooling` 打包配置。

它适合用来快速搭建 Vue 组件库、Vue 组合式工具库、工具函数库、UnoCSS 预设和 Vue 图标库，并内置了 `pnpm workspace`、`tsdown`、`gulp`、`eslint`、`vitest`、可选文档站和演练场等工程化配置。

## 特性

- 交互式 CLI，按提示选择项目类型、库类型、包名格式和附加能力。
- 支持创建完整库项目，也支持只为已有项目生成 `tooling`。
- 支持按需保留 Vue 组件库、Vue 组合式工具库、工具库、UnoCSS 预设、Vue 图标库。
- 生成项目时会自动裁剪未选择的包、打包配置、脚本和工作空间条目。
- 支持两种包名格式：`@项目名/库类型` 和 `项目名-库类型`。
- 可选保留 `docs` 文档站、`playground` 演练场和 CSS/Stylelint 相关配置。
- 打包体系基于 `gulp` + `tsdown`，提供 build、release、publish 脚本。

## 环境要求

- Node.js 和 npm。
- Git，CLI 会通过 `git clone` 拉取模板仓库。
- pnpm，生成后的项目采用 `pnpm workspace` 组织多包。
- 如果选择 SSH 下载方式，需要提前配置 GitHub SSH key。

## 快速开始

```bash
npm create nxy@latest
```

也可以使用：

```bash
npx create-nxy@latest
```

CLI 当前是交互式流程，启动后根据提示选择构建模式和需要生成的内容。

## CLI 使用

### 创建完整项目

选择 `创建完整项目` 时，CLI 会 clone 当前模板仓库，然后根据你的选择裁剪目录、更新包名、调整脚本和依赖。

交互项如下：

| 交互项 | 说明 |
| --- | --- |
| 构建模式 | 选择 `创建完整项目` |
| 项目名 | 新项目目录名，同时会作为生成包名的前缀 |
| 下载方式 | `HTTPS` 或 `SSH` |
| 库名格式 | `@项目名/库类型` 或 `项目名-库类型` |
| 库类型 | 可多选 Vue 组件库、UnoCSS 预设、工具库、Vue 组合式工具库、Vue 图标库 |
| 附加功能 | 可多选 CSS 样式预设、文档 docs、演练场 playground |

示例流程：

```bash
npm create nxy@latest

# 构建模式：创建完整项目
# 项目名：my-libs
# 下载方式：HTTPS
# 库名格式：@项目名/库类型
# 库类型：Vue 组件库、工具库
# 附加功能：文档 docs、演练场 playground
```

生成后进入项目：

```bash
cd my-libs
pnpm install
pnpm build
```

如果选择了文档或演练场，可以继续运行：

```bash
pnpm docs:dev
pnpm play:dev
```

### 仅生成 tooling

选择 `仅生成 tooling` 时，CLI 不会创建完整项目，而是把当前模板中的打包配置复制到已有项目中。这个模式适合已有 `packages` 目录，但还没有统一打包脚本的项目。

交互项如下：

| 交互项 | 说明 |
| --- | --- |
| 构建模式 | 选择 `仅生成 tooling` |
| 目标项目路径 | 已有项目路径，默认是当前目录 `.` |
| 目标项目是否已有 tooling 文件夹 | 选择生成完整 `tooling`，或向已有 `tooling` 追加一个打包库 |
| 下载方式 | `HTTPS` 或 `SSH` |
| 打包库 | 选择要生成的库类型 |
| pkg 根目录名称 | 目标项目中存放包的根目录，默认 `packages` |
| 打包目标库文件夹名称 | 目标包目录名称，默认按库类型映射，如 `components`、`hooks`、`utils` |

例如，在已有项目中追加一个工具库打包配置：

```bash
# 多库项目
npm create nxy@latest

# 构建模式：仅生成 tooling
# 项目路径：.
# 项目是否已有 tooling 文件夹：是，追加打包库
# 打包库：工具库
# pkg 根目录名称：packages
# 打包目标库文件夹名称：utils
```

```bash
# 单库项目
npm create nxy@latest

# 构建模式：仅生成 tooling
# 项目路径：.
# 项目是否已有 tooling 文件夹：否，生成完整 tooling
# 打包库：Vue 组件库
# pkg 根目录名称：.
# 打包目标库文件夹名称：components
```
注意事项：

- 目标项目路径必须存在，并且必须是目录。
- 如果选择 `否，生成完整 tooling`，目标项目不能已经存在 `tooling` 目录，避免覆盖。
- 如果选择 `是，追加打包库`，目标项目必须已有 `tooling` 目录，且不能已经存在同类型打包库工具目录。
- `pkg 根目录名称` 和 `打包目标库文件夹名称` 只支持单级目录名，例如 `packages`、`libs`、`components`，不支持 `packages/ui` 这样的多级路径。
- 生成的打包入口会沿用模板默认值，例如 `entry: { index: 'src/index.ts' }`。如果目标库的实际入口不是 `src/index.ts`，需要在生成后手动修改对应的 `tooling/<type>/tsdown.config.ts`。
- 仅生成 `tooling` 模式只会处理 `tooling` 目录和 `tooling/package.json`，不会自动改目标项目根 `package.json` 或 `pnpm-workspace.yaml`。如需从根目录执行脚本，需要在目标项目中自行补充 workspace 和根脚本，或直接运行 `pnpm run -C tooling <type>:build`。

## 支持的库类型

| CLI 选项 | 值 | 包目录 | tooling 目录 | 作用 | 生成包名示例 |
| --- | --- | --- | --- | --- | --- |
| Vue 组件库 | `design` | `packages/components` | `tooling/components` | Vue 3 组件库模板，支持 `.vue`、样式注入和类型声明 | `@my-libs/design` / `my-libs-design` |
| UnoCSS 预设 | `preset` | `packages/presets` | `tooling/presets` | UnoCSS preset 模板 | `@my-libs/preset` / `my-libs-preset` |
| 工具库 | `tool` | `packages/utils` | `tooling/utils` | 通用 TypeScript 工具函数库 | `@my-libs/tool` / `my-libs-tool` |
| Vue 组合式工具库 | `use` | `packages/hooks` | `tooling/hooks` | 基于 `vue-demi` 的组合式函数库 | `@my-libs/use` / `my-libs-use` |
| Vue 图标库 | `icon` | `packages/icons` | `tooling/icons` | SVG 转 Vue 组件并打包 | `@my-libs/icons-vue` / `my-libs-icons-vue` |

## 附加功能

| 功能 | 说明 | 相关脚本 |
| --- | --- | --- |
| CSS 样式预设 | 保留 Stylelint、Sass、PostCSS 相关配置和依赖 | `pnpm lint:style` |
| 文档 docs | 保留 `docs` 目录，使用 VitePress 搭建文档站 | `pnpm docs:dev`、`pnpm docs:build` |
| 演练场 playground | 保留 `playground` 目录，使用 Vite + Vue 调试本地包 | `pnpm play:dev`、`pnpm play:build` |

未选择的附加功能会从生成项目中移除，对应脚本和 workspace 条目也会同步清理。

## 生成后的目录结构

完整模板包含以下目录，实际生成结果会根据 CLI 选择裁剪：

```text
my-libs/
├─ packages/
│  ├─ components/     # Vue 组件库
│  ├─ hooks/          # Vue 组合式工具库
│  ├─ icons/          # Vue 图标库
│  ├─ presets/        # UnoCSS 预设
│  ├─ utils/          # 工具函数库
│  └─ cli/            # create-nxy CLI，生成项目时会被移除
├─ tooling/
│  ├─ common/         # 通用构建、发布任务
│  ├─ components/     # 组件库打包配置
│  ├─ hooks/          # 组合式函数库打包配置
│  ├─ icons/          # 图标库打包和 SVG 生成配置
│  ├─ presets/        # UnoCSS 预设打包配置
│  ├─ utils/          # 工具库打包配置
│  └─ cli-system/     # CLI 打包配置，生成项目时会被移除
├─ docs/              # 可选，VitePress 文档站
├─ playground/        # 可选，Vite + Vue 演练场
├─ package.json
├─ pnpm-workspace.yaml
├─ tsconfig.json
├─ eslint.config.mjs
└─ vitest.config.ts
```

## 常用脚本

生成完整项目后，根目录常用脚本如下。未选择的库类型或附加功能，对应脚本会被移除。

| 脚本 | 说明 |
| --- | --- |
| `pnpm build` | 并行构建所有已选择的库 |
| `pnpm <type>:build` | 构建指定库，例如 `pnpm design:build`、`pnpm tool:build` |
| `pnpm <type>:release` | 使用 `bumpp` 更新指定库版本并生成 commit/tag |
| `pnpm <type>:publish` | 发布指定库到 npm registry |
| `pnpm test` | 运行 Vitest |
| `pnpm coverage` | 运行测试覆盖率 |
| `pnpm lint` | 运行 ESLint |
| `pnpm lint:fix` | 自动修复 ESLint 问题 |
| `pnpm lint:style` | 运行 Stylelint，选择 CSS 样式预设时保留 |
| `pnpm docs:dev` | 启动文档站开发服务 |
| `pnpm docs:build` | 构建文档站 |
| `pnpm play:dev` | 启动演练场 |
| `pnpm play:build` | 构建演练场 |

`<type>` 对应的脚本前缀如下：

| 库类型 | 脚本前缀 |
| --- | --- |
| Vue 组件库 | `design` |
| UnoCSS 预设 | `preset` |
| 工具库 | `tool` |
| Vue 组合式工具库 | `use` |
| Vue 图标库 | `icon` |
| CLI 本身 | `cli`，仅当前模板仓库维护时使用 |

## 打包说明

各库的打包任务位于 `tooling/<type>/index.ts`，底层通过 `gulp` 组织任务，通过 `tsdown` 执行构建。实际源码入口配置在 `tooling/<type>/tsdown.config.ts`，模板默认多数为 `entry: { index: 'src/index.ts' }`，仅生成 `tooling` 到已有项目后请按目标库真实入口调整。

- `components`：输出 ESM、CJS 和类型声明，支持 Vue SFC 与样式注入。
- `hooks`：输出 ESM、CJS 和类型声明，外部化 `vue-demi`。
- `utils`：输出 ESM、CJS 和类型声明，外部化工具库依赖。
- `presets`：输出 ESM 和类型声明，外部化 UnoCSS 相关依赖。
- `icons`：输出 ESM、CJS、IIFE 和类型声明，支持将 SVG 转为 Vue 组件。
- `cli-system`：用于维护 `create-nxy` CLI 包，生成项目时会被移除。

图标库可以先生成 Vue 组件，再构建：

```bash
pnpm icon:generate
pnpm icon:build
```

## 当前仓库开发

如果你是在维护 `create-nxy` 模板仓库本身，可以使用：

```bash
pnpm install
pnpm lint
pnpm test
pnpm build
```

构建 CLI：

```bash
pnpm cli:build
```

本地构建后，CLI 入口输出到 `packages/cli/dist/index.js`。发布配置来自 `packages/cli/package.json`，包名为 `create-nxy`。

## 常见问题

### 为什么生成项目时需要 Git？

CLI 会先通过 `git clone` 拉取模板仓库，再在本地裁剪未选择的目录和脚本。因此本机需要安装 Git，并能访问 `https://github.com/nixwai/create-nxy.git` 或配置好的 SSH 地址。

### 选择 SSH 下载失败怎么办？

请确认本机已经配置 GitHub SSH key，并且可以直接执行：

```bash
git clone git@github.com:nixwai/create-nxy.git
```

如果只是临时使用，选择 `HTTPS` 下载方式更简单。

### 仅生成 tooling 后根目录没有新增脚本怎么办？

这是当前设计。该模式主要复制或合并 `tooling` 配置，不会主动修改目标项目根 `package.json`。可以直接执行：

```bash
pnpm run -C tooling tool:build
```

也可以在目标项目根 `package.json` 中自行增加脚本：

```json
{
  "scripts": {
    "tool:build": "pnpm run -C tooling tool:build"
  }
}
```

### 生成项目后哪些内容会被删除？

CLI 会删除 `.git`、`pnpm-lock.yaml`、CLI 自身包和 CLI 打包配置；未选择的库类型、未选择的 `docs`/`playground` 目录也会被删除。如果没有选择 CSS 样式预设，会移除 Stylelint/Sass/PostCSS 相关配置、脚本和依赖。

## License

[MIT](./LICENSE)
