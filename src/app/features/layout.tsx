import SidebarMenuList from '@/components/SidebarMenuList';
import { Input } from '@/components/ui/input';
import { Sidebar, SidebarHeader, SidebarProvider, SidebarRail } from '@/components/ui/sidebar';
import type { ReactNode } from 'react';
import { Package, Search } from 'lucide-react';

type LayoutProps = {
  children: ReactNode;
};

const menuData = [
  {
    title: "JavaScript 功能实现",
    items: [
      {
        title: "防抖",
        url: "/features/debounce",
        key: "Timer",
      },
      {
        title: "节流",
        url: "/features/throttle",
        key: "Gauge",
      },
      {
        title: "自定义上传按钮",
        url: "/features/upload-button",
        key: "Bandage",
      },
      {
        title: "轮播",
        url: "/features/carousel",
        key: "Carousel",
      },
    ],
  },
  {
    title: "CSS 功能实现",
    items: [
      {
        title: "居中",
        url: "/features/align-center",
        key: "AlignCenter",
      },
      {
        title: "镜像翻转",
        url: "/features/flip",
        key: "flip",
      },
      {
        title: "响应式图片",
        url: "/features/response-image",
        key: "response-image",
      },
    ],
  },
  {
    title: "其他",
    items: [
      {
        title: " 2048",
        url: "/features/other/2048",
        key: "2048fun",
      },
    ],
  },
]

function Layout({ children }: LayoutProps) {

  return (

    <SidebarProvider>
      <section className="w-full flex bg-background">
        <Sidebar className="static top-0 border-r">
          <SidebarHeader className="border-b px-6 py-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Package className="h-4 w-4" />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold">Playground</span>
                <span className="text-xs text-muted-foreground"></span>
              </div>
            </div>

            {/* 搜索框 */}
            <div className="relative mt-4">
              <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="搜索功能..." className="pl-8" />
            </div>
          </SidebarHeader>

          <SidebarMenuList menuData={menuData} />

          <SidebarRail />
        </Sidebar>
        <section className='p-6 h-[100svh] overflow-scroll flex-1'>
          {children}
        </section>
      </section>
    </SidebarProvider>



  );
}

export default Layout;