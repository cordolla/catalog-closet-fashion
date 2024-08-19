import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Product } from "../Product";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyBDLZZsNoyREt9BszD4_y1meDchWqqqhlA",
  authDomain: "catalogo-cf-9e84d.firebaseapp.com",
  databaseURL: "https://catalogo-cf-9e84d-default-rtdb.firebaseio.com",
  projectId: "catalogo-cf-9e84d",
  storageBucket: "catalogo-cf-9e84d.appspot.com",
  messagingSenderId: "334563433617",
  appId: "1:334563433617:web:b908ea6d4474a712913330"
});

export function ListProducts() {
  const [products, setProducts] = useState<any[]>([]);

  const db = getFirestore(firebaseApp);
  const productsCollectionRef = collection(db, 'Products');

  useEffect(() => {
    const getProducts = async () => {
      const data = await getDocs(productsCollectionRef);
      setProducts(data.docs.map((product) => ({...product.data(), id: product.id})));
    };
    getProducts();
  }, [])
  return(
    <div className="flex-grow">
      <div className="flex flex-col min-h-screen grid grid-cols-1 lg:grid-cols-5 gap-4 mx-92 my-8"  >
        {products.map((item, index) =>
          <Product key={index} product={item} />
        )}
      </div>
    </div>
  )
}