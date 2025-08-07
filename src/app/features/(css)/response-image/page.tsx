import CodeSyntax from "@/components/CodeSyntax";

const CODE1 = `
<style>
  img {
    max-width: 100%;
  }
</style>

<picture>
    <source type="image/webp" srcSet="https://raw.githubusercontent.com/zyileven/image-hosting-platform/master/src/2025/08/04/212eaa2ee16eb4d1705b2ce1f5177b39-patrick-wittke-GGWduVKPJho-unsplash-57d1c2.webp 1x, https://raw.githubusercontent.com/zyileven/image-hosting-platform/master/src/2025/08/04/212eaa2ee16eb4d1705b2ce1f5177b39-patrick-wittke-GGWduVKPJho-unsplash-57d1c2.webp 2x" />
    <source type="image/png" srcSet="https://raw.githubusercontent.com/zyileven/image-hosting-platform/master/src/2025/08/04/e3a2c9b9337bbeef9adea2cdb3c1b4c3-patrick-wittke-GGWduVKPJho-unsplash-7ed8ce.jpg 1x, https://raw.githubusercontent.com/zyileven/image-hosting-platform/master/src/2025/08/04/e3a2c9b9337bbeef9adea2cdb3c1b4c3-patrick-wittke-GGWduVKPJho-unsplash-7ed8ce.jpg 2x" />
    <img className="max-w-[100%]" alt="my image" src="https://raw.githubusercontent.com/zyileven/image-hosting-platform/master/src/2025/08/04/e3a2c9b9337bbeef9adea2cdb3c1b4c3-patrick-wittke-GGWduVKPJho-unsplash-7ed8ce.jpg" loading="lazy" width="1000" height="1000" />
</picture>
`

function ResponseImagePage() {
    return (
        <div className="overflow-hidden">
            <h1 className="text-2xl font-bold my-4">响应式图片</h1>
            <p className="my-1">通过使用现代图片标签属性，我们能适应各类设备和分辨率。以下是一个响应式图片的示例。</p>
            <div className="my-2">
                <CodeSyntax code={CODE1} language="html" />
            </div>
            <picture className="my-2">
                <source type="image/webp" srcSet="https://raw.githubusercontent.com/zyileven/image-hosting-platform/master/src/2025/08/04/212eaa2ee16eb4d1705b2ce1f5177b39-patrick-wittke-GGWduVKPJho-unsplash-57d1c2.webp 1x, https://raw.githubusercontent.com/zyileven/image-hosting-platform/master/src/2025/08/04/212eaa2ee16eb4d1705b2ce1f5177b39-patrick-wittke-GGWduVKPJho-unsplash-57d1c2.webp 2x" />
                <source type="image/png" srcSet="https://raw.githubusercontent.com/zyileven/image-hosting-platform/master/src/2025/08/04/e3a2c9b9337bbeef9adea2cdb3c1b4c3-patrick-wittke-GGWduVKPJho-unsplash-7ed8ce.jpg 1x, https://raw.githubusercontent.com/zyileven/image-hosting-platform/master/src/2025/08/04/e3a2c9b9337bbeef9adea2cdb3c1b4c3-patrick-wittke-GGWduVKPJho-unsplash-7ed8ce.jpg 2x" />
                <img className="max-w-[100%]" alt="my image" src="https://raw.githubusercontent.com/zyileven/image-hosting-platform/master/src/2025/08/04/e3a2c9b9337bbeef9adea2cdb3c1b4c3-patrick-wittke-GGWduVKPJho-unsplash-7ed8ce.jpg" loading="lazy" width="1000" height="1000" />
            </picture>

            <p className="my-2">打开 F12 可以查看图片的 src 属性，展示的 src 是 jpg 的 url，但是当前来源却是 webp 文件</p>

            <img className="my-2" src="https://raw.githubusercontent.com/zyileven/image-hosting-platform/master/src/2025/08/04/922f99c55ae8ffec909c5ce3192f0f54-image-20250804下午51000156-388e34.png" alt="" width="400" height="400" />

        </div>
    );
}

export default ResponseImagePage;