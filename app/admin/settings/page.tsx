import { AdminLayout } from '../components/layout/admin-layout'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function SettingsPage() {
  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-6">Настройки</h1>
      <Card className="bg-zinc-800/50 border-zinc-700">
        <CardHeader className='text-white'>
          <CardTitle>Общие настройки</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4 text-white">
            <div className="space-y-2">
              <Label htmlFor="site-name">Название сайта</Label>
              <Input id="site-name" placeholder="Введите название сайта" className="bg-zinc-900 border-zinc-700" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="site-description">Описание сайта</Label>
              <Input id="site-description" placeholder="Введите описание сайта" className="bg-zinc-900 border-zinc-700" />
            </div>
            <Button type="submit">Сохранить изменения</Button>
          </form>
        </CardContent>
      </Card>
    </AdminLayout>
  )
}

