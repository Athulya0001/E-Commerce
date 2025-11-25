import React, { useContext } from "react";
import { ProductContext } from "../../Context/ProductContext";
import { addToCart } from "../../redux/reducers/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BsCartCheck } from "react-icons/bs";
import { FiHeart, FiShoppingCart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";

const ItemCard = ({ product }) => {
  const navigate = useNavigate();
  const { setSelectedProduct, toggleWishlist, isInCart, isInWish } =
    useContext(ProductContext);
  const dispatch = useDispatch();

  return (
    <div
      onClick={() => {
        setSelectedProduct(product);
      }}
      className="relative flex flex-col items-start sm:items-center gap-3 border border-[#E4E7E9] p-3 rounded  hover:shadow-md transition-shadow duration-300 cursor-pointer w-[200px]"
    >
      <div
        className="absolute top-2 right-3 flex justify-center items-center"
        onClick={(e) => {
          e.stopPropagation();
          toggleWishlist(product);
        }}
      >
        {isInWish(product) ? (
          <FaHeart color="red" size={24} />
        ) : (
          <FiHeart color="red" size={24} />
        )}
      </div>
      <img
        src={product.images?.[0]}
        alt={product.title}
        className="w-full sm:w-20 h-20 object-cover rounded hover:scale-110 transition-transform duration-300"
      />

      <div className="flex flex-col flex-1">
        <span className="head5 line-clamp-3 text-[#191C1F]">
          {product.description}
        </span>

        <span className="text-[#2DA5F3] head5 font-semibold mt-1">
          ${product.price}
        </span>

        <div className="flex justify-center w-full items-center mt-3">
          {isInCart(product) ? (
            <div
              onClick={(e) => {
                e.stopPropagation();
                navigate("/cart");
              }}
              className="flex items-center justify-center gap-2 bg-[#FA8232] border border-[#FA8232] 
               text-white px-3 py-1 rounded cursor-pointer 
               hover:text-[#FA8232] hover:bg-white w-full"
            >
              <BsCartCheck size={20} />
              Go to Cart
            </div>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation();
                dispatch(addToCart({ ...product, count: 1 }));
              }}
              className="flex items-center justify-center gap-2 bg-[#FA8232] border border-[#FA8232] text-white px-3 py-1 rounded hover:text-[#FA8232] hover:bg-white w-full"
            >
              <FiShoppingCart size={20} />
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
