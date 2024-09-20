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
    localStorage.removeItem("cart");
    sessionStorage.removeItem("cart");
    const loadCart = () => {
      const savedCartLocal = localStorage.getItem("cart");
      const savedCartSession = sessionStorage.getItem("cart");
      const savedCart = savedCartSession || savedCartLocal;

      if (savedCart) {
        try {
          const parsedCart = JSON.parse(savedCart) as Product[];
          setCart(parsedCart);
        } catch (error) {
          console.error("Erro ao carregar o carrinho do armazenamento:", error);
        }
      }
    };

    loadCart();
  }, []);

  useEffect(() => {
    const saveCart = () => {
      try {
        const cartString = JSON.stringify(cart);
        localStorage.setItem("cart", cartString);
        sessionStorage.setItem("cart", cartString);
      } catch (error) {
        console.error("Erro ao salvar o carrinho no armazenamento:", error);
      }
    };

    saveCart();
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart, product];
      return updatedCart;
    });
  };

const removeFromCart = (name: string) => {
  console.log("Nome para remover:", name);

  setCart((prevCart) => {
    console.log("Carrinho antes da remoção:", prevCart);

    const updatedCart = prevCart.filter(product => {
      const shouldRemove = product.name === name;
      console.log(`Produto ${product.name} - Deve remover? ${shouldRemove}`);
      return !shouldRemove;
    });

    console.log("Carrinho atualizado após remoção:", updatedCart);
    return updatedCart;
  });
};

  return (
    <CartContext.Provider value={{ cart, addToCart, setCart, removeFromCart  }}>
      {children}
    </CartContext.Provider>
  );
};