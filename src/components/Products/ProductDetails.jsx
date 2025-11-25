import React, { useContext, useState } from "react";
import Rating from "../Rating/Rating";
import { Link, useNavigate } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/reducers/cartSlice";
import { ProductContext } from "../../Context/ProductContext";
import { BsCartCheck } from "react-icons/bs";

const ProductDetails = ({ product, onClose }) => {
  if (!product) return null;
  const formattedCategory = product.category
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  const [count, setCount] = useState(1);
  const [showContent, setShowContent] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isInCart } = useContext(ProductContext);

  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => setCount((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (isInCart(product)) {
      onClose();
      navigate("/cart");
    } else {
      dispatch(addToCart({ ...product, count }));
      onClose();
    }
  };

  const toggleContent = () => setShowContent((prev) => !prev);

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 px-4">
      <div className="bg-white md:py-6 px-6 md:px-10 rounded-lg w-[80vw] max-w-4xl relative flex flex-col md:flex-row gap-8">
        <button
          className="absolute top-3 right-3 text-2xl font-bold cursor-pointer"
          onClick={onClose}
        >
          ✕
        </button>

        <div className="w-full md:w-2/5 border border-[#E4E7E9] rounded-md p-4 flex justify-center items-center">
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-full h-50 md:h-auto object-contain rounded"
          />
        </div>

        <div className="w-full md:w-3/5 flex flex-col gap-4 pb-10 md:pb-0">
          <Rating
            rating={product.rating}
            text={product.rating + " Star Rating"}
            reviews={product.stock + " User Feedback"}
          />

          <h2 className="text-xl font-semibold">
            {product.title} -{" "}
            {product.brand
              ? product.brand
              : product.category
                  ?.replace(/-/g, " ")
                  .replace(/^\w/, (c) => c.toUpperCase())}
          </h2>

          <div className="flex flex-col gap-3 text-sm">
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
              <span className="text-gray-700">
                Sku:{" "}
                <span className="text-black">
                  {product.sku.replace(/-/g, "")}
                </span>
              </span>
              <span className="text-gray-700">
                Availability:{" "}
                <span
                  className={
                    product.availabilityStatus === "In Stock"
                      ? "text-green-600"
                      : product.availabilityStatus === "Low Stock"
                      ? "text-amber-600"
                      : "text-red-600"
                  }
                >
                  {product.availabilityStatus}
                </span>
              </span>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
              {product.brand && (
                <span className="text-gray-700">
                  Brand:{" "}
                  <span className="text-black">
                    {product.brand.charAt(0).toUpperCase() +
                      product.brand.slice(1)}
                  </span>
                </span>
              )}

              <span className="text-gray-700">
                Category:{" "}
                <span className="text-green-600">{formattedCategory}</span>
              </span>
            </div>
          </div>

          <div className="text-[#77878F] text-sm">
            <span
              className={`${!showContent ? "line-clamp-1" : "line-clamp-none"}`}
            >
              {product.description}
            </span>
            <span
              onClick={toggleContent}
              className="text-[#209ef2] cursor-pointer ml-1"
            >
              {showContent ? "-show less" : "show more"}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-[#2DA5F3]">
              ${product.price}
            </span>
            <span
              className={`${
                product.discountPercentage < 1 ? "hidden" : "block"
              } text-xs font-semibold px-3 py-1 rounded bg-[#EFD33D]`}
            >
              {Math.floor(product.discountPercentage)}% OFF
            </span>
          </div>

          <div className="border-t border-[#E4E7E9] my-2"></div>

          <div className="flex flex-col lg:flex-row justify-center items-center gap-4">
            <div className="hidden lg:flex border-2 rounded border-[#E4E7E9] px-6 py-2 items-center gap-4">
              <button className="text-xl cursor-pointer" onClick={decrement}>
                -
              </button>
              <span className="text-base text-[#475156]">{count}</span>
              <button className="text-xl cursor-pointer" onClick={increment}>
                +
              </button>
            </div>
            <div className="flex lg:hidden items-center gap-4">
              <span>Quantity: </span>
              <div className="flex items-center gap-4 border-2 rounded border-[#E4E7E9] px-6 py-2">
                <button className="text-xl cursor-pointer" onClick={decrement}>
                  -
                </button>
                <span className="text-base text-[#475156]">{count}</span>
                <button className="text-xl cursor-pointer" onClick={increment}>
                  +
                </button>
              </div>
            </div>

            <div
              className="flex justify-center items-center bg-[#FA8232] border-2 border-[#FA8232] px-6 py-2 gap-2 w-full lg:w-auto rounded text-white cursor-pointer"
              onClick={handleAddToCart}
            >
              <span className="text-xs">
                {isInCart(product) ? "Go to Cart" : "Add to Cart"}
              </span>
              {isInCart(product) ? (
                <BsCartCheck size={24} />
              ) : (
                <FiShoppingCart size={24} />
              )}
            </div>

            <button className="w-full lg:w-auto cursor-pointer px-8 py-2 border-2 border-[#FA8232] text-base text-[#FA8232] rounded">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
