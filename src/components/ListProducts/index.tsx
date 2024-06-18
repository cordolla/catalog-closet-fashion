import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Product } from "../Product";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyA6uiRjaGRocecCpf-NMov7vwa8mwTMs6I",
  authDomain: "catalogo-cf-3747f.firebaseapp.com",
  databaseURL: "https://catalogo-cf-3747f-default-rtdb.firebaseio.com",
  projectId: "catalogo-cf-3747f",
  storageBucket: "catalogo-cf-3747f.appspot.com",
  messagingSenderId: "169757952923",
  appId: "1:169757952923:web:cf9ef7cac635ae82f2ef3e"
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
    <div className="">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mx-92 my-8"  >
        {products.map((item, index) =>
          <Product key={index} product={item} />
        )}
      </div>
    </div>
  )
}