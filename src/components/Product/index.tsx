import { Link } from "react-router-dom";


export function Product(props:  any) {
  const {product} = props;

  return(
    <Link to={`/Item-page/${product.id}`} >
    <div className="bg-white cursor-pointer w-52 m-0 gap-0 p-0">
      <img className="w-64 h-64 object-cover" src={product.imageURL} />
      <p className="text-black m-0 p-0 gap-0 font-semibold">R$ {product?.prince}</p>
      <h2 className="text-x">{product?.name}</h2>      
      <p className="mb-0">Tamanho: <span>{product?.size}</span></p>
    </div>  
    </Link>
  )
}