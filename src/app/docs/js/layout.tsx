import SidebarMenuList from '@/components/SidebarMenuList';
import { Input } from '@/components/ui/input';
import { Sidebar, SidebarHeader, SidebarProvider, SidebarRail } from '@/components/ui/sidebar';
import type { ReactNode } from 'react';
import { Package, Search } from 'lucide-react';

type LayoutProps = {
  children: ReactNode;
};

const FileMap = {
  "array": "数组方法",
  "bind-this": "this绑定",
  "bom": "浏览器对象模型",
  "copy": "深拷贝与浅拷贝",
  "create-object": "创建对象的方法",
  "digital-accuracy": "数字精度",
  "dom": "文档对象模型",
  "event-loop": "JS 事件循环",
  "local-storage": "数组方法",
  "object-vs-map": "对象与 Map 的区别",
  "object": "对象方法",
  "prototype": "原型与继承",
  "set-vs-map": "Set 与 Map 的区别",
  "web-worker": "Web 后台线程",
}

function Layout({ children }: LayoutProps) {
    const menuData = [
      {
        title: "Javascript",
        items: Object.keys(FileMap).map(key => {
          return {
            title: FileMap[key] ?? key,
            key: key,
            url: `/docs/js/${key}`,
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