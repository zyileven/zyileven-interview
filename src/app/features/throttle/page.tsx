import CodeSyntax from "@/components/CodeSyntax";
import SearchInput from "./ThrottleSearchInput";
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

function ThrottlePage() {

  // 获取 useThrottle.tsx 文件内容的内容
  const filePath = path.join(process.cwd(), "src/hooks/useThrottle.tsx");
  const fileContent = fs.readFileSync(filePath, "utf-8");

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger className="max-w-[400px] cursor-pointer flex justify-start items-center">
          <h2 className="text-xl font-bold">实现代码</h2>
        </AccordionTrigger>
        <AccordionContent>
          <div className="w-full">
            <Suspense fallback={<Loader />}>
              <CodeSyntax code={fileContent} language="jsx" />
            </Suspense>
            <div className="text-lg font-bold my-1">原理解释：</div>
            <ul>
              
            </ul>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger className="max-w-[400px] cursor-pointer flex justify-start items-center">
          <h2 className="text-xl font-bold">实用案例</h2>
        </AccordionTrigger>
        <AccordionContent>
          <h2 className="text-base font-bold text-blue-500">输入框节流案例</h2>
          <div className="w-full">
            <SearchInput />
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export default ThrottlePage;




