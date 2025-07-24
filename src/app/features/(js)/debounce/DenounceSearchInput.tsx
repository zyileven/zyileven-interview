"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useDebounce from "@/hooks/useDebounce";
import { cn } from "@/lib/utils";
import { useState } from "react";

const SearchInput = ({
  className
}: {
  className?: string;
}) => {
  const [input, setInput] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const handleSearch = (query: string) => {
    setSearchValue(query);
  };

  // 防抖：用户停止输入 2000ms 后执行搜索，首次输入立即执行
  const debouncedSearch = useDebounce(handleSearch, 2000, true);

  return (
    <div>
      <h3 className="my-2 text-[14px]">当在文本框中输入内容时，快速输入时不会执行搜索，只有暂停输入 2s 才能进行搜索</h3>
      <div className="flex ">
        <Label className="my-2 shrink-0" htmlFor="input">防抖动输入框：</Label>
        <Input
          id="input"
          value={input}
          placeholder="请输入..."
          className={cn(className, `my-2 `)}
          onChange={(e) => {
            setInput(e.target.value);
            debouncedSearch(e.target.value); // 触发防抖函数
          }}
        />
      </div>
      <p className="my-2"><span className="font-bold">文本框数据</span>：{input}</p>
      <p className="my-2"><span className="font-bold">执行搜索的值</span>：{searchValue}</p>
    </div>
  );
};

export default SearchInput;