'use client'

import React, { createContext, useState, useContext, useEffect, useCallback } from 'react'

interface CartItem {
  id: number
  title: string
  price: number
  quantity: number
  thumbnail: string
}

interface CartContextType {
  cartItems: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  clearCart: () => void
  getCartCount: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [, setCartUpdateTrigger] = useState(0)

  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      setCartItems(JSON.parse(savedCart))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems))
  }, [cartItems])

  const addToCart = useCallback((item: CartItem) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(i => i.id === item.id)
      if (existingItem) {
        return prevItems.map(i => 
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      }
      return [...prevItems, { ...item, quantity: 1 }]
    })
    setCartUpdateTrigger(prev => prev + 1) // Force re-render
  }, [])

  const removeFromCart = useCallback((id: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id))
    setCartUpdateTrigger(prev => prev + 1) // Force re-render
  }, [])

  const updateQuantity = useCallback((id: number, quantity: number) => {
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, quantity: Math.max(0, quantity) } : item
      )
    )
    setCartUpdateTrigger(prev => prev + 1) // Force re-render
  }, [])

  const clearCart = useCallback(() => {
    setCartItems([])
    setCartUpdateTrigger(prev => prev + 1) // Force re-render
  }, [])

  const getCartCount = useCallback(() => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0)
  }, [cartItems])

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, getCartCount }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

