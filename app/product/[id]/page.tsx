import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

// Mock function to get product details
function getProductDetails(id: string) {
  // In a real application, you would fetch this data from an API or database
  return {
    id,
    name: 'Sample Product',
    description: 'This is a sample product description. It would contain details about the in-game item, its rarity, and any special features.',
    price: 29.99,
    image: '/placeholder.svg',
  }
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = getProductDetails(params.id)

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="bg-gray-800 text-gray-100">
        <CardHeader>
          <CardTitle>{product.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <img src={product.image} alt={product.name} className="w-full h-64 object-cover mb-4" />
          <p>{product.description}</p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <span className="text-2xl font-semibold">${product.price}</span>
          <Button>Add to Cart</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

