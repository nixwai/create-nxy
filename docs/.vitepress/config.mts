import { resolve } from 'node:path';
import UnoCSS from 'unocss/vite';
import { defineConfig } from 'vitepress';
import { vitepressDemoPlugin } from 'vitepress-demo-plugin';
import { navbar } from './configs/navbar';
import { sidebar } from './configs/sidebar';

export default defineConfig({
  lang: 'zh-CN',
  title: 'Libs',
  description: '组件、预设、工具...库',
  base: '/libs/',
  outDir: resolve(__dirname, '../../dist/docs'),
  vite: {
    plugins: [UnoCSS() as any],
    css: { preprocessorOptions: { scss: { api: 'modern-compiler' } } },
  },
  markdown: {
    config(md) {
      md.use(vitepressDemoPlugin, { demoDir: resolve(__dirname, '../examples') });
    },
  },
  themeConfig: {
    nav: navbar,
    sidebar,
    socialLinks: [{ icon: 'github', link: 'https://github.com/nixwai/create-libs' }],
    docFooter: {
      prev: '上一页',
      next: '下一页',
    },
    outline: { label: '页面导航' },
    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium',
      },
    },
    langMenuLabel: '多语言',
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
  },
});
