import Image from 'next/image';
import { useState } from 'react';

interface FoodItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
}

interface FoodCardProps {
  food: FoodItem;
  onAddToCart?: (food: FoodItem) => void;
}

export default function FoodCard({ food, onAddToCart }: FoodCardProps) {
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    setIsAdded(true);
    if (onAddToCart) {
      onAddToCart(food);
    }
    // Reset the button state after 2 seconds
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="bg-white shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Image Container */}
      <div className="relative h-48 w-full">
        <Image
          src={food.image}
          alt={food.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Content Container */}
      <div className="p-4">
        {/* Category Badge */}
        <div className="mb-2">
          <span className="inline-block px-2 py-1 text-xs font-semibold text-orange-600 bg-orange-100 rounded-full">
            {food.category}
          </span>
        </div>

        {/* Food Name */}
        <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">
          {food.name}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {food.description}
        </p>

        {/* Price and Button */}
        <div className="flex items-center justify-between mt-4">
          <div>
            <span className="text-2xl font-bold text-orange-600">
              ${food.price.toFixed(2)}
            </span>
          </div>
          
          <button
            onClick={handleAddToCart}
            className={`px-4 py-2 cursor-pointer active:scale-98 font-semibold transition-all duration-200 transform hover:scale-105 ${
              isAdded
                ? 'bg-green-500 hover:bg-green-600'
                : 'bg-orange-500 hover:bg-orange-600'
            } text-white`}
          >
            {isAdded ? '✓ Added!' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}