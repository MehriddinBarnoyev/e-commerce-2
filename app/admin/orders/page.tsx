import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { AdminLayout } from "../components/layout/admin-layout"

const orders = [
  { id: '001', user: 'Иван Иванов', amount: '1000 ₽', status: 'Выполнен' },
  { id: '002', user: 'Петр Петров', amount: '1500 ₽', status: 'В обработке' },
  { id: '003', user: 'Анна Сидорова', amount: '2000 ₽', status: 'Отправлен' },
  { id: '004', user: 'Мария Кузнецова', amount: '3000 ₽', status: 'Выполнен' },
  { id: '005', user: 'Алексей Смирнов', amount: '2500 ₽', status: 'В обработке' },
]

export default function OrdersPage() {
  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-6">Заказы</h1>
      <div className="bg-zinc-800/50 border border-zinc-700 rounded-lg">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-zinc-800/50">
              <TableHead className="text-zinc-400">ID</TableHead>
              <TableHead className="text-zinc-400">Пользователь</TableHead>
              <TableHead className="text-zinc-400">Сумма</TableHead>
              <TableHead className="text-zinc-400">Статус</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id} className="hover:bg-zinc-800/50">
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.user}</TableCell>
                <TableCell>{order.amount}</TableCell>
                <TableCell>
                  <Badge >
                    {order.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </AdminLayout>
  )
}

