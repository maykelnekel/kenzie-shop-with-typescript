import { ReactNode, createContext, useContext, useState } from "react";

interface CartProviderProps {
  children: ReactNode;
}

interface CartProviderData {}

const CartContext = createContext<CartProviderData>({} as CartProviderData);

export const CartProvider = ({ children }: CartProviderProps) => {
  return <CartContext.Provider value={{}}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);
