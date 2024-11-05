import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Product } from "../Product";
import { Filters } from "../Filters";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyBDtSaJdRCN5uj7wqsYSgAE4jd2J7pJ04Q",
  authDomain: "catalogo-cf-610c0.firebaseapp.com",
  databaseURL: "https://catalogo-cf-610c0-default-rtdb.firebaseio.com",
  projectId: "catalogo-cf-610c0",
  storageBucket: "catalogo-cf-610c0.appspot.com",
  messagingSenderId: "512467166",
  appId: "1:512467166:web:8ff0a37285b3553996224f"
});

export function ListProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos"); 
  

  const db = getFirestore(firebaseApp);
  const productsCollectionRef = collection(db, 'Products');

  useEffect(() => {
    const getProducts = async () => {
      const data = await getDocs(productsCollectionRef);
      const productsList = data.docs.map((product) => ({ ...product.data(), id: product.id }));
      setProducts(productsList);
      setFilteredProducts(productsList); 
    };
    getProducts();
  }, []);

  useEffect(() => {
    if (selectedCategory === "Todos") {
      setFilteredProducts(products); 
    } else {
      const filtered = products.filter((product) => product.categoria === selectedCategory);
      setFilteredProducts(filtered);
    }
  }, [selectedCategory, products]);

  return(
    <div>
      <Filters setCategory={setSelectedCategory} />
      
      <div  className="grid items-center justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4 gap-6 mx-12 my-12">
          {filteredProducts.map((item, index) => (
            <Product key={index} product={item} />
          ))}
        </div>
      </div>
    </div>
  )
}