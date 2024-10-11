import { Minus, Plus, ShoppingCart, X } from "lucide-react";
import React from "react";

const Cart = ({ cart, setShowCart, updateQuantity, removeFromCart, calculateTotal }) => {
  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={() => setShowCart(false)}
      ></div>
      <div className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-lg z-50 transform transition-transform duration-300">
        <div className="h-full flex flex-col">
          <div className="p-4 border-b">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">Shopping Cart</h2>
              <button
                onClick={() => setShowCart(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-gray-500">
                <ShoppingCart className="h-12 w-12 mb-4" />
                <p>Your cart is empty</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="bg-white rounded-lg border p-4">
                    <div className="flex gap-4">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-20 h-20 object-contain bg-gray-50 rounded"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 line-clamp-2">
                          {item.title}
                        </h3>
                        <p className="text-indigo-600 font-medium mt-1">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="p-1 hover:bg-gray-100 rounded"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="w-8 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="p-1 hover:bg-gray-100 rounded"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="ml-auto text-red-500 hover:text-red-600 text-sm"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {cart.length > 0 && (
            <div className="border-t p-4 bg-gray-50">
              <div className="flex justify-between items-center mb-4">
                <span className="font-medium text-gray-900">Total</span>
                <span className="font-bold text-lg text-gray-900">
                  ${calculateTotal().toFixed(2)}
                </span>
              </div>
              <button className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors">
                Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
