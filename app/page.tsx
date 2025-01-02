import axios from 'axios'
import { PromotionalCards } from './components/promotional-cards'
import { GameCard } from './components/game-card'
import { GameCategories } from './components/game-categories'

interface Game {
  id: number
  title: string
  thumbnail: string
  genre: string
  platform: string
  game_url: string
  short_description: string
}

async function getGames() {
  try {
    const response = await axios.get('https://www.freetogame.com/api/games')
    return response.data
  } catch (error) {
    console.error('Error fetching games:', error)
    return []
  }
}

// Helper function to generate random price and discount
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

export default async function Home() {
  const games = await getGames()

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      <PromotionalCards />
      <GameCategories />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {games.slice(0, 8).map((game: Game) => {
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
    </div>
  )
}

