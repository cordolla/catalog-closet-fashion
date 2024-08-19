import { useContext } from "react";
import { Footer } from "../Footer";
import { Header } from "../Header/index";
import { CartContext } from "../../context/CartContext";


export function CartPage(){
  const { cart } = useContext(CartContext);

  let total = 0;

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6 text-center">Carrinho de Compras</h1>
          <div className="bg-white shadow-md rounded-lg p-6">
              <div>
                <table className="w-full mb-6">
                  <thead>
                    <tr>
                      <th className="text-left py-2">Produto</th>
                      <th className="text-left py-2">Quantidade</th>
                      <th className="text-left py-2">Tamanho</th>
                      <th className="text-left py-2">Valor</th>
                      <th className="text-left py-2">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((product, index) => {
                      const productTotal = product.prince * 1;
                      total += productTotal;

                      return (
                        <tr className="border-t" key={index}>
                          <td className="py-2 flex items-center">
                          <img src={product.imageURL} alt='' className="w-16 h-16 rounded-md mr-2" />
                            {product.name}
                          </td>
                          <td className="py-2">1</td>
                          <td className="py-2">{product.size}</td>
                          <td className="py-2">R$ {product.prince}</td>
                          <td className="py-2">R$ {product.prince}</td>
                        </tr>
                      );
                    })} 
                  </tbody>
                </table>
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Total: R$ {total.toFixed(2)}</h2>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300">
                    Finalizar Pedido
                  </button>
                </div>
              </div>            
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
