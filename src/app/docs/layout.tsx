import SidebarMenuList from '@/components/SidebarMenuList';
import { Input } from '@/components/ui/input';
import { Sidebar, SidebarHeader, SidebarProvider, SidebarRail } from '@/components/ui/sidebar';

import type { ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode;
};




function Layout({ children }: LayoutProps) {

  // 获取当前 url


  return (
    <section>
      {children}
    </section>
  );
}

export default Layout;