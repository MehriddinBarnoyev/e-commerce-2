import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AdminLayout } from "../components/layout/admin-layout"

export default function AdminAds() {
  return (
    <AdminLayout>
      <h1 className="mb-6 text-3xl font-bold text-foreground text-white">Реклама</h1>
      <div className="grid gap-6 bg-dark md:grid-cols-2">
        <Card className="bg-zinc-800 border-zinc-700">
          <CardHeader>
            <CardTitle className="text-white">Активные кампании</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-zinc-300">Список активных рекламных кампаний</p>
            <Button className="mt-4">Создать кампанию</Button>
          </CardContent>
        </Card>
        <Card className="bg-zinc-800 border-zinc-700">
          <CardHeader>
            <CardTitle className="text-white">Статистика</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-zinc-300">Статистика эффективности рекламы</p>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}

