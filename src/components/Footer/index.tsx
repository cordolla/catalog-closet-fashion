import { InstagramLogo } from "phosphor-react";
import imageLogo from "../../assets/images/logocf.png"


export function Footer() {
  return (
    <div className="h-24 p-4 flex justify-between text-white text-sm bg-black">
      <div className="">
        <InstagramLogo size={50}/>
      </div>        
      <div className="flex flex-col items-center">
        <img src={imageLogo} className="size-10 mb-2"/>

        <p className="text-sm">
        Close Fashion - adfufhuwghioqead, 2984 - Centro - Quixada/CE CEP: 123133-000 CNPJ: 23.123.431/0001-26 - Todos os direitos reservados
        </p>
      </div>      
      <span className="mt-0">
          <p> Fale conosco </p>
          <p> (85) 99999-9999 </p>
          <p> (85) 99999-9999 </p>
      </span>      
    </div>
  )
}