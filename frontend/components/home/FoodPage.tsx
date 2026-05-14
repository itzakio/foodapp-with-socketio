"use client";
import { foodData } from "@/utils/foodData";
import FoodCard from "../card/FoodCard";
import { useAppDispatch, useAppSelector } from "@/src/store/hooks";
import { addToCart } from "@/src/store/features/cartSlice";

const FoodPage = () => {
  const dispatch = useAppDispatch();

  // Get cart data from Redux
  const cartItems = useAppSelector((state) => state.cart.items);
  const totalItems = useAppSelector((state) => state.cart.totalQuantity);
  const totalPrice = useAppSelector((state) => state.cart.totalPrice);
  const isCartOpen = useAppSelector((state) => state.cart.isOpen);

  const handleAddToCart = (food: typeof foodData[number]) => {
    dispatch(
      addToCart({
        id: food.id,
        name: food.name,
        price: food.price,
        quantity: 1,
        image: food.image,
        description: food.description,
      }),
    );
  };
  return (
    <div className="max-w-350 mx-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 xl:gap-8">
      {foodData?.map((food) => (
        <FoodCard key={food.id} food={food} onAddToCart={handleAddToCart} />
      ))}
    </div>
  );
};

export default FoodPage;