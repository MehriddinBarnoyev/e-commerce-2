import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import axios from 'axios'

interface Game {
  id: number;
  title: string;
  thumbnail: string;
  short_description: string;
  genre: string;
}

async function getGames(): Promise<Game[]> {
  try {
    const response = await axios.get(' https://www.freetogame.com/api/games');
    return response.data;
  } catch (error) {
    console.error('Error fetching games:', error);
    return [];
  }
}

export default async function CategoriesPage() {
  const games = await getGames();

  const categories = ['Shooter', 'MMORPG', 'Strategy'];

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold mb-4">Categories</h1>
      {categories.map((category) => (
        <section key={category}>
          <h2 className="text-2xl font-semibold mb-4">{category}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {games
              .filter((game) => game.genre.toLowerCase() === category.toLowerCase())
              .slice(0, 3)
              .map((game) => (
                <Card key={game.id} className="bg-black text-gray-100">
                  <CardHeader>
                    <CardTitle>{game.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <img src={game.thumbnail} alt={game.title} className="w-full h-48 object-cover" />
                    <p className="mt-2">{game.short_description}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <span className="text-lg font-semibold">{game.genre}</span>
                    <Button asChild>
                      <Link href={`/game/${game.id}`}>View Details</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </section>
      ))}
    </div>
  )
}

