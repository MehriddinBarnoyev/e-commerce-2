'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import { PromotionalCards } from './components/promotional-cards'
import { GameCard } from './components/game-card'
import { Loader2 } from 'lucide-react'
import { CategorySidebar } from './components/category-sidebar'

interface Game {
  id: number
  title: string
  thumbnail: string
  genre: string
  platform: string
  game_url: string
  short_description: string
}

function generatePrice() {
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

export default function Home() {
  const [games, setGames] = useState<Game[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get('/api/games')
        setGames(response.data)
        const uniqueCategories = Array.from(new Set(response.data.map((game: Game) => game.genre)))
        setCategories(uniqueCategories)
      } catch (error) {
        console.error('Error fetching games:', error)
        setError('Failed to load games. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchGames()
  }, [])

  const filteredGames = selectedCategory
    ? games.filter(game => game.genre === selectedCategory)
    : games

  if (loading) {
    return <div className="min-h-screen bg-black text-white p-4 md:p-8 flex justify-center items-center"><Loader2 className="h-8 w-8 animate-spin" /></div>
  }

  if (error) {
    return <div className="min-h-screen bg-black text-white p-4 md:p-8 flex justify-center items-center">{error}</div>
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="flex">
        <CategorySidebar
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {/* Main Content */}
        <div className="flex-1 p-4 md:p-8">
          <div className="md:hidden mb-4">
            <h2 className="text-2xl font-bold">{selectedCategory || 'All Games'}</h2>
          </div>
          
          <PromotionalCards />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredGames.map((game: Game) => {
              const { price, originalPrice } = generatePrice()
              const rating = 3 + Math.random() * 2 // Random rating between 3 and 5
              
              return (
                <GameCard
                  key={game.id}
                  id={game.id}
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
        </div>
      </div>
    </div>
  )
}
