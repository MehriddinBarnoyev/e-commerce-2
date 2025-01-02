import Link from 'next/link'
import { Gamepad2, AppWindow } from 'lucide-react'

export function GameCategories() {
  return (
    <div className="mb-8">
      <div className="flex gap-4 border-b border-gray-800 pb-4">
        <Link
          href="/games"
          className="flex items-center gap-2 text-gray-200 hover:text-white"
        >
          <Gamepad2 className="w-5 h-5" />
          <span>Игры</span>
        </Link>
        <Link
          href="/apps"
          className="flex items-center gap-2 text-gray-200 hover:text-white"
        >
          <AppWindow className="w-5 h-5" />
          <span>Приложения</span>
        </Link>
      </div>
    </div>
  )
}

