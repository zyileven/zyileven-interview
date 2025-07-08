"use client";
import { useEffect, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import {
  oneLight,  // 亮色主题
  oneDark    // 暗色主题
} from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

export default function CodeSyntax({
  code,
  language = 'javascript',
  theme = 'dark',
  showLineNumbers = false,
  className
}: {
  code: string;
  language?: "jsx" | "javascript" | "css" | "shell";
  theme?: "dark" | "light";
  showLineNumbers?: boolean
  className?: string;
}) {

  const [copied, setCopied] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  // 动态加载冷门语言（按需减少打包体积）
  useEffect(() => {
    const loadLanguage = async () => {
      if (["rust", "kotlin", "swift"].includes(language)) {
        await import(`react-syntax-highlighter/dist/cjs/languages/prism/${language}`);
      }
    };
    loadLanguage();
    setIsMounted(true);
  }, [language]);

  // 复制状态重置
  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  if (!isMounted) return null;

  return (
    <div className="relative group">
      <div className="rounded-lg overflow-hidden bg-white dark:bg-gray-900">
        <SyntaxHighlighter
          className={cn(className, ``)}
          language={language}
          style={theme === 'dark' ? oneDark : oneLight}
          showLineNumbers={showLineNumbers}
          PreTag="div"
        >
          {code}
        </SyntaxHighlighter>
      </div>
      <CopyToClipboard text={code} onCopy={() => setCopied(true)}>
        <button className="absolute top-3 right-3 p-2 rounded-md bg-gray-800/70 hover:bg-gray-700/90 transition-opacity opacity-0 group-hover:opacity-100 cursor-pointer">
          {copied ? (
            <Check size={16} className="text-green-500" />
          ) : (
            <Copy size={16} className="text-gray-300 dark:text-gray-400" />
          )}
        </button>
      </CopyToClipboard>
    </div>
  );
}
