# 部署指南

本文档将指导您如何将曝光页面部署到各种平台。

## 快速部署选项

### 1. GitHub Pages（推荐）

GitHub Pages 是最简单且免费的部署方式。

#### 步骤：
1. 在 GitHub 上创建一个新的仓库
2. 将所有文件上传到仓库
3. 进入仓库设置 → Pages
4. 选择 Source 为 "Deploy from a branch"
5. 选择 Branch 为 "main" 或 "master"
6. 点击 "Save"

几分钟后，您的页面将在 `https://your-username.github.io/your-repo-name` 上线。

### 2. Netlify

Netlify 提供免费托管和自动部署。

#### 步骤：
1. 访问 [netlify.com](https://netlify.com)
2. 注册并登录
3. 点击 "New site from Git"
4. 选择您的 Git 仓库
5. 配置部署设置：
   - Build command: 留空
   - Publish directory: `.`
6. 点击 "Deploy site"

### 3. Vercel

Vercel 是另一个优秀的静态站点托管平台。

#### 步骤：
1. 访问 [vercel.com](https://vercel.com)
2. 注册并登录
3. 点击 "New Project"
4. 导入您的 Git 仓库
5. 配置项目设置（通常使用默认设置即可）
6. 点击 "Deploy"

### 4. 阿里云 OSS

如果您在中国大陆，阿里云 OSS 是一个不错的选择。

#### 步骤：
1. 登录阿里云控制台
2. 创建 OSS 存储桶
3. 设置存储桶为静态网站托管
4. 上传所有文件到存储桶
5. 配置自定义域名（可选）

### 5. 腾讯云 COS

腾讯云 COS 也提供静态网站托管服务。

#### 步骤：
1. 登录腾讯云控制台
2. 创建 COS 存储桶
3. 开启静态网站功能
4. 上传文件到存储桶
5. 配置自定义域名（可选）

## 自定义域名配置

### 1. 购买域名
推荐在以下平台购买域名：
- 阿里云万网
- 腾讯云
- 华为云
- GoDaddy
- Namecheap

### 2. 配置 DNS
根据您选择的托管平台，配置相应的 DNS 记录：

#### GitHub Pages
添加 CNAME 记录：
```
类型: CNAME
名称: @
值: your-username.github.io
```

#### Netlify
添加 CNAME 记录：
```
类型: CNAME
名称: @
值: your-site.netlify.app
```

#### Vercel
添加 CNAME 记录：
```
类型: CNAME
名称: @
值: your-site.vercel.app
```

### 3. 在托管平台配置自定义域名
在托管平台的控制面板中添加您的自定义域名。

## HTTPS 配置

大多数现代托管平台都自动提供 HTTPS 证书：

- **GitHub Pages**: 自动提供 HTTPS
- **Netlify**: 自动提供 HTTPS
- **Vercel**: 自动提供 HTTPS
- **阿里云 OSS**: 需要单独配置 SSL 证书
- **腾讯云 COS**: 需要单独配置 SSL 证书

## 性能优化

### 1. 启用 Gzip 压缩
大多数托管平台自动启用 Gzip 压缩。

### 2. 配置缓存
在服务器或 CDN 上配置适当的缓存策略：

```nginx
# Nginx 配置示例
location ~* \.(css|js|png|jpg|jpeg|gif|ico|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

### 3. 使用 CDN
考虑使用 CDN 来加速全球访问：
- Cloudflare（免费）
- 阿里云 CDN
- 腾讯云 CDN

## 监控和分析

### 1. 访问统计
集成以下服务来监控页面访问：

#### Google Analytics
在 `index.html` 的 `<head>` 中添加：
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_TRACKING_ID');
</script>
```

#### 百度统计
在 `index.html` 的 `<head>` 中添加：
```html
<!-- 百度统计 -->
<script>
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?YOUR_SITE_ID";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();
</script>
```

### 2. 错误监控
集成错误监控服务：

#### Sentry
在 `index.html` 的 `<head>` 中添加：
```html
<!-- Sentry -->
<script
  src="https://browser.sentry-cdn.com/5.29.0/bundle.min.js"
  integrity="sha384-..."
  crossorigin="anonymous"
></script>
<script>
  Sentry.init({ dsn: 'YOUR_SENTRY_DSN' });
</script>
```

## 安全配置

### 1. 内容安全策略 (CSP)
在 `index.html` 的 `<head>` 中添加：
```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://fonts.googleapis.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com;">
```

### 2. 防止点击劫持
在 `index.html` 的 `<head>` 中添加：
```html
<meta http-equiv="X-Frame-Options" content="DENY">
```

### 3. XSS 保护
在 `index.html` 的 `<head>` 中添加：
```html
<meta http-equiv="X-XSS-Protection" content="1; mode=block">
```

## 备份策略

### 1. 代码备份
- 使用 Git 进行版本控制
- 定期推送到远程仓库
- 考虑使用多个 Git 平台（GitHub、GitLab、Gitee）

### 2. 数据备份
- 定期导出用户数据
- 备份配置文件
- 保存重要的用户反馈

## 故障排除

### 常见问题

#### 1. 页面无法访问
- 检查 DNS 配置是否正确
- 确认托管平台服务是否正常
- 检查文件是否完整上传

#### 2. 样式或脚本无法加载
- 检查文件路径是否正确
- 确认文件编码为 UTF-8
- 检查浏览器控制台是否有错误

#### 3. 第三方服务无法使用
- 检查 API 配置是否正确
- 确认网络连接正常
- 查看浏览器控制台错误信息

### 联系支持
如果遇到问题，可以：
1. 查看托管平台的官方文档
2. 在相关论坛寻求帮助
3. 联系托管平台的技术支持

---

**注意**：部署前请确保所有内容真实可靠，遵守相关法律法规。
