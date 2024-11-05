import { Link } from "react-router-dom";

interface ProductType {
  id: string;
  imageURL: string;
  prince: number;
  name: string;
  size: string;
}

interface ProductProps {
  product: ProductType;
}

export function Product({ product }: ProductProps) {
  return(
    <Link to={`/Item-page/${product.id}`} >
      <div className="bg-white cursor-pointer w-[421px] m-0 gap-0 p-0">
        <img className="object-cover" src={product.imageURL} />
        <p className="text-black m-0 p-0 gap-0 font-semibold">R$ {product?.prince}</p>
        <h2 className="text-x">{product?.name}</h2>      
        <p className="mb-0">Tamanho: <span>{product?.size}</span></p>
      </div>  
    </Link>
  )
}