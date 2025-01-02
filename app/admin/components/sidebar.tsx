"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  LayoutDashboard,
  ShoppingCart,
  FolderTree,
  Package,
  Users,
  MessageSquare,
  BarChart,
  Megaphone,
  Settings,
} from "lucide-react";

const sidebarItems = [
  {
    href: "/",
    icon: <LayoutDashboard />,
    label: "Панель управления",
  },
  {
    href: "/admin/orders",
    icon: <ShoppingCart />,
    label: "Заказы",
    badge: 8,
  },
  { href: "/admin/categories", icon: <FolderTree />, label: "Категории" },
  { href: "/admin/products", icon: <Package />, label: "Товары" },
  { href: "/admin/users", icon: <Users />, label: "Пользователи" },
  { href: "/admin/contract", icon: <MessageSquare />, label: "КонтрОК" },
  { href: "/admin/analitcs", icon: <BarChart />, label: "Аналитика" },
  { href: "/admin/adds", icon: <Megaphone />, label: "Реклама" },
  { href: "/admin/settings", icon: <Settings />, label: "Настройки" },
];

export function Sidebar() {
  const pathname = usePathname();

  const nameuser = localStorage.getItem("user");
  const userObj = JSON.parse(nameuser || "{}");
  console.log(userObj);
  return (
    <aside className="w-64 border-r border-zinc-800 bg-dark overflow-y-auto">
      <div className="flex h-14 items-center border-b border-zinc-800 px-4">
        <Link href="/admin" className="flex items-center gap-2 font-semibold">
          <Package className="h-6 w-6" />
          <span>{userObj.firstName}</span>
        </Link>
      </div>
      <ScrollArea className="flex-1 px-2 py-4">
        <nav className="space-y-1">
          {sidebarItems.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start",
                    isActive
                      ? "bg-zinc-800 text-zinc-50 hover:bg-zinc-800 hover:text-zinc-50"
                      : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-50"
                  )}
                >
                  {item.icon}
                  {item.label}
                </Button>
              </Link>
            );
          })}
        </nav>
      </ScrollArea>
    </aside>
  );
}
