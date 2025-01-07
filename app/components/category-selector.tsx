'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"

interface CategorySelectorProps {
  categories: string[]
  onSelectCategory: (category: string | null) => void
}

export function CategorySelector({ categories, onSelectCategory }: CategorySelectorProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const handleCategoryClick = (category: string) => {
    if (selectedCategory === category) {
      setSelectedCategory(null)
      onSelectCategory(null)
    } else {
      setSelectedCategory(category)
      onSelectCategory(category)
    }
  }

  return (
    <div className="flex flex-wrap gap-2 mb-6 rounded-lg">
      {categories.map((category) => (
        <Button
          key={category}
          variant={selectedCategory === category ? "default" : "outline"}
          onClick={() => handleCategoryClick(category)}
        >
          {category}
        </Button>
      ))}
    </div>
  )
}

