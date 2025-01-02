'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import axios from 'axios'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { GameCard } from '../components/game-card'
import { Loader2 } from 'lucide-react'

interface Game {
  id: number
  title: string
  thumbnail: string
  genre: string
}

export default function SearchPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get('q') || ''
  const [query, setQuery] = useState(initialQuery)
  const [games, setGames] = useState<Game[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchGames()
  }, [])

  const fetchGames = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await axios.get('https://www.freetogame.com/api/games')
      setGames(response.data)
    } catch (error) {
      console.error('Error fetching games:', error)
      setError('Failed to fetch games. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    router.push(`/search?q=${encodeURIComponent(query)}`, { scroll: false })
  }

  const filteredGames = query
    ? games.filter(game => game.title.toLowerCase().includes(query.toLowerCase()))
    : games

  // Helper function to generate random price and discount
  const generatePrice = () => {
    const basePrice = Math.floor(Math.random() * 2000) + 99
    const hasDiscount = Math.random() > 0.5
    const discountedPrice = hasDiscount 
      ? Math.floor(basePrice * (0.6 + Math.random() * 0.3))
      : basePrice
    return {
      price: discountedPrice,
      originalPrice: hasDiscount ? basePrice : undefined
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-6">Поиск игр</h1>
      
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex gap-2">
          <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Введите название игры..."
            className="bg-gray-800 text-white border-gray-700"
          />
          <Button type="submit" disabled={loading}>
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Поиск'}
          </Button>
        </div>
      </form>

      {error && (
        <div className="text-red-500 mb-4">{error}</div>
      )}

      {loading ? (
        <div className="flex justify-center items-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredGames.map((game) => {
            const { price, originalPrice } = generatePrice()
            const rating = 3 + Math.random() * 2 // Random rating between 3 and 5
            
            return (
              <GameCard
                key={game.id}
                title={game.title}
                thumbnail={game.thumbnail}
                price={price}
                originalPrice={originalPrice}
                category={game.genre}
                rating={rating}
              />
            )
          })}
        </div>
      )}

      {filteredGames.length === 0 && !loading && (
        <div className="text-center text-gray-400">
          Нет результатов. Попробуйте другой запрос.
        </div>
      )}
    </div>
  )
}
