import React, { useContext } from "react";
import { ProductContext } from "../../Context/ProductContext";

const Search = ({ product, setSearchQuery }) => {
  const { setSelectedProduct } = useContext(ProductContext);

  return (
    <div
      className="flex items-center gap-3 p-2 hover:bg-gray-100 cursor-pointer border-b last:border-none"
      onClick={() => {
        setSelectedProduct(product);
        setSearchQuery("");
      }}
    >
      <img
        src={product?.images[0]}
        alt={product?.title}
        className="w-25 h-12 object-cover rounded"
      />
      <span className="text-sm text-gray-800">{product?.title}</span>
    </div>
  );
};

export default Search;
