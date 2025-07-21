// 1. 创建观察器实例
const observer = new IntersectionObserver(
	entries => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				const linkElement = entry.target;
				const targetUrl = linkElement.href;
				// 开始预加载
				prefetchPage(targetUrl);
				observer.unobserve(linkElement); // 仅加载一次
			}
		});
	},
	{
		threshold: 0.01, // 至少 1%可见时触发
		rootMargin: "0px 0px 200px 0px", // 提前 200px 触发
	},
);

// 2. 注册需要预加载的链接
document.querySelectorAll("a[data-prefetch]").forEach(link => {
	observer.observe(link);
});

// 预加载函数
function prefetchPage(url) {
	// 方案一：使用 <link rel="prefetch"> 实现预加载
	const prefetchLink = document.createElement("link");
	prefetchLink.rel = "prefetch";
	prefetchLink.href = url;
	prefetchLink.as = "document";
	document.head.appendChild(prefetchLink); // 将创建的 <link rel="prefetch" href=url as="document"> 挂在 head 中。

	// 方案二：使用 fetch API (适用于数据请求)
	fetch(url, {
		mode: "no-cors",
		// 允许跨域请求，但不会触发CORS机制（不发送OPTIONS预检请求）。
		// 浏览器不会抛出跨域错误​（即使响应头缺少 Access-Control-Allow-Origin）。
		// 代价：JavaScript ​无法读取响应内容​（状态码、响应头、响应体均不可访问）
		credentials: "include", // 表示请求会携带凭据（如Cookies、HTTP认证信息），与当前页面的同源策略一致
		headers: {
			Purpose: "prefetch", // 请求头明确告知服务器这是一个预取请求
		},
	}).catch(() => {}); // 静默失败
}
