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
  removeFromCart: (name: string) => void;
}

export const CartContext = createContext<CartContextType>({} as CartContextType);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<Product[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setCart(parsedCart);
      } catch (error) {
        console.error("Erro ao carregar o carrinho do localStorage:", error);
      }
    }
  }, []);

  useEffect(() => {
    if (cart.length > 0) { 
      try {
        console.log("Salvando carrinho no localStorage:", cart);
        localStorage.setItem("cart", JSON.stringify(cart));
      } catch (error) {
        console.error("Erro ao salvar o carrinho no localStorage:", error);
      }
    }
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const removeFromCart = (name: string) => {
    setCart((prevCart) => prevCart.filter((product) => product.name !== name));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, setCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
