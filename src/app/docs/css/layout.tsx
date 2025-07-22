import SidebarMenuList from '@/components/SidebarMenuList';
import { Input } from '@/components/ui/input';
import { Sidebar, SidebarHeader, SidebarProvider, SidebarRail } from '@/components/ui/sidebar';
import { Package, Search } from 'lucide-react';
import type { ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode;
};

// 菜单数据
const menuData = [
  {
    title: "CSS",
    items: [
      {
        title: "居中",
        url: "/docs/css/align-center",
        icon: "AlignCenter",
      },
      {
        title: "BFC 原理",
        url: "/docs/css/bfc",
        icon: "Container",
      },
      {
        title: "尺寸单位",
        url: "/docs/css/unit",
        icon: "Ruler",
      },
      {
        title: "元素隐藏方式",
        url: "/docs/css/visibility",
        icon: "EyeOff",
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
                <span className="font-semibold">烂笔头</span>
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
        <div className='p-6 h-[100svh] overflow-scroll flex-1'>
          {children}
        </div>
      </section>
    </SidebarProvider>
  );
}

export default Layout;