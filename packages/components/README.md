# Components

## 开发指南

1. 在src目录下创建组件目录（如src/alert）;

2. 按照以下结构组织代码：
```
alert
├── src
│   ├── alert.ts   # 类型定义
│   └── alert.vue  # 组件实现
└── index.ts       # 组件导出
```

3. 在src/index.ts中导出新组件
```ts
export * from './alert';
```

4. 在src/installer.ts中添加新组件到安装器
```ts
const installer = makeInstaller([
  Alert, // 新增的组件
]);
```

5. 在global.d.ts中添加类型定义
```ts
export interface GlobalComponents {
  Alert: typeof import('you lib name')['Alert']
}
```
