interface ProductCardProps {
  image: string;
  name: string;
  pieces: string;
  weight: string;
  originalPrice: number;
  salePrice: number;
  onAdd: () => void;
}

export default function ProductCard({ image, name, pieces, weight, originalPrice, salePrice, onAdd }: ProductCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex-shrink-0 w-[160px] md:w-[200px]">

      {/* Product Image */}
      <div className="w-full h-[110px] md:h-[140px] overflow-hidden rounded-t-2xl bg-gray-50">
        <img src={image} alt={name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
      </div>

      {/* Card Content */}
      <div className="p-2.5 md:p-3 flex flex-col gap-1">
        <h3 className="text-gray-900 font-semibold text-xs md:text-sm leading-tight line-clamp-1">{name}</h3>
        <p className="text-gray-500 text-[10px] md:text-xs">{pieces}</p>
        <div className="flex items-center gap-1">
          <span className="text-gray-400 text-[10px]">🕐</span>
          <p className="text-gray-500 text-[10px] md:text-xs line-clamp-1">{weight}</p>
        </div>

        {/* Price + Add */}
        <div className="flex items-center justify-between mt-1">
          <div>
            <span className="text-gray-400 text-[10px] md:text-xs line-through">₹{originalPrice}</span>
            {" "}
            <span className="text-gray-900 font-bold text-xs md:text-sm">₹{salePrice}</span>
          </div>
          <button
            onClick={onAdd}
            className="bg-white border-2 border-red-500 text-red-500 font-bold text-xs px-2.5 md:px-4 py-0.5 md:py-1 rounded-lg hover:bg-red-500 hover:text-white transition-all"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}