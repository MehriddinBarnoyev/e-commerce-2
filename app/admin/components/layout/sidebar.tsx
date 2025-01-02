import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { LayoutDashboard, ShoppingCart, FolderTree, Package, Users, MessageSquare, BarChart, Megaphone, Settings } from 'lucide-react'

const sidebarItems = [
  { name: 'Панель управления', href: '/admin', icon: LayoutDashboard },
  { name: 'Заказы', href: '/admin/orders', icon: ShoppingCart },
  { name: 'Категории', href: '/admin/categories', icon: FolderTree },
  { name: 'Товары', href: '/admin/products', icon: Package },
  { name: 'Пользователи', href: '/admin/users', icon: Users },
  { name: 'КонтрОК', href: '/admin/kontrok', icon: MessageSquare },
  { name: 'Аналитика', href: '/admin/analitics', icon: BarChart },
  { name: 'Реклама', href: '/admin/ads', icon: Megaphone },
  { name: 'Настройки', href: '/admin/settings', icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 border-r border-zinc-800 bg-zinc-950 overflow-y-auto">
      <div className="flex h-14 items-center border-b border-zinc-800 px-4">
        <Link href="/admin" className="flex items-center gap-2 font-semibold">
          <Package className="h-6 w-6" />
          <span>Admin Panel</span>
        </Link>
      </div>
      <ScrollArea className="flex-1 px-2 py-4">
        <nav className="space-y-1">
          {sidebarItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start",
                  pathname === item.href && "bg-zinc-800 text-zinc-50"
                )}
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.name}
              </Button>
            </Link>
          ))}
        </nav>
      </ScrollArea>
    </aside>
  )
}

