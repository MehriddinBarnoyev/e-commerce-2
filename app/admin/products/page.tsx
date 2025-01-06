import { AdminLayout } from "../components/layout/admin-layout";
import { Star } from "lucide-react";
import Image from "next/image";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import axios from "axios";

async function getGames() {
  try {
    const response = await axios.get("https://www.freetogame.com/api/games");
    return response.data;
  } catch (error) {
    console.error("Error fetching games:", error);
    return [];
  }
}

// Random price generator
const randomPrice = () => Math.floor(Math.random() * (1000 - 10 + 1)) + 10;
const randomReview = () => Math.floor(Math.random() * (1000 - 10 + 1)) + 10;

// Star Rating Component
function StarRating({ rating, size = 4 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-${size} w-${size} ${
            i < rating
              ? "fill-yellow-500 text-yellow-500"
              : "fill-zinc-800 text-zinc-800"
          }`}
        />
      ))}
    </div>
  );
}

export default async function ProductPage() {
  const games = await getGames();

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Товары</h1>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {games.slice(0, 30).map((game) => {
          const price = randomPrice(); // Generate random price
          const review = randomReview(); // Generate random review
          return (
            <div
              key={game.id}
              className="group relative overflow-hidden rounded-lg bg-zinc-900 cursor-pointer"
            >
              {/* Header with title and category */}
              <div className="absolute top-0 left-0 right-0 z-20 flex items-start p-3">
                {/* Seller avatar */}
                <Avatar>
                  <AvatarImage src={game.thumbnail} />
                </Avatar>
                <div>
                  <h3 className="text-sm font-medium text-white">
                    {game.title}
                  </h3>
                  <p className="text-xs text-zinc-400">{game.genre}</p>
                </div>
              </div>

              {/* Main image */}
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={game.thumbnail}
                  alt={game.title}
                  fill
                  className="object-cover"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              </div>

              {/* Game info overlay */}
              <div className="absolute bottom-0 left-0 right-0 z-20 p-3">
                {/* Price */}
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg font-bold text-white">
                    {price} ₽
                  </span>
                </div>

                {/* Description */}
                <p className="text-sm text-zinc-300 mb-1">
                  {game.short_description}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-1">
                  <StarRating rating={Math.floor(Math.random() * 5)} />
                  <span className="text-xs text-zinc-400">{review}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </AdminLayout>
  );
}
