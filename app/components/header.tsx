"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ShoppingCart, User, Search, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "../contexts/AuthContext";

export function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleUserClick = () => {
    if (user) {
      if (user.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/profile");
      }
    } else {
      router.push("/login");
    }
  };

  const logOut = () => {};

  return (
    <header className="border-b border-gray-800 bg-black">
      <div className="container mx-auto flex items-center justify-between py-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-2xl font-bold text-white">
          Game Market
        </Link>
        <form className="flex-1 mx-4 max-w-md hidden sm:flex">
          <Input
            type="text"
            placeholder="Поиск игр..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-800 text-white border-gray-700"
          />
          <Button type="submit" variant="secondary" className="ml-2">
            <Search className="h-5 w-5" />
          </Button>
        </form>
        <nav className="flex items-center space-x-4">
          <Link
            href="/search"
            className="text-gray-300 hover:text-white sm:hidden"
          >
            <Search className="h-5 w-5" />
          </Link>
          <Link href="/cart">
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-300 hover:text-white"
            >
              <ShoppingCart className="h-5 w-5" />
            </Button>
          </Link>
          <Link href={"/chats"}>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-300 hover:text-white "
            >
              <MessageSquare className="h-5 w-5" />
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-300 hover:text-white"
            onClick={handleUserClick}
          >
            <User className="h-5 w-5" />
          </Button>
          {user && <Button variant="ghost">Logout</Button>}
        </nav>
      </div>
    </header>
  );
}
