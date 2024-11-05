export function Filters({ setCategory }: { setCategory: (category: string) => void }) {
  const categories = ["Todos", "Croppeds", "Conjuntos", "Saias", "Shorts", "Vestidos", "Body", "Calças"];

  return (
    <div className="flex items-center justify-center bg-gray-200 m-0">
      <ul className="overflow-x-auto m-0 flex justify-between items-center gap-20 p-3 mx-10">
        {categories.map((category) => (
          <li
            key={category}
            className="cursor-pointer"
            onClick={() => setCategory(category)} 
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
}