import React, { createContext, ReactNode, useState, useEffect } from "react";

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
  setCart: React.Dispatch<React.SetStateAction<Product[]>>;
  addToCart: (product: Product) => void;
}

export const CartContext = createContext({} as CartContextType);


export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<Product[]>([]);  

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error("Erro ao carregar o carrinho do localStorage:", error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  

  const addToCart = (product: Product) => {
    const newItems: Product[] = [...cart];
    newItems.push(product);
    setCart(newItems);
  };

  return (
    <CartContext.Provider value={{cart, addToCart, setCart}}>
      {children}
    </CartContext.Provider>
  );
};

