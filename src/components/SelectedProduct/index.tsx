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
  apiKey: "AIzaSyA6uiRjaGRocecCpf-NMov7vwa8mwTMs6I",
  authDomain: "catalogo-cf-3747f.firebaseapp.com",
  databaseURL: "https://catalogo-cf-3747f-default-rtdb.firebaseio.com",
  projectId: "catalogo-cf-3747f",
  storageBucket: "catalogo-cf-3747f.appspot.com",
  messagingSenderId: "169757952923",
  appId: "1:169757952923:web:cf9ef7cac635ae82f2ef3e"
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
  <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="bg-white shadow rounded-lg p-6 w-full max-w-4xl mx-auto flex">
            <img 
              src={product?.imageURL}
              alt=''
              className="w-1/2 h-auto rounded-md transition duration-300 ease-in-out transform hover:scale-105 hover:grayscale"
            />
            <div className="w-1/2 pl-6">
              <h2 className="text-3xl font-semibold mb-4">{product?.name}</h2>
              <p className="text-gray-600 text-2xl mb-2">R$ {product?.prince}</p>
              <p className="text-gray-600 text-lg mb-2">Tamanho: {product?.size}</p>
              <p className="text-gray-600 text-lg mb-4">Material: {product?.material}</p>
                <button
                onClick={handleAddToCart}
                className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300">
                  Adicionar ao Carrinho
                </button>
            </div>
          </div>
        </div>
  )
}