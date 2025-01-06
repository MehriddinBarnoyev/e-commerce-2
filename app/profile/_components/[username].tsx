"use client"

import { useState, useEffect } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import axios from "axios";
import { Menu, Share2 } from "lucide-react";
import Link from "next/link";

// Function to get user data from server
async function getUserData() {
  try {
    const response = await axios.get(
      "https://676112646be7889dc35fa055.mockapi.io/users"
    );
    console.log(response.data);
    
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default function ProfilePage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const data = await getUserData();
      if (data && data.length > 0) {
        setUser(data[0]); // Assuming the first user is required
      }
    }
    fetchData();
  }, []);


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

  const randomBalance = generatePrice();
  console.log(randomBalance);
  
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <Menu className="h-6 w-6" />
          <h1 className="text-lg font-medium">
            {user ? user.username : "Loading..."}
          </h1>
        </div>
        <Share2 className="h-6 w-6" />
      </div>

      {/* Balance Card */}
      <Card
        className="mx-4 mt-4 bg-gray-800/50 border-gray-700"
        style={{ width: "40vh" }}
      >
        <div className="p-4 flex items-center gap-2 text-white">
          <div className="bg-blue-500 p-1.5 rounded">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 12H4"
              />
            </svg>
          </div>
          <span className="text-lg">{user ? `${randomBalance.price} ₽` : "0 ₽"}</span>
          <svg
            className="w-4 h-4 text-gray-400 ml-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </Card>

      {/* Profile Info */}
      <div className="p-4 flex items-center gap-4">
        <Avatar className="h-16 w-16 bg-green-600">
          <AvatarFallback>
            {user ? user.username.charAt(0) : "M"}
          </AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-xl font-medium">{user ? user.username : "Username"}</h2>
          <div className="flex items-center gap-1 text-gray-400 text-sm">
            {"★★★★★".split("").map((star, i) => (
              <span key={i} className="opacity-20">
                {star}
              </span>
            ))}
            <span className="ml-1">нет отзывов</span>
          </div>
          <p className="text-sm text-gray-400">
            на Playerok с ноября 2024
          </p>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="purchases" className="w-full">
        <TabsList className="w-full justify-start gap-2 bg-transparent p-4">
          <TabsTrigger
            value="items"
            className="bg-gray-800 data-[state=active]:bg-gray-700"
          >
            Мои товары 0
          </TabsTrigger>
          <TabsTrigger
            value="purchases"
            className="bg-blue-600 text-white data-[state=active]:bg-blue-700"
          >
            Покупки 0
          </TabsTrigger>
          <TabsTrigger
            value="sales"
            className="bg-gray-800 data-[state=active]:bg-gray-700"
          >
            Продажи 0
          </TabsTrigger>
        </TabsList>

        {/* Empty State */}
        <div className="flex flex-col items-center justify-center p-8 text-center">
          <span className="text-6xl mb-4">😕</span>
          <h3 className="text-xl font-medium mb-2">Нет покупок</h3>
          <p className="text-gray-400 mb-6">Давайте что-нибудь выберем</p>
          <Link href={"/"}>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full max-w-md">
              Выбрать игру/приложение
            </Button>
          </Link>
        </div>
      </Tabs>
    </div>
  );
}
