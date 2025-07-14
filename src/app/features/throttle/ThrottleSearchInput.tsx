"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useThrottle from "@/hooks/useThrottle";
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

  // 节流：每隔多久输出一次
  const throttleSearch = useThrottle(handleSearch,  2000, true);

  return (
    <div className="">
      <Label className="my-2 text-2xl" htmlFor="input">防抖动输入框</Label>
      <Input
        id="input"
        value={input}
        placeholder="请输入"
        className={cn(className, `my-2`)}
        onChange={(e) => {
          setInput(e.target.value);
          throttleSearch(e.target.value); // 触发防抖函数
        }}
      />
      <h3>当在文本框中输入内容时，无论输入快慢，以及内容，每 2s 后一定执行一次</h3>
      <p><span className="font-bold">文本框数据</span>：{input}</p>
      <p><span className="font-bold">执行搜索的值</span>：{searchValue}</p>
    </div>
  );
};

export default SearchInput;