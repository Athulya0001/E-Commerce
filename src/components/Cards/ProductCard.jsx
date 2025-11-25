import React, { useContext,useEffect } from "react";
import { ProductContext } from "../../Context/ProductContext";
// import { addToCart } from "../../redux/reducers/cartSlice";

const ProductCard = ({ product }) => {
  const { setSelectedProduct } = useContext(ProductContext);

  return (
    <div
      onClick={() => {
        setSelectedProduct(product);
      }}
      className="flex flex-col sm:flex-row items-start sm:items-center gap-3 border border-[#E4E7E9] p-3 rounded w-full hover:shadow-md transition-shadow duration-300 cursor-pointer"
    >
      <img
        src={product.images?.[0]}
        alt={product.title}
        className="w-full sm:w-20 h-20 object-cover rounded hover:scale-110 transition-transform duration-300"
      />

      <div className="flex flex-col flex-1">
        <span className="head5 line-clamp-2 text-[#191C1F]">
          {product.description}
        </span>

        <span className="text-[#2DA5F3] head5 font-semibold mt-1">
          ${product.price}
        </span>

        {/* <button
          onClick={(e) => {
            e.stopPropagation();
            dispatch(addToCart(product));
          }}
          className="mt-3 bg-[#0096ff] text-white px-3 py-1 rounded hover:bg-[#007acc] w-fit"
        >
          Add to Cart
        </button> */}
      </div>
    </div>
  );
};

export default ProductCard;
