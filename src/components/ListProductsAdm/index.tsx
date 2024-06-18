import { initializeApp } from "firebase/app";
import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useEffect, useState } from "react";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyA6uiRjaGRocecCpf-NMov7vwa8mwTMs6I",
  authDomain: "catalogo-cf-3747f.firebaseapp.com",
  databaseURL: "https://catalogo-cf-3747f-default-rtdb.firebaseio.com",
  projectId: "catalogo-cf-3747f",
  storageBucket: "catalogo-cf-3747f.appspot.com",
  messagingSenderId: "169757952923",
  appId: "1:169757952923:web:cf9ef7cac635ae82f2ef3e"
});

export function ListProductsAdm(){
  
  const [name, setName] = useState("");
  const [size, setSize] = useState("");
  const [material, setMaterial] = useState("");
  const [color, setColor] = useState("");
  const [prince, setPrince] = useState("");
  const [products, setProducts] = useState<any[]>([]);

  const [imageURL, setImageURL] = useState("");

  const db = getFirestore(firebaseApp);
  const productsCollectionRef = collection(db, "Products");

  async function addProduct() {
    const teste = await addDoc(productsCollectionRef, {
      imageURL,
      color,
      material,
      name,
      prince,
      size,
    });
    console.log(teste);
  }


  useEffect(() => {
    const getProducts = async () => {
      const data = await getDocs(productsCollectionRef);
      setProducts(data.docs.map((product) => ({...product.data(), id: product.id})));
    };
    getProducts();
  }, []);

  async function deleteProduct(id: any) {
      await deleteDoc(doc(db, 'Products', id));
      console.log("Item deletado com sucesso");
  }

  async function handleImageChange(e: any) {
    const image = e.target.files[0];

    if(image) {
      try {
        const storage = getStorage(firebaseApp);
        const storageRef = ref(storage, "images/" + image.name)
        await uploadBytes(storageRef, image);
        const downloadURL = await getDownloadURL(storageRef);
        console.log(downloadURL);
        setImageURL(downloadURL);

      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <div>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Lista de Produtos</h2>
        <table className="w-full mb-6">
          <thead>
            <tr>
              <th className="text-left py-2">Imagem</th>
              <th className="text-left py-2">Nome</th>
              <th className="text-left py-2">Tamanho</th>
              <th className="text-left py-2">Material</th>
              <th className="text-left py-2">Cor</th>
              <th className="text-left py-2">Preço</th>
              <th className="text-left py-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index} className="border-t">
                <td className="py-2">                  
                  <img src={product.imageURL} alt={''} className="w-16 h-16 rounded-md" />                  
                </td>
                <td className="py-2">{product.name}</td>
                <td className="py-2">{product.size}</td>
                <td className="py-2">{product.material}</td>
                <td className="py-2">{product.color}</td>
                <td className="py-2">R$ {product.prince}</td>
                <td className="py-2">
                  <button
                    onClick={() => deleteProduct(product.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300"
                  >
                    Apagar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
      <form className="bg-white shadow-md rounded-lg p-6 mt-6">
        <h2 className="text-2xl font-bold mb-4">Adicionar Produto</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Imagem</label>
          <input
            autoComplete=""
            type="file"
            name="image"
            onChange={handleImageChange}
            placeholder="texto"
            className="w-full p-2 border border-gray-300 rounded mt-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Nome</label>
          <input
            type="text"
            name="name"
            placeholder="texto"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Tamanho</label>
          <input
            type="text"
            name="size"
            placeholder="texto"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Material</label>
          <input
            type="text"
            name="material"
            placeholder="texto"
            value={material}
            onChange={(e) => setMaterial(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Cor</label>
          <input
            type="text"
            name="color"
            placeholder="texto"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-2"
            required            
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Preço</label>
          <input
            type="text"
            name="prince"
            placeholder="number"
            value={prince}
            onChange={(e) => setPrince(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-2"
            required
          />
        </div>
        <input
          className="hidden "
          required/>
        <button
          type="submit"
          className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
          onClick={addProduct}          
        >Adicionar Produto
        </button>
      </form>
      </div>
    </div>
  )
}