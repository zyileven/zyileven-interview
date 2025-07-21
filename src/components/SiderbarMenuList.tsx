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
import { AlignCenter, Anchor, BarChart3, Cable, Calculator, Calendar, Container, CreditCard, EyeOff, Factory, FileText, Home, Layers, Lock, Mail, Package, RefreshCw, Ruler, Settings, ShieldAlert, Zap } from 'lucide-react';


// 菜单数据
const menuData = {
  navMain: [
    {
      title: "Javascript",
      items: [
        {
          title: "创建对象的方式",
          url: "/docs/js/object/create-object",
          icon: Factory,
        },
        {
          title: "object 与 map 的区别",
          url: "/docs/js/object/object-compare-map",
          icon: Zap,
        },
        {
          title: "数字精度问题",
          url: "/docs/js/number/digital-accuracy",
          icon: Calculator,
        },
        {
          title: "原型与继承",
          url: "/docs/js/prototype",
          icon: Layers,
        },
        {
          title: "事件循环",
          url: "/docs/js/js-event-loop",
          icon: RefreshCw,
        },
        {
          title: "this绑定",
          url: "/docs/js/call-apply-bind",
          icon: Anchor,
        },
        {
          title: "单例模式",
          url: "/docs/js/design-pattern/singleton",
          icon: Lock,
        },
      ],
    },
    {
      title: "CSS",
      items: [
        {
          title: "居中",
          url: "/docs/css/align-center",
          icon: AlignCenter,
        },
        {
          title: "BFC 原理",
          url: "/docs/css/bfc",
          icon: Container,
        },
        {
          title: "尺寸单位",
          url: "/docs/css/unit",
          icon: Ruler,
        },
        {
          title: "元素隐藏方式",
          url: "/docs/css/visibility",
          icon: EyeOff,
        },
      ],
    },
    {
      title: "前端工程化",
      items: [
        {
          title: "Webpack 基础",
          url: "/docs/engineer/webpack",
          icon: Cable,
        },
        {
          title: "跨域问题",
          url: "/docs/engineer/cors",
          icon: ShieldAlert,
        },
      ],
    },
  ],
}


const SidebarMenuList = ({ }) => {

  const path = usePathname();

  console.log("path:zzz", path);


  return <SidebarContent className="px-2">
    {menuData.navMain.map((group) => (
      <SidebarGroup key={group.title}>
        <SidebarGroupLabel className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          {group.title}
        </SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {group.items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild isActive={path == item.url} className="w-full">
                  <a href={item.url} className="flex items-center gap-3 px-4 py-2">
                    <item.icon className="h-4 w-4" />
                    <span className="flex-1">{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    ))}
  </SidebarContent>
}

SidebarMenuList.displayName = "SidebarMenuList";

export default SidebarMenuList;