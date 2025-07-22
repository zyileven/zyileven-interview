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
    title: "Javascript",
    items: [
      {
        title: "创建对象的方式",
        url: "/docs/js/object/create-object",
        icon: "Factory",
      },
      {
        title: "object 与 map 的区别",
        url: "/docs/js/object/object-compare-map",
        icon: "Zap",
      },
      {
        title: "数字精度问题",
        url: "/docs/js/number/digital-accuracy",
        icon: "Calculator",
      },
      {
        title: "原型与继承",
        url: "/docs/js/prototype",
        icon: "Layers",
      },
      {
        title: "事件循环",
        url: "/docs/js/event-loop",
        icon: "RefreshCw",
      },
      {
        title: "this绑定",
        url: "/docs/js/call-apply-bind",
        icon: "Anchor",
      },
      {
        title: "Web Workers",
        url: "/docs/js/web-workers",
        icon: "Spool",
      },
    ],
  },
  {
    title: "设计模式",
    items: [
      {
        title: "单例模式",
        url: "/docs/js/design-pattern/singleton",
        icon: "Lock",
      },
    ]
  }
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