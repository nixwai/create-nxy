import type { TsdownPlugin } from 'tsdown';
import { dirname, relative } from 'node:path';

interface ChunkWithCode {
  fileName: string
  code: string
}

/** vue component style auto import plugin */
export function styleInjectPlugin(): TsdownPlugin {
  return {
    name: 'style-inject',
    generateBundle: {
      order: 'post',
      handler({ format }, bundle) {
        const cssPath: Record<string, string[]> = {};
        const indexBundler: Record<string, ChunkWithCode> = {};

        for (const bundler of Object.values(bundle)) {
          const fileName = normalizePath(bundler.fileName);

          if (fileName.includes('.css')) {
            const srcCompPath = fileName.split('/').slice(0, -2).join('/');
            if (!cssPath[srcCompPath]) {
              cssPath[srcCompPath] = [];
            }
            cssPath[srcCompPath].push(fileName);
          }

          if (
            'code' in bundler
            && typeof bundler.code === 'string'
            && (fileName.includes('index.js') || fileName.includes('index.mjs'))
          ) {
            const sreIndexPath = fileName.split('/').slice(0, -1).join('/');
            indexBundler[sreIndexPath] = bundler;
          }
        }

        for (const key in indexBundler) {
          const bundler = indexBundler[key];
          if (!cssPath[key]) {
            continue;
          }

          const injection = cssPath[key].map((cssFilePath) => {
            cssFilePath = relative(dirname(normalizePath(bundler.fileName)), cssFilePath).replaceAll(/[\\/]+/g, '/');
            cssFilePath = cssFilePath.startsWith('.') ? cssFilePath : `./${cssFilePath}`;
            return format === 'es' ? `import '${cssFilePath}';\n` : `require('${cssFilePath}');\n`;
          }).join('');

          bundler.code = injectBeforeSourceMap(bundler.code, injection);
        }
      },
    },
  };
}

function normalizePath(path: string) {
  return path.replaceAll(/[\\/]+/g, '/');
}

function injectBeforeSourceMap(code: string, injection: string) {
  if (!injection) {
    return code;
  }

  const sourceMapIndex = code.lastIndexOf('//# sourceMappingURL=');
  if (sourceMapIndex === -1) {
    return code.endsWith('\n') ? `${code}${injection}` : `${code}\n${injection}`;
  }

  const beforeSourceMap = code.slice(0, sourceMapIndex).trimEnd();
  const sourceMapComment = code.slice(sourceMapIndex);
  return `${beforeSourceMap}\n${injection}${sourceMapComment}`;
}
