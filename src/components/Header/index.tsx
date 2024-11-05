import { Cart } from "../Cart";
import imageLogo from "../../assets/images/logocf.png"
import { InputBox } from "../InputBox";
import { Link } from "react-router-dom";

export function Header() {  
  return (

    <div className="flex flex-col">
      <div className="text-xs m-0 flex items-center p-1 justify-center">
        <span>Seu closet dos sonhos começa aqui</span>
      </div>
      <div className="text-white bg-black flex justify-between p-6 w-auto">
        <Link to={'/'}>
          <img src={imageLogo} alt="" className="size-10"/>
        </Link>
        <InputBox />
        <Cart />
      </div>
    </div>
  )
}
