# 知数 · 高中数学互动学习

一个免登录、可在手机和电脑使用的纯前端高中数学学习网站。内容按人教A版2019核心章节重新编写，学习进度、测试记录和错题保存在浏览器本地。

## 已实现功能

- 9 个章节、72 个知识卡、18 道精讲例题、90 道原创练习
- 集合韦恩图、函数图象、单位圆与三角函数、平面向量四个互动组件
- 章节小测、20 题综合能力卷、即时判分和逐题解析
- 错题自动收集，连续答对两次标记为掌握
- 学习首页、测试中心、错题本和章节学习报告
- 本地断点续测、进度重置、PWA 离线访问
- GitHub Pages 自动部署工作流

## 本地运行

要求 Node.js 20 或更高版本。

```bash
npm install
npm run dev
```

打开终端中显示的本地地址即可。生产构建与预览：

```bash
npm run build
npm run preview
```

## 检查与测试

```bash
npm run check:content
npm test
npm run test:e2e
npm run test:offline
```

`npm run check` 会依次执行内容完整性校验、单元测试和生产构建。

## 发布到 GitHub Pages

1. 将项目提交到 GitHub 仓库的 `main` 分支。
2. 在仓库的 **Settings → Pages** 中把发布来源设为 **GitHub Actions**。
3. 推送后，`.github/workflows/deploy.yml` 会自动校验、构建并发布。

应用使用相对资源路径和 `HashRouter`，因此可以直接部署在仓库子路径下。

## 本地数据

学习记录保存在 `localStorage` 的 `zhishu-progress-v1` 键中。报告页提供带确认提示的“重置进度”操作。应用不包含账号、云端同步或远程数据库。
