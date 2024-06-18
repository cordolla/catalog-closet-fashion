import { MagnifyingGlass } from "phosphor-react";

export function InputBox() {
  return (
    <div className="flex w-4/4 gap-0 m-0 ">
      <input className="w-92 focus:outline-none appearance-none py-2 px-3 text-gray-700 leading-tight" type="text" placeholder="O que você está procurando?" />
      <button>
        <MagnifyingGlass color="black" size={22} className="bg-white h-10 w-8 color-black"/>
      </button>
      
    </div>
  )
}