import type { PluginOption } from 'vite';
import { dirname, relative } from 'node:path';

/** vue组件样式自动引入插件 */
export function styleInjectPlugin(): PluginOption {
  return {
    name: 'style-inject',
    generateBundle({ format }, bundle) {
      const cssPath: Record<string, string[]> = {};
      const indexBundler: Record<string, any> = {};
      for (const bundler of Object.values(bundle)) {
        const { fileName } = bundler;
        // 收集有css的组件文件地址
        const srcCompPath = fileName.split('/').slice(0, -2).join('/'); // 获取需要引入的css目录
        if (fileName.includes('.css')) {
          if (!cssPath[srcCompPath]) {
            cssPath[srcCompPath] = [];
          }
          cssPath[srcCompPath].push(fileName);
        }
        // 收集所有的index入口代码文件
        if ('code' in bundler && (fileName.includes('index.js') || fileName.includes('index.mjs'))) {
          const sreIndexPath = fileName.split('/').slice(0, -1).join('/');
          indexBundler[sreIndexPath] = bundler;
        }
      }
      for (const key in indexBundler) {
        const bundler = indexBundler[key];
        if (!cssPath[key]) {
          continue;
        }
        // 生成引入文件代码
        const injection = cssPath[key].map((cssFilePath) => {
          cssFilePath = relative(dirname(bundler.fileName), cssFilePath).replaceAll(/[\\/]+/g, '/');
          cssFilePath = cssFilePath.startsWith('.') ? cssFilePath : `./${cssFilePath}`;
          return format === 'es' ? `import '${cssFilePath}';\n` : `require('${cssFilePath}');\n`;
        }).join('');
        // 插入代码
        bundler.code = bundler.code.concat(injection);
      }
    },
  };
}
