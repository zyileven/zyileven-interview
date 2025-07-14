import CodeSyntax from "@/components/CodeSyntax";
import SearchInput from "./DenounceSearchInput";
import fs from "fs";
import path from "path";
import { Suspense } from "react";
import { Loader } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
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


async function DebouncePage() {

  // 获取 useDebounce.tsx 文件内容的内容
  const debounceFilePath = path.join(process.cwd(), "src/hooks/useDebounce.tsx");
  const debounceFileContent = await fs.readFileSync(debounceFilePath, "utf-8");

  return (
    <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger className="max-w-[400px] cursor-pointer flex justify-start items-center">
            <h2 className="text-xl font-bold">实现代码</h2>
          </AccordionTrigger>
          <AccordionContent>
            <div className="w-full">
              <Suspense fallback={<Loader />}>
                <CodeSyntax code={debounceFileContent} language="jsx" />
              </Suspense>
              <div className="text-lg font-bold my-1">原理解释：</div>
              <ul>
                <li>
                  1）当事件触发时，防抖函数会设置一个定时器，延迟执行目标函数
                  <CodeSyntax code={CODE1} />
                </li>
                <li>
                  2）若在延迟时间内事件再次被触发，则清除前一个定时器并重新开始计时
                  <CodeSyntax code={CODE2} />
                </li>
                <li>
                  3）只有当事件停止触发且延迟时间结束时，目标函数才会执行（第一步定时器中的函数<Badge variant="secondary">fnRef.current(...args)</Badge>）
                </li>
              </ul>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className="max-w-[400px] cursor-pointer flex justify-start items-center">
            <h2 className="text-xl font-bold">实用案例</h2>
          </AccordionTrigger>
          <AccordionContent>
            <h2 className="text-base font-bold text-blue-500">输入框防抖案例</h2>
            <div className="w-full">
              <SearchInput />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
  );
}

export default DebouncePage;




