import { useContext, useEffect } from "react";
import { Footer } from "../Footer";
import { Header } from "../Header/index";
import { CartContext } from "../../context/CartContext";

export function CartPage() {
  const { cart, setCart, removeFromCart } = useContext(CartContext);

  let total = 0;

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, [setCart]);

  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-gray-100 py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6 text-center">Carrinho</h1>
          <div className="bg-white shadow-md rounded-lg p-4">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Produto</th>
                  <th className="text-left py-2">Valor</th>
                  <th className="text-left py-2">Ação</th>
                </tr>
              </thead>
              <tbody>
                  {cart.map((product, index) => {
                    const productTotal = product.prince * 1;
                    total += productTotal;
  
                  return (
                    <tr className="border-t" key={product.id || index}>
                      <td className="py-4 flex items-center">
                        <img 
                          src={product.imageURL} 
                          alt={product.name} 
                          className="w-20 h-20 rounded-md mr-4 object-contain" 
                        />
                        <span className="text-sm md:text-base">{product.name}</span>
                      </td>
                      <td className="py-4 text-lg">R$ {product.prince}</td>
                      <td className="py-4">
                        <button
                          onClick={() => removeFromCart(product.name)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Remover
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="flex flex-col md:flex-row justify-between items-center mt-4">
              <h2 className="text-lg font-bold">Total: R$ {total.toFixed(2)}</h2>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mt-4 md:mt-0">
                Finalizar
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );  
}