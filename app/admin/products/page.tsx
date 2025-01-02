import { AdminLayout } from "../components/layout/admin-layout";
import { Star, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const products = [
  {
    id: 1,
    title: "Minecraft",
    subtitle: "Premium Account",
    category: "Games",
    image:
      "https://target.scene7.com/is/image/Target/GUEST_b98e9dc0-6f29-41e3-ae20-13182d3007f0?wid=668&qlt=80&fmt=png",
    price: 450,
    oldPrice: 600,
    discount: "-25%",
    description: "🎮 Full access to a premium Minecraft account.",
    rating: 4.9,
    reviews: 3200,
    watermark: "Minecraft Premium",
    status: "Available",
    seller: {
      name: "BlockCraft",
      avatar: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
      verified: true,
    },
  },
  {
    id: 2,
    title: "FIFA 24",
    subtitle: "Ultimate Team Coins",
    category: "Digital Currency",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5auJ8EsHfpzZ4xl_46-P3pWdn4uJEDVF4CA&s",
    price: 500,
    oldPrice: 750,
    discount: "-33%",
    description: "⚽ 100,000 FUT coins for your FIFA account.",
    rating: 4.7,
    reviews: 1800,
    watermark: "FIFA 24 Coins",
    status: "Available",
    seller: {
      name: "CoinMaster",
      avatar: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
      verified: true,
    },
  },
  {
    id: 3,
    title: "Call of Duty",
    subtitle: "Weapon Skins Pack",
    category: "Accessories",
    image:
      "https://wallpapers.com/images/featured/call-of-duty-pictures-7lrqnchbx478ucgg.jpg",
    price: 299,
    oldPrice: 399,
    discount: "-25%",
    description: "🔥 Unlock exclusive weapon skins.",
    rating: 5.0,
    reviews: 120,
    watermark: "COD Skins",
    status: "Available",
    seller: {
      name: "SkinStore",
      avatar: "https://cdn-icons-png.flaticon.com/512/236/236831.png",
      verified: false,
    },
  },
  {
    id: 4,
    title: "Valorant",
    subtitle: "Battle Pass",
    category: "Subscriptions",
    image: "https://files.oaiusercontent.com/file-KbnNHKGqumSQLmTxpamXSf?se=2024-12-02T03%3A42%3A03Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3Ddf0c062f-406e-4d26-85ad-e438c3234c52.webp&sig=z0x1tSMcKM9qRi30U7UuZWezVW922jjM8bvPJuQwubM%3D",
    price: 120,
    oldPrice: 150,
    discount: "-20%",
    description: "🎯 Unlock premium Battle Pass tiers.",
    rating: 4.8,
    reviews: 950,
    watermark: "Valorant Pass",
    status: "Available",
    seller: {
      name: "Valor Sellers",
      avatar: "https://cdn-icons-png.flaticon.com/512/147/147144.png",
      verified: true,
    },
  },
];

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

export default function ProductsPage() {
  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Товары</h1>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="group relative overflow-hidden rounded-lg bg-zinc-900 cursor-pointer"
          >
            {/* Header with title and category */}
            <div className="absolute top-0 left-0 right-0 z-20 flex items-start p-3">
              {/* Seller avatar */}
              <Avatar>
                <AvatarImage src={product.seller.avatar} />
                <AvatarFallback>{product.status.slice(0, 1)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-sm font-medium text-white">
                  {product.title}
                </h3>
                <p className="text-xs text-zinc-400">{product.category}</p>
              </div>
            </div>

            {/* Main image */}
            <div className=" aspect-[4/3] w-full">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-cover"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            </div>

            {/* Product info overlay */}
            <div className="absolute bottom-0 left-0 right-0 z-20 p-3">
              {/* Price and discount */}
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg font-bold text-white">
                  {product.price} ₽
                </span>
                <span className="text-sm text-zinc-400 line-through">
                  {product.oldPrice}
                </span>
                <span className="text-xs font-medium text-red-500">
                  {product.discount}
                </span>
              </div>

              {/* Description */}
              <p className="text-sm text-zinc-300 mb-1">
                {product.description}
              </p>

              {/* Rating */}
              <div className="flex items-center gap-1">
                <StarRating rating={product.rating} />
                <span className="text-xs text-zinc-400">
                  ({product.reviews})
                </span>
              </div>

              {/* Watermark */}
              <div className="absolute bottom-2 right-2 text-xs text-zinc-600">
                {product.watermark}
              </div>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}
