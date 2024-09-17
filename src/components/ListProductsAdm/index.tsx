import { initializeApp } from "firebase/app";
import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore, updateDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { PlusCircle } from "phosphor-react";
import { useEffect, useState } from "react";
import { AddProductModal } from "../AddProductModal";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyBDtSaJdRCN5uj7wqsYSgAE4jd2J7pJ04Q",
  authDomain: "catalogo-cf-610c0.firebaseapp.com",
  databaseURL: "https://catalogo-cf-610c0-default-rtdb.firebaseio.com",
  projectId: "catalogo-cf-610c0",
  storageBucket: "catalogo-cf-610c0.appspot.com",
  messagingSenderId: "512467166",
  appId: "1:512467166:web:8ff0a37285b3553996224f"
});

export function ListProductsAdm(){
  
  const [name, setName] = useState("");
  const [size, setSize] = useState("");
  const [material, setMaterial] = useState("");
  const [categoria, setCategoria] = useState("");
  const [color, setColor] = useState("");
  const [prince, setPrince] = useState("");
  const [products, setProducts] = useState<any[]>([]);
  const [imageURL, setImageURL] = useState("");

  const db = getFirestore(firebaseApp);
  const productsCollectionRef = collection(db, "Products");

  async function addProduct() {
    if (editingProduct) {
      const productRef = doc(db, "Products", editingProduct.id);
      await updateDoc(productRef, {
        imageURL,
        color,
        material,
        categoria,
        name,
        prince,
        size,
      });
      console.log("Produto atualizado com sucesso");
      setEditingProduct(null);
    } else {
      await addDoc(productsCollectionRef, {
        imageURL,
        color,
        material,
        categoria,
        name,
        prince,
        size,
      });
      console.log("Produto adicionado com sucesso");
    }
  }

  const options = [
    { value: 'croppeds', label: 'Croppeds' },
    { value: 'conjuntos', label: 'Conjuntos' },
    { value: 'saias', label: 'Saias' },
    { value: 'shorts', label: 'Shorts' },
    { value: 'vestidos', label: 'Vestidos' },
    { value: 'body', label: 'Body' },
    { value: 'calças', label: 'Calças' }

  ]

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);


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

  function handleEditProduct(product: any) {
    setEditingProduct(product);
    setImageURL(product.imageURL);
    setName(product.name);
    setSize(product.size);
    setMaterial(product.material);
    setCategoria(product.categoria);
    setColor(product.color);
    setPrince(product.prince);
    setImageURL(product.imageURL);
    setIsModalOpen(true);
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
    <div className="">
      <div className="flex flex-col items-center justify-center bg-white shadow-md rounded-lg p-6 " >
        <div className="flex justify-between w-[40%]">
          <div>
          </div>
          <h2 className="text-2xl font-bold mb-4">Lista de Produtos</h2>
          <PlusCircle 
            size={32}
            type="submit"
            className="flex items-center justify-center cursor-pointer text-bold text-[20px] pt-1 pb h-10 w-10 rounded-md focus:outline-none focus:ring"
            /*onClick={addProduct}*/
            onClick={() => setIsModalOpen(true)} />
            
        </div>
        <table className="h-full w-[65%] mb-6">
          <thead>
            <tr>
              <th className="text-left py-2">Imagem</th>
              <th className="text-left py-2">Nome</th>
              <th className="text-left py-2">Tamanho</th>
              <th className="text-left py-2">Material</th>
              <th className="text-left py-2">Categoria</th>
              <th className="text-left py-2">Cor</th>
              <th className="py-2">Preço</th>
              <th className="py-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index} className="border-t">
                <td className="py-2">                  
                  <img src={product.imageURL} alt={''} className="w-16 h-20 rounded-md" />                  
                </td>
                <td className="py-2">{product.name}</td>
                <td className="py-2">{product.size}</td>
                <td className="py-2">{product.material}</td>
                <td className="py-2">{product.categoria}</td>
                <td className="py-2">{product.color}</td>
                <td className="text-center py-2">R$ {product.prince}</td>
                <td className="text-center py-2">
                    <button
                      onClick={() => deleteProduct(product.id)}
                      className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300"
                    >
                      Apagar
                    </button>
                    <button
                      onClick={() => handleEditProduct(product)}
                      className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring focus:ring-yellow-300"
                    >
                      Editar
                    </button>                                                      
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
      
      <div className="">            
        <AddProductModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <div>
          <form className="bg-white shadow-md rounded-lg p-6 mt-6">
        <h2 className="text-2xl font-bold mb-4">{editingProduct ? "Editar Produto" : "Adicionar Produto"}</h2>
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
          <label className="block text-gray-700">Categoria</label>
          <select
            name="material"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-2"
            required
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
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
            type="number"
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
        <div className="flex justify-between">
          <button
            type="submit"
            className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
            onClick={addProduct}
          >
            {editingProduct ? "Salvar Alterações" : "Adicionar Produto"}
          </button>
          <button
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:ring-blue-300"
              onClick={() => {
                setIsModalOpen(false);
                setEditingProduct(null);
                setImageURL("");
                setName("");
                setSize("");
                setMaterial("");
                setCategoria("");
                setColor("");
                setPrince("");
                setImageURL("");
              }}
            >
              Cancelar
            </button>
          </div> 
      </form>
          </div>
          
        </AddProductModal>
        </div>
      </div>
    </div>
  )
}