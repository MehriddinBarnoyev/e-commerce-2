'use client'

import { useState } from 'react'
import { AdminLayout } from '../components/layout/admin-layout'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { ChevronDown, Search } from 'lucide-react'

const initialUsers = [
  { id: 1, name: 'Иван Иванов', email: 'ivan@example.com', role: 'Пользователь', status: 'Активный' },
  { id: 2, name: 'Анна Петрова', email: 'anna@example.com', role: 'Админ', status: 'Активный' },
  { id: 3, name: 'Сергей Сидоров', email: 'sergey@example.com', role: 'Модератор', status: 'Заблокирован' },
  { id: 4, name: 'Мария Кузнецова', email: 'maria@example.com', role: 'Пользователь', status: 'Активный' },
  { id: 5, name: 'Алексей Смирнов', email: 'alexey@example.com', role: 'Пользователь', status: 'Неактивный' },
]

export default function UsersPage() {
  const [users, setUsers] = useState(initialUsers)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.status.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleStatusChange = (userId: number, newStatus: string) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, status: newStatus } : user
    ))
  }

  return (
    <AdminLayout>
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Пользователи</h1>
        <div className="flex items-center space-x-2">
          <Search className="w-5 h-5 text-zinc-500" />
          <Input
            type="text"
            placeholder="Поиск пользователей..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm bg-zinc-800/50 border-zinc-700 text-zinc-100 placeholder-zinc-400"
          />
        </div>
        <div className="rounded-md border border-zinc-700 bg-zinc-800/50 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-zinc-800/50 border-zinc-700">
                <TableHead className="text-zinc-300">Имя</TableHead>
                <TableHead className="text-zinc-300">Email</TableHead>
                <TableHead className="text-zinc-300">Роль</TableHead>
                <TableHead className="text-zinc-300">Статус</TableHead>
                <TableHead className="text-zinc-300">Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id} className="hover:bg-zinc-800/50 border-zinc-700">
                  <TableCell className="font-medium text-zinc-100">{user.name}</TableCell>
                  <TableCell className="text-zinc-300">{user.email}</TableCell>
                  <TableCell className="text-zinc-300">{user.role}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={user.status === 'Активный' ? 'success' : user.status === 'Неактивный' ? 'warning' : 'destructive'}
                    >
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="border-zinc-700 bg-zinc-800 hover:bg-zinc-700 hover:text-white text-zinc-300">
                          Изменить статус <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-zinc-800 border-zinc-700">
                        <DropdownMenuItem onClick={() => handleStatusChange(user.id, 'Активный')} className="text-emerald-400 focus:text-emerald-400 focus:bg-zinc-700">
                          Активный
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleStatusChange(user.id, 'Неактивный')} className="text-yellow-400 focus:text-yellow-400 focus:bg-zinc-700">
                          Неактивный
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleStatusChange(user.id, 'Заблокирован')} className="text-red-400 focus:text-red-400 focus:bg-zinc-700">
                          Заблокирован
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </AdminLayout>
  )
}

