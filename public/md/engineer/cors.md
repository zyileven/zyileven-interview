## CORS 跨域



### **跨域的本质：浏览器同源策略**

#### 同源定义

- 协议、域名、端口三者完全相同即为同源，任意一项不同即构成跨域。
- 常见跨域场景：
  - 协议不同：http://a.com → https://a.com
  - 子域不同：www.a.com → api.a.com
  - 端口不同：a.com:80 → a.com:8080。

#### 同源策略的限制

- 禁止读取跨域资源的 DOM、Cookie、LocalStorage
- 拦截跨域 AJAX 请求（核心痛点）

### **8 大跨域解决方案与适用场景**

#### **CORS**

原理：服务端设置 `Access-Control-Allow-Origin` 等响应头

适用场景：前后端分离项目（主流方案）

✅ 支持所有 HTTP 方法

❌ 需服务端配合

```js
const express = require('express');
const cors = require('cors');
const app = express();

// 允许特定源访问（非简单请求需处理 OPTIONS 预检）
app.use(cors({
  origin: 'https://your-frontend.com',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
  credentials: true // 允许携带 Cookie
}));
app.get('/data', (req, res) => res.json({ data: 'CORS-enabled' }));
```



#### **JSONP**

原理：利用 `<script>` 标签无跨域限制，通过回调函数获取数据

适用场景：兼容旧浏览器、简单 GET 请求

✅ 无需服务端改造

❌ 仅支持 GET、安全性低

```html
<script>
  function handleData(data) {
    console.log('Received:', data);
  }
</script>
<script src="http://api.com/data?callback=handleData"></script>
```



#### **代理服务器**

原理：前端请求同源代理，代理转发至目标服务器

适用场景：

- 开发调试（Webpack/Vite）
- 生产部署（Nginx）

✅ 前端无感知

❌ 需服务器配置

**webpack** 

```js
// webpack.config.js
module.exports = {
  devServer: {
    proxy: {
      // 简单代理：匹配 /api 前缀的请求
      '/api': {
        target: 'http://localhost:3000', // 后端地址
        changeOrigin: true,              // 修改请求头Host为目标域名
        pathRewrite: { '^/api': '' }     // 移除路径中的 /api
      },
      // 多路径代理：同时处理 /auth 和 /data
      '/auth': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  }
};
```

**vite**

```js
// vite.config.ts
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // 后端地址
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '') // 路径重写
      }
    }
  }
});
```

前端调用 `axios.get('/api/data')` → 实际访问 `http://localhost:5000/data`

**nginx** 

```js
server {
  listen 80;
  server_name yourdomain.com; # 前端域名

  # 静态资源服务
  location / {
    root /var/www/dist;      # 前端构建产物路径
    index index.html;
    try_files $uri $uri/ /index.html; # 支持SPA路由
  }

  # API代理
  location /api {
    proxy_pass http://backend-server:3000; # 后端服务地址
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
  }
}
```



#### **WebSocket**

原理：基于 TCP 的双向通信协议，不受同源策略限制

适用场景：实时聊天、股票行情等

✅ 全双工通信、高效

❌ 需服务端支持协议



#### **postMessage**

原理：HTML5 API，跨窗口/iframe 间安全传递消息

适用场景：单点登录、跨域弹窗通信

✅ 安全灵活

❌ 需双方实现监听逻辑



#### **document.domain**

原理：强制设置相同父域名（如 `a.example.com` 与 `b.example.com` 设为 `example.com`）

适用场景：同主域不同子域

✅ 简单直接

❌ 仅限域名差异场景



#### **Nginx 反向代理**

原理：通过 Nginx 配置转发请求并添加 CORS 头部

适用场景：生产环境统一网关

✅ 高性能、隐藏真实 API

❌ 运维成本高

```js
server {
  listen 80;
  server_name your-domain.com;
  
  location /api/ {
    proxy_pass http://backend-server:8080; # 转发目标
    add_header 'Access-Control-Allow-Origin' 'https://your-frontend.com';
    add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
  }
}
```



#### **浏览器临时方案**

原理：启动参数禁用安全策略（如 `chrome --disable-web-security`）

适用场景：本地开发调试

⚠️ **严禁生产环境使用**

































