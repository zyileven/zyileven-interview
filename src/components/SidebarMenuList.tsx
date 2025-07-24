"use client";

import { usePathname } from "next/navigation";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from "./ui/sidebar";
import { FC } from "react";
import * as LucideIcons from 'lucide-react';
import Link from "next/link";

type MenuDataType = {
  title: string;
  items: {
    title: string;
    url: string;
    icon: string;
  }[]
}[]


const SidebarMenuList: FC<{
  menuData: MenuDataType;
}> = ({ menuData }) => {

  const path = usePathname();

  return <SidebarContent className="px-2">
    {menuData.map((group) => {
      return <SidebarGroup key={group.title}>
        <SidebarGroupLabel className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          {group.title}
        </SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {group.items.map((item) => {
              const IconComponent = LucideIcons[item.icon];
              return <SidebarMenuItem key={item.title}>
                <SidebarMenuButton 
                  asChild 
                  isActive={path == item.url} 
                  className="w-full"
                >
                  <Link href={item.url} className="flex items-center gap-3 px-4 py-2">
                    {IconComponent && (
                      <IconComponent className="h-4 w-4" />
                    )}
                    <span className="flex-1">{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            })}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    })}
  </SidebarContent>
}

SidebarMenuList.displayName = "SidebarMenuList";

export default SidebarMenuList;