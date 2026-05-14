import { toggleCart } from "@/src/store/features/cartSlice";
import { useAppDispatch, useAppSelector } from "@/src/store/hooks";
import Cart from "./Cart";
import { ShoppingBasket } from "lucide-react";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const totalItems = useAppSelector((state) => state.cart.totalQuantity);
  const handleToggleCart = () => {
    dispatch(toggleCart());
  };

  return (
    <div>
      <div className="h-16 mb-12"></div>
      <div className="h-16 border-b fixed top-0 left-0 w-full bg-white z-10 text-black">
        <nav className="max-w-350 mx-auto flex justify-between items-center p-4">
          <div className="text-xl font-semibold">Food Khai</div>
          <div
            className="relative cursor-pointer  p-1 rounded-full bg-gray-300"
            onClick={handleToggleCart}
          >
          <ShoppingBasket />
            <p className="absolute top-0 right-0 size-3 bg-red-600 flex justify-center items-center text-[10px] text-white rounded-full ">
              {totalItems}
            </p>
          </div>
        </nav>
      </div>
      <Cart />
    </div>
  );
};

export default Navbar;
