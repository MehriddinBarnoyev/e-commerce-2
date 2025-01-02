import { AdminLayout } from "../components/layout/admin-layout";

export default function AdminCategories() {
  return (
    <AdminLayout>
      <h1 className="mb-6 text-3xl font-bold">Категории</h1>
      <div className="rounded-lg  p-6">
        <div className="mb-4 flex justify-between">
          <input type="text" placeholder="Поиск категорий" className="rounded  px-4 py-2" />
          <button className="rounded bg-blue-500 px-4 py-2 hover:bg-blue-600">Добавить категорию</button>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border">
              <th className="p-2 text-left">ID</th>
              <th className="p-2 text-left">Название</th>
              <th className="p-2 text-left">Количество товаров</th>
              <th className="p-2 text-left">Действия</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2">1</td>
              <td className="p-2">Игры</td>
              <td className="p-2">50</td>
              <td className="p-2">
                <button className="mr-2 text-blue-400 hover:text-blue-300">Редактировать</button>
                <button className="text-red-400 hover:text-red-300">Удалить</button>
              </td>
            </tr>
            {/* Добавьте больше строк по необходимости */}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  )
}

