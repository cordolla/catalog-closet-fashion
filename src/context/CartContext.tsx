import React, { createContext, ReactNode, useState } from "react";

interface Product {
  name: string;
  size: string;
  id: string;
  prince: number;
  material: string;
  imageURL?: string;
}

interface CartContextType {
  cart: Product[];
  addToCart: (product: Product) => void;
}

export const CartContext = createContext({} as CartContextType);


export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<Product[]>([]);

  console.log(cart, 'context');

  const addToCart = (product: Product) => {
    const newItems: Product[] = [...cart];
    newItems.push(product);
    setCart(newItems);
  };

  return (
    <CartContext.Provider value={{cart, addToCart}}>
      {children}
    </CartContext.Provider>
  );
};

