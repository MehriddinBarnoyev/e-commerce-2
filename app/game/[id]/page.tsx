import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import axios from 'axios'

interface Game {
  id: number;
  title: string;
  thumbnail: string;
  description: string;
  genre: string;
  platform: string;
  publisher: string;
  developer: string;
  release_date: string;
}

async function getGame(id: string): Promise<Game> {
  try {
    const response = await axios.get(`http://localhost:3000/api/games/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching game:', error);
    throw new Error('Failed to fetch game');
  }
}

export default async function GamePage({ params }: { params: { id: string } }) {
  const game = await getGame(params.id);

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="bg-gray-800 text-gray-100">
        <CardHeader>
          <CardTitle className="text-3xl">{game.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <img src={game.thumbnail} alt={game.title} className="w-full h-64 object-cover mb-4" />
          <p className="mb-4">{game.description}</p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold">Genre</h3>
              <p>{game.genre}</p>
            </div>
            <div>
              <h3 className="font-semibold">Platform</h3>
              <p>{game.platform}</p>
            </div>
            <div>
              <h3 className="font-semibold">Publisher</h3>
              <p>{game.publisher}</p>
            </div>
            <div>
              <h3 className="font-semibold">Developer</h3>
              <p>{game.developer}</p>
            </div>
            <div>
              <h3 className="font-semibold">Release Date</h3>
              <p>{game.release_date}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Play Now</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

