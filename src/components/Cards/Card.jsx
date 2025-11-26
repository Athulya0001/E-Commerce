import React, { useContext } from "react";
import { ProductContext } from "../../Context/ProductContext";
import { FaHeart } from "react-icons/fa";
import { FiHeart, FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";
import { BsCartCheck } from "react-icons/bs";
import { AiOutlineEye } from "react-icons/ai";
import { useDispatch } from "react-redux";

const Card = ({ product }) => {
  const {
    setSelectedProduct,
    toggleWishlist,
    isInCart,
    isInWish,
    handleAddToCart,
  } = useContext(ProductContext);

  return (
    <div className="relative p-3 border border-[#E4E7E9] group cursor-pointer">
      {product.stock < 1 && (
        <span className="absolute top-2 left-2 bg-[#929FA5] text-white text-xs font-semibold px-2.5 py-1.5 rounded-xs z-10">
          SOLD OUT
        </span>
      )}

      {(product.rating > 4.5 || product.discountPercentage > 18) && (
        <span
          className={`absolute top-2 left-2 text-xs font-semibold px-2.5 py-1.5 rounded-xs z-10 ${
            product.rating > 4.5
              ? "bg-red-500 text-white"
              : "bg-[#EFD33D] text-black"
          }`}
        >
          {product.rating > 4.5
            ? "HOT"
            : `${Math.floor(product.discountPercentage)}% OFF`}
        </span>
      )}

      <div className="relative w-full h-40 overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-all duration-300 group-hover:bg-black/20"
        />

        <div className="absolute inset-0 flex justify-center items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div
            className="p-2 bg-white text-black hover:bg-[#FA8232] hover:text-white rounded-full cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product);
            }}
          >
            {isInWish(product) ? (
              <FaHeart size={24} color="red" />
            ) : (
              <FiHeart size={24} className="text-current" />
            )}
          </div>

          <Link
            to={isInCart(product) ? "/cart" : "#"}
            onClick={(e) => {
              e.stopPropagation();

              if (!isInCart(product)) {
                handleAddToCart(product);
              }
            }}
          >
            <div className="p-2 bg-white text-black hover:bg-[#FA8232] hover:text-white rounded-full cursor-pointer">
              {isInCart(product) ? (
                <BsCartCheck size={24} className="text-current" />
              ) : (
                <FiShoppingCart size={24} className="text-current" />
              )}
            </div>
          </Link>

          <div
            className="p-2 bg-white text-black hover:bg-[#FA8232] hover:text-white rounded-full cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedProduct(product);
            }}
          >
            <AiOutlineEye size={24} className="text-current" />
          </div>
        </div>
      </div>

      {/* <Rating rating={product.rating} reviews={product.stock} /> */}

      <h3 className="head5 font-normal mt-2 line-clamp-2 text-sm sm:text-base">
        {product.title}: {product.description}
      </h3>

      <span className="head5 text-[#2DA5F3] font-semibold mt-1 text-sm sm:text-base">
        <span className="text-xs text-[#a19e9e] line-through">
          ${product?.price}
        </span>{" "}
        $
        {(
          product?.price *
          (1 - product.discountPercentage / 100)
        ).toFixed(2)}
      </span>
    </div>
  );
};

export default Card;
