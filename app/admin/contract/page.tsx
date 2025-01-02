import { AdminLayout } from '../components/layout/admin-layout'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function KontrokPage() {
  return (
    <AdminLayout>
      <h1 className="mb-6 text-3xl font-bold text-white">КонтрОК</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-zinc-800 border-zinc-700">
          <CardHeader>
            <CardTitle className="text-white">Активные сессии</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-zinc-300">Здесь будет отображаться информация об активных сессиях</p>
          </CardContent>
        </Card>
        <Card className="bg-zinc-800 border-zinc-700">
          <CardHeader>
            <CardTitle className="text-white">Статистика использования</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-zinc-300">Здесь будет отображаться статистика использования КонтрОК</p>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}

