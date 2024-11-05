import { ShoppingCartSimple } from "phosphor-react";
import { useNavigate } from "react-router-dom";

export function Cart() {
  const navigate = useNavigate();
  const goToCartPage = () => {
    navigate("/Cart")
  }

  return (
    <div>
      <button
        onClick={goToCartPage}
        >
        <ShoppingCartSimple size={32} className="c-white" />
      </button>
    </div>
  )
}