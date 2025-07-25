import SidebarMenuList from '@/components/SidebarMenuList';
import { Input } from '@/components/ui/input';
import { Sidebar, SidebarHeader, SidebarProvider, SidebarRail } from '@/components/ui/sidebar';
import type { ReactNode } from 'react';
import { Package, Search } from 'lucide-react';

type LayoutProps = {
  children: ReactNode;
};

const FileMap = {
  "command-pattern": "命令模式",
  "factory-pattern": "工厂模式",
  "middleware-pattern": "中间件模式",
  "mixin-pattern": "混合模式",
  "module-pattern": "模块模式",
  "observer-pattern": "观察者模式",
  "prototype-pattern": "原型模式",
  "singleton-pattern": "单例模式",
}

function Layout({ children }: LayoutProps) {
    const menuData = [
      {
        title: "设计模式",
        items: Object.keys(FileMap).map(key => {
          return {
            title: FileMap[key] ?? key,
            key: key,
            url: `/docs/design-pattern/${key}`,
          }
        })
      },
    ]

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
        <div className='h-[100svh] overflow-scroll flex-1'>
          {children}
        </div>
      </section>
    </SidebarProvider>
  );
}

export default Layout;