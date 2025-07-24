"use client";

import { UploadIcon } from "lucide-react"
import { Button } from "../ui/button"
import { FC, useEffect, useRef } from "react";

export const Upload: FC<{
  accept?: string;
  url: string;
}> = ({
  accept = "*",
  url
}) => {

    const inputRef = useRef<HTMLInputElement>(null);
    // const allowedTypes = accept.split(",");


    const handleClickUpload = () => {
      if (!inputRef.current) return;
      // 触发点击
      inputRef.current.click();

    }

    useEffect(() => {
      if (!inputRef.current) return;

      const inputDOM = inputRef.current

      inputDOM.addEventListener("change", (e: Event) => {
        const target = e.target as HTMLInputElement;
        // const files = target.files;
        console.log('files:zzz', target.files);

        const files = target.files ?? [];
        if (files.length === 0) return;

        // FormData 封装文件数据，支持二进制传输
        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
          console.log("files[i]:zzz", files[i].type);
          console.log("files[i]:zzz", files[i].bytes);
          
          formData.append('files', files[i]); // 支持多文件
        }

        // 发送到服务器（以Fetch API为例）
        fetch(url, {
          method: 'POST',
          body: formData
        })
          .then(response => response.json())
          .then(data => console.log('上传成功', data))
          .catch(error => console.error('上传失败', error));
      });

      return () => {
        // 清除监听
        inputDOM.removeEventListener("change", () => {});
      }

    }, [])

    return <>
      <Button
        onClick={handleClickUpload}
        className="cursor-pointer flex items-center justify-center bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-md transition-colors duration-300"
      >
        <UploadIcon className="mr-2 h-5 w-5 animate-bounce" />
        Upload File
      </Button>
      <input ref={inputRef} accept={accept} type="file" className="hidden" />
    </>
  }

