"use client";

import { 
  clearCart, 
  increaseQuantity, 
  decreaseQuantity,
  removeFromCart,
  toggleCart 
} from "@/src/store/features/cartSlice";
import { useAppDispatch, useAppSelector } from "@/src/store/hooks";
import { Minus, Plus, Trash, X } from "lucide-react";
import Image from "next/image";
import React from "react";

const Cart = () => {
  const dispatch = useAppDispatch();
  const totalItems = useAppSelector((state) => state.cart.totalQuantity);
  const totalPrice = useAppSelector((state) => state.cart.totalPrice);
  const items = useAppSelector((state) => state.cart.items);
  const isCartOpen = useAppSelector((state) => state.cart.isOpen);
  
  const handleToggleCart = () => {
    dispatch(toggleCart());
  };
  
  const handleClearCart = () => {
    if (confirm("Are you sure you want to clear your cart?")) {
      dispatch(clearCart());
    }
  };

  const handleIncreaseQuantity = (id: number) => {
    dispatch(increaseQuantity(id));
  };

  const handleDecreaseQuantity = (id: number) => {
    dispatch(decreaseQuantity(id));
  };

  const handleRemoveItem = (id: number) => {
    dispatch(removeFromCart(id));
  };

  return (
    <div
      className={`fixed z-50 top-0 right-0 w-96 bg-white text-black p-4 h-screen shadow-lg transition-transform duration-300 ${
        isCartOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-2">
          <h5 className="font-semibold text-xl">Your Cart</h5>
          <button
            onClick={handleToggleCart}
            className="cursor-pointer p-1 rounded-full hover:bg-gray-200 transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Cart Summary */}
        <div className="py-2 flex justify-between items-center border-b">
          <p className="font-medium">Total Items: {totalItems}</p>
          {items.length > 0 && (
            <button
              title="Clear Cart"
              className="cursor-pointer text-red-600 p-1 bg-red-100 rounded-full hover:bg-red-200 transition"
              onClick={handleClearCart}
            >
              <Trash size={16} />
            </button>
          )}
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4">
          {items.length === 0 ? (
            <div className="text-center text-gray-500 mt-8">
              <p>Your cart is empty</p>
              <button
                onClick={handleToggleCart}
                className="mt-4 text-orange-500 hover:text-orange-600"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 bg-gray-100 p-2 rounded-lg">
                {/* Image container - 100px x 100px */}
                <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                  <Image
                    src={item.image || "/placeholder-image.jpg"}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>

                {/* Item details */}
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        {item.name}
                      </h3>
                      <p className="text-orange-600 font-medium">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-red-500 hover:text-red-700 transition bg-red-100 rounded-full p-1 cursor-pointer"
                      title="Remove item"
                    >
                      <Trash size={14} />
                    </button>
                  </div>

                  {/* Quantity controls */}
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => handleDecreaseQuantity(item.id)}
                      className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 transition cursor-pointer"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="text-gray-700 w-6 text-center font-medium">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => handleIncreaseQuantity(item.id)}
                      className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 transition cursor-pointer"
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t pt-4 mt-auto">
            <div className="flex justify-between items-center mb-4">
              <span className="font-semibold text-lg">Total:</span>
              <span className="font-bold text-xl text-orange-600">
                ${totalPrice.toFixed(2)}
              </span>
            </div>
            <button
              onClick={() => alert("Checkout functionality coming soon!")}
              className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition font-semibold"
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
