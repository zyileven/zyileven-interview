"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Home, Search, ArrowLeft, RefreshCw, FileX } from "lucide-react"

export default function NotFoundPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      console.log("搜索:", searchQuery)
    }
  }

  const quickLinks = [
    { name: "首页", href: "/" },
    { name: "产品", href: "/products" },
    { name: "文档", href: "/docs" },
    { name: "支持", href: "/support" },
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="text-center max-w-2xl mx-auto">
        {/* 404 图标和数字 */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 mb-6 bg-gray-100 dark:bg-gray-800 rounded-full">
            <FileX className="w-12 h-12 text-gray-400 dark:text-gray-500" />
          </div>
          <h1 className="text-6xl md:text-8xl font-bold text-gray-900 dark:text-white mb-4">404</h1>
          <h2 className="text-xl md:text-2xl font-medium text-gray-600 dark:text-gray-300 mb-2">页面未找到</h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
            抱歉，您访问的页面不存在或已被移动。请检查网址是否正确，或使用下方的搜索功能。
          </p>
        </div>

        {/* 搜索框 */}
        {/* <Card className="mb-8 border border-gray-200 dark:border-gray-700 shadow-sm">
          <CardContent className="p-4">
            <form onSubmit={handleSearch} className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="搜索内容..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 border-gray-200 dark:border-gray-700 focus:border-gray-400 dark:focus:border-gray-500"
                />
              </div>
              <Button
                type="submit"
                variant="outline"
                className="border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 bg-transparent"
              >
                搜索
              </Button>
            </form>
          </CardContent>
        </Card> */}

        {/* 快速链接 */}
        {/* <div className="mb-8">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">或者访问这些页面：</p>
          <div className="flex flex-wrap justify-center gap-2">
            {quickLinks.map((link) => (
              <Link key={link.name} href={link.href}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  {link.name}
                </Button>
              </Link>
            ))}
          </div>
        </div> */}

        {/* 操作按钮 */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/">
            <Button className="cursor-pointer bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100">
              <Home className="mr-2 w-4 h-4" />
              返回首页
            </Button>
          </Link>

          <Button
            variant="outline"
            className="cursor-pointer border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 bg-transparent"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="mr-2 w-4 h-4" />
            返回上页
          </Button>

          <Button
            variant="ghost"
            className="cursor-pointer text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={() => window.location.reload()}
          >
            <RefreshCw className="mr-2 w-4 h-4" />
            刷新
          </Button>
        </div>

        {/* 底部信息 */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-xs text-gray-400 dark:text-gray-500">错误代码: 404 | 如需帮助，请联系技术支持</p>
        </div>
      </div>
    </div>
  )
}
