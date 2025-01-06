'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2, ChevronLeft, ChevronRight } from 'lucide-react'

interface Game {
  id: number
  title: string
  thumbnail: string
  description: string
  game_url: string
  genre: string
  platform: string
  publisher: string
  developer: string
  release_date: string
  screenshots: { id: number, image: string }[]
}

export default function GameDetailPage() {
  const [game, setGame] = useState<Game | null>(null)
  const [relatedGames, setRelatedGames] = useState<Game[]>([])
  const [loading, setLoading] = useState(true)
  const [currentScreenshot, setCurrentScreenshot] = useState(0)
  const { id } = useParams()
  const router = useRouter()

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const response = await axios.get(`/api/games/${id}`)
        setGame(response.data)
        
        const allGamesResponse = await axios.get('/api/games')
        const relatedGames = allGamesResponse.data
          .filter((g: Game) => g.genre === response.data.genre && g.id !== response.data.id)
          .slice(0, 8)
        setRelatedGames(relatedGames)
      } catch (error) {
        console.error('Error fetching game details:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchGameDetails()
  }, [id])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    )
  }

  if (!game) {
    return <div className="text-center text-3xl mt-12 text-gray-400">Game not found</div>
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="relative h-[50vh] overflow-hidden">
        <Image 
          src={game.screenshots[0]?.image || game.thumbnail} 
          alt={game.title} 
          layout="fill" 
          objectFit="cover" 
          className="brightness-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
        <div className="absolute bottom-0 left-0 p-8">
          <h1 className="text-5xl font-bold mb-4 text-shadow">{game.title}</h1>
          <p className="text-xl text-gray-300">{game.genre}</p>
        </div>
      </div>

      {/* Game Details */}
      <div className="container mx-auto px-4 py-12">
        <Button onClick={() => router.back()} className="mb-8">
          <ChevronLeft className="mr-2 h-4 w-4" /> Back to Games
        </Button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-4">About the Game</h2>
            <p className="text-gray-300 leading-relaxed">{game.description}</p>
          </div>
          <Card className="bg-black">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4">Game Info</h3>
              <div className="space-y-2">
                <p><strong>Developer:</strong> {game.developer}</p>
                <p><strong>Publisher:</strong> {game.publisher}</p>
                <p><strong>Platform:</strong> {game.platform}</p>
                <p><strong>Release Date:</strong> {game.release_date}</p>
              </div>
              <Button className="w-full mt-6" asChild>
                <a href={game.game_url} target="_blank" rel="noopener noreferrer">Play Now</a>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Screenshot Gallery */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Screenshots</h2>
          <div className="relative">
            <div className="overflow-hidden rounded-lg">
              <motion.div
                animate={{ x: `-${currentScreenshot * 100}%` }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="flex"
              >
                {game.screenshots.map((screenshot, index) => (
                  <div key={screenshot.id} className="w-full flex-shrink-0">
                    <Image 
                      src={screenshot.image} 
                      alt={`Screenshot ${index + 1}`} 
                      width={1920} 
                      height={1080} 
                      className="w-full h-auto"
                    />
                  </div>
                ))}
              </motion.div>
            </div>
            <Button 
              variant="outline" 
              size="icon"
              className="absolute top-1/2 left-4 transform -translate-y-1/2"
              onClick={() => setCurrentScreenshot(prev => Math.max(0, prev - 1))}
              disabled={currentScreenshot === 0}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="icon"
              className="absolute top-1/2 right-4 transform -translate-y-1/2"
              onClick={() => setCurrentScreenshot(prev => Math.min(game.screenshots.length - 1, prev + 1))}
              disabled={currentScreenshot === game.screenshots.length - 1}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Related Games */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Related Games</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {relatedGames.map((relatedGame) => (
              <motion.div
                key={relatedGame.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Card 
                  className="bg-black cursor-pointer overflow-hidden" 
                  onClick={() => router.push(`/game/${relatedGame.id}`)}
                >
                  <div className="relative h-48">
                    <Image 
                      src={relatedGame.thumbnail} 
                      alt={relatedGame.title} 
                      layout="fill" 
                      objectFit="cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold mb-2 line-clamp-1">{relatedGame.title}</h3>
                    <p className="text-sm text-gray-400 line-clamp-2">{relatedGame.short_description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

