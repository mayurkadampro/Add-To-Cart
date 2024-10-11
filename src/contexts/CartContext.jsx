import { createContext, useEffect, useState } from "react";
import { CART_KEY } from "../constants";

export const CartContext = createContext([]);

export const CartContextProvider = ({ children }) => {
    const localData = localStorage.getItem(CART_KEY);
    const [cart, setCartData] = useState(JSON.parse(localData) || []);

    function updateCartData(cart) {
        setCartData(cart);
    }

    useEffect(() => {
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
    }, [cart]);

    const value = {
        cart,
        updateCartData,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
