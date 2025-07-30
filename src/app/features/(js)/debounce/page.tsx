import CodeSyntax from "@/components/CodeSyntax";
import SearchInput from "./DenounceSearchInput";
import fs from "fs";
import path from "path";
import { Suspense } from "react";
import { Loader } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const CODE1 = `
timerRef.current = setTimeout(() => {
  fnRef.current(...args);
}, delay)
`

const CODE2 = `
if (timerRef.current) {
  clearTimeout(timerRef.current);
}
`

const CODE3 = `
const handleSearch = (query: string) => {
    setSearchValue(query);
  };
// 防抖：用户停止输入 2000ms 后执行搜索，首次输入立即执行
const debouncedSearch = useDebounce(handleSearch, 2000, true);
<Input
  id="input"
  value={input}
  placeholder="请输入..."
  className={cn(className, \`my-2 \`)}
  onChange={(e) => {
    setInput(e.target.value);
    debouncedSearch(e.target.value); // 触发防抖函数
  }}
/>
`

async function DebouncePage() {

  // 获取 useDebounce.tsx 文件内容的内容
  const debounceFilePath = path.join(process.cwd(), "src/hooks/useDebounce.tsx");
  const debounceFileContent = await fs.readFileSync(debounceFilePath, "utf-8");

  return (
    <div>
      <div className="my-4">
        <h2 className="text-xl font-bold">一、实用案例</h2>
        <div className="w-full">
          <SearchInput className="w-[450px]" />
        </div>
      </div>
      <div className="my-4">
        <h2 className="text-xl font-bold">二、实现代码</h2>
        <div className="w-full">
          <div className="my-4">
            <Suspense fallback={<Loader />}>
              <CodeSyntax code={debounceFileContent} language="jsx" />
            </Suspense>
          </div>
          <div className="text-lg font-bold my-1">原理解释：</div>
          <ul>
            <li>
              1）当事件触发时，防抖函数会设置一个定时器，延迟执行目标函数
              <div className="my-4">
                <CodeSyntax code={CODE1} />
              </div>
            </li>
            <li>
              2）若在延迟时间内事件再次被触发，则清除前一个定时器并重新开始计时
              <div className="my-4">
                <CodeSyntax code={CODE2} />
              </div>
            </li>
            <li>
              3）只有当事件停止触发且延迟时间结束时，目标函数才会执行（第一步定时器中的函数<Badge variant="secondary">fnRef.current(...args)</Badge>）
            </li>
          </ul>
          <div className="text-lg font-bold my-1">使用方式：</div>
          <div className="my-4">
            <CodeSyntax code={CODE3} language="jsx" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DebouncePage;




