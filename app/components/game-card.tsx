'use client'

import { useState } from 'react'
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useRouter } from 'next/navigation'
import { useCart } from '../contexts/CartContext'
import { Check } from 'lucide-react'

interface GameCardProps {
  id: number
  title: string
  thumbnail: string
  price: number
  originalPrice?: number
  category: string
  rating: number
}

export function GameCard({ id, title, thumbnail, price, originalPrice, category, rating }: GameCardProps) {
  const router = useRouter()
  const { addToCart } = useCart()
  const [isAdded, setIsAdded] = useState(false)
  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0

  const handleClick = () => {
    router.push(`/game/${id}`)
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation()
    addToCart({ id, title, price, quantity: 1, thumbnail })
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000) // Reset after 2 seconds
  }

  return (
    <Card className="bg-black border-gray-800 cursor-pointer" onClick={handleClick}>
      <CardContent className="p-0">
        <div className="relative">
          <Image
            src={thumbnail}
            alt={title}
            width={400}
            height={200}
            className="w-full h-48 object-cover rounded-t-lg"
          />
          {discount > 0 && (
            <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded text-sm">
              -{discount}%
            </div>
          )}
        </div>
        <div className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm text-gray-400">{category}</span>
          </div>
          <h3 className="font-medium text-white mb-2">{title}</h3>
          <div className="flex items-center gap-1">
            {"★".repeat(Math.round(rating))}
            <span className="text-gray-400 text-sm ml-1">{rating.toFixed(1)}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center p-4 pt-0">
        <div className="flex items-center gap-2">
          {originalPrice && (
            <span className="text-sm text-gray-500 line-through">{originalPrice}₽</span>
          )}
          <span className="text-lg font-bold text-white">{price}₽</span>
        </div>
        <Button 
          size="sm" 
          onClick={handleAddToCart}
          className={isAdded ? "bg-green-500 hover:bg-green-600" : ""}
        >
          {isAdded ? <Check className="h-4 w-4 mr-2" /> : null}
          {isAdded ? "Added" : "Add to Cart"}
        </Button>
      </CardFooter>
    </Card>
  )
}

