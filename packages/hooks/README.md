# Hooks

## 开发指南

1. 在src目录下创建函数目录，在目录下的index.ts文件中导出函数;

2. 在src/index.ts中导出新函数;

3. helper文件中可存放一些公用方法。

4. 如需兼容vuu2时，使用`vue-demi`提供的api进行封装，不需要兼容的话可卸载`vue-demi`依赖以及相关配置，添加vue3依赖使用其api即可。
