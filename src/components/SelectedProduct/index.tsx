import { initializeApp } from "firebase/app";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { CartContext } from "../../context/CartContext";

interface Product {
  name: string;
  size: string;
  id: string;
  prince: number;
  material: string;
  imageURL?: string;
}

const firebaseApp = initializeApp({
  apiKey: "AIzaSyBDtSaJdRCN5uj7wqsYSgAE4jd2J7pJ04Q",
  authDomain: "catalogo-cf-610c0.firebaseapp.com",
  databaseURL: "https://catalogo-cf-610c0-default-rtdb.firebaseio.com",
  projectId: "catalogo-cf-610c0",
  storageBucket: "catalogo-cf-610c0.appspot.com",
  messagingSenderId: "512467166",
  appId: "1:512467166:web:8ff0a37285b3553996224f"
});


const db = getFirestore(firebaseApp);  

export function SelectedProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProduct(id: string) {
        const productDocRef = doc(db, "Products", id);
        const productDoc = await getDoc(productDocRef);
        setProduct(productDoc.data() as Product);
      }
    fetchProduct(id!);
  },[id]);
  

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      navigate('/cart')
    }
  }

  return (
    <div>
      <div className="min-h-screen bg-white flex items-start justify-center py-4">
        <div className="bg-white shadow rounded-lg p-6 w-full max-w-4xl flex flex-col md:flex-row">
          <div className="relative w-full md:w-1/2">
            <img
              src={product?.imageURL}
              alt={product?.name || 'Produto'}
              className="w-full h-auto rounded-none border-none transform transition-transform duration-300 ease-in-out hover:scale-110"
            />
          </div>
          <div className="w-full md:w-1/2 pl-0 md:pl-6 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold mb-2">{product?.name}</h2>
              <p className="text-gray-600 text-xl md:text-2xl mb-4">R$ {product?.prince}</p>
              <p className="text-gray-600 text-base md:text-lg mb-2">Tamanho: {product?.size}</p>
              <p className="text-gray-600 text-base md:text-lg">Material: {product?.material}</p>
            </div>
            <button
              onClick={handleAddToCart}
              className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 mt-4"
            >
              Adicionar ao Carrinho
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}