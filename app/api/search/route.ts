import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: Request) {
  try {
    // URL'dan qidiruv parametrini oling
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q");

    // Agar qidiruv parametri bo'lmasa, xato qaytaring
    if (!query) {
      return NextResponse.json(
        { error: "Query parameter is required" },
        { status: 400 }
      );
    }

    // API'dan barcha o'yinlarni oling
    const response = await axios.get("https://www.freetogame.com/api/games");
    const games = response.data;

    // O'yinlarni filtrlang
    const filteredGames = games.filter((game: any) =>
      game.title.toLowerCase().includes(query.toLowerCase())
    );

    // Javobni qaytaring
    return NextResponse.json(filteredGames);
  } catch (error) {
    console.error("Error fetching games:", error);

    // Xatoni qaytarish
    return NextResponse.json(
      { error: "Failed to fetch games" },
      { status: 500 }
    );
  }
}
