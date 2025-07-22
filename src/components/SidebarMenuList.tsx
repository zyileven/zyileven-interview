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
import { ElementType, FC } from "react";
import { AlignCenter, Spool, Anchor, Cable, Calculator, Container, EyeOff, Factory, Layers, Lock, RefreshCw, Ruler, ShieldAlert, Zap, } from 'lucide-react';
import Link from "next/link";

type MenuDataType = {
  title: string;
  items: {
    title: string;
    url: string;
    icon: string;
  }[]
}[]

const iconMap: Record<string, ElementType> = {
  Factory,
  Zap,
  Calculator,
  Layers,
  RefreshCw,
  Anchor,
  Lock,
  ShieldAlert,
  Cable,
  Ruler,
  EyeOff,
  Container,
  AlignCenter,
  Spool
};


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
              const IconComponent = iconMap[item.icon];
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