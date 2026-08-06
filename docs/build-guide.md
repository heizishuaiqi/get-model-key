# GetModelKey 手动构建指南

## 前提

- Node.js 已安装（项目用 22.x）
- 在项目根目录 `getModelKey/` 下操作

## 构建步骤

### 1. 打开终端，进入项目目录

```bash
cd E:\AI-webSite\getModelKey\getModelKey
```

### 2. 构建静态站点

```bash
npm run build
```

这实际执行的是 `next build --webpack`，约 15-20 秒，生成 160 个页面到 `out/` 目录。

**成功标志**：最后会显示路由表，类似：
```
✓ Generating static pages using 19 workers (160/160) in 1018ms
```

### 3. 本地预览（可选）

```bash
npx serve out -l 3000
```

然后浏览器打开 `http://localhost:3000`

或者用 Python（更稳定）：
```bash
python -m http.server 3000 --directory out
```

### 4. 部署到 Vercel

`out/` 目录的产物会自动被 Vercel 识别。直接 `git push` 即可，Vercel 会自动构建部署。

或者手动部署：
```bash
npx vercel --prod
```

---

## 常见问题

### 构建失败：Module not found (字体错误)

**症状**：`Can't resolve '@vercel/turbopack-next/internal/font/google/font'`

**原因**：Next.js 16 默认用 Turbopack，但 Turbopack 的 Google Fonts 有 bug。

**解决**：`package.json` 的 build 脚本已固定为 `next build --webpack`，不会遇到这个问题。如果你改过脚本，确保带 `--webpack` 标志。

### 构建失败：EPERM (文件锁)

**症状**：`Error: EPERM: operation not permitted, open '.next\trace-build'`

**原因**：之前的构建进程没有完全退出，`.next/` 目录里的文件还被占用。

**解决**：
```bash
# 方法1：关掉所有 node 进程后重试
taskkill /F /IM node.exe
npm run build

# 方法2：直接删掉 .next 目录后重试（需要先关掉服务器）
rmdir /S /Q .next
npm run build
```

### 构建失败：Type error

**症状**：TypeScript 类型检查失败

**解决**：
```bash
# 先单独跑类型检查看具体错误
npx tsc --noEmit

# 修复错误后重新构建
npm run build
```

### 构建产物过时（页面不更新）

**症状**：改了代码但页面没变化

**原因**：`out/` 目录是旧的构建产物。

**解决**：删除后重新构建：
```bash
rmdir /S /Q out
rmdir /S /Q .next
npm run build
```

---

## 项目结构速览

```
getModelKey/
├── src/                    # 业务代码（不要动）
│   ├── app/                # 页面路由 (site)/英文  zh/中文
│   ├── components/         # React 组件
│   ├── data/               # JSON 数据（指南、供应商、配置）
│   ├── lib/                # 工具函数
│   ├── styles/             # 全局样式
│   └── types/              # TypeScript 类型定义
├── docs/                   # 项目文档
├── public/                 # 静态资源（图标、图片）
├── out/                    # 构建产物（自动生成，不要手动改）
├── next.config.js          # Next.js 配置
├── tailwind.config.ts      # Tailwind 配置
├── tsconfig.json           # TypeScript 配置
└── package.json            # 依赖和脚本
```

## 快速验证清单

构建后检查这几个关键页面：
- `http://localhost:3000/` — 首页
- `http://localhost:3000/about/` — About 页（作者信息）
- `http://localhost:3000/guides/` — 指南列表
- `http://localhost:3000/guides/claude-api-key-complete-guide/` — 指南详情
- `http://localhost:3000/providers/` — 供应商列表
- `http://localhost:3000/zh/` — 中文首页
