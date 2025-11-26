import React, { useContext, useEffect, useMemo, useState } from "react";
import Timer from "../Timer/Timer";
import { useDispatch, useSelector } from "react-redux";
import Rating from "../Rating/Rating";
import { FiHeart, FiShoppingCart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import { BrowseArrow } from "../svg/Icons";
import { ProductContext } from "../../Context/ProductContext";
import { addToCart } from "../../redux/reducers/cartSlice";
import { BsCartCheck } from "react-icons/bs";
import Card from "../Cards/Card";

const BestDeals = () => {
  const { setSelectedProduct, toggleWishlist, isInCart, isInWish } =
    useContext(ProductContext);
  const targetDate = "2025-12-11T20:00:00";
  const products = useSelector((state) => state.products?.items);
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart({ ...product, count: 1 }));
  };

  const useWindowWidth = () => {
    const [width, setWidth] = useState(window.innerWidth);
    useEffect(() => {
      const handleResize = () => setWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);
    return width;
  };

  const width = useWindowWidth();

  const count = useMemo(() => {
    if (width >= 1280) return 8;
    if (width >= 1020) return 6;
    return 4;
  }, [width]);

  const { featuredProduct, otherRandomProducts } = useMemo(() => {
    if (!products?.length)
      return { featuredProduct: null, otherRandomProducts: [] };

    const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

    const featuredCategory = products[5]?.products || [];

    const highRatedProducts = featuredCategory.filter((p) => p.rating > 4.9);
    const featured = highRatedProducts[0];

    const getRandomProducts = (allCategories, n) => {
      const shuffledCategories = shuffle(allCategories).slice(0, n);
      return shuffledCategories
        .map((cat) => {
          const items = cat.products;
          if (!items || items.length === 0) return null;
          const randomProduct = items[Math.floor(Math.random() * items.length)];
          return { ...randomProduct, category: cat.category };
        })
        .filter(Boolean);
    };

    const otherRandom = getRandomProducts(products, count);

    return { featuredProduct: featured, otherRandomProducts: otherRandom };
  }, [products, count]);

  return (
    <div className="my-10 sm:my-14 lg:my-16 py-3 px-3 sm:px-6 md:px-10 lg:px-12 xl:px-24">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <span className="font-semibold head3 text-[#191C1F] text-xl sm:text-2xl">
            Best Deals
          </span>

          <div className="flex items-center gap-3">
            <span className="head5 font-normal text-sm sm:text-base">
              Deals ends in
            </span>
            <Timer targetDate={targetDate} />
          </div>
        </div>

        <Link to={"/allproducts"}>
          <div className="flex items-center gap-2 cursor-pointer">
            <span className="font-semibold head5 text-[#2DA5F3] text-sm sm:text-base">
              Browse All Products
            </span>
            <BrowseArrow color={"#2DA5F3"} />
          </div>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mt-6">
        {featuredProduct && (
          <div className="relative p-3 border border-[#E4E7E9] row-span-1 sm:row-span-2 flex flex-col cursor-pointer">
            {featuredProduct?.rating > 4.5 && (
              <span className="absolute top-2 left-2 bg-red-500 text-white text-xs sm:text-[11px] font-semibold px-2.5 py-1.5 rounded-xs z-10">
                HOT
              </span>
            )}

            {featuredProduct?.discountPercentage > 18 && (
              <span className="absolute top-10 left-2 bg-[#EFD33D] text-xs font-semibold px-2.5 py-1.5 rounded-xs z-10">
                {Math.floor(featuredProduct?.discountPercentage)}% OFF
              </span>
            )}

            <img
              src={featuredProduct?.images[0]}
              alt={featuredProduct?.name}
              className="w-full h-60 sm:h-64 object-cover transition-transform duration-300 hover:scale-110"
            />

            <Rating
              rating={featuredProduct?.rating}
              reviews={featuredProduct?.stock}
            />

            <h3 className="head4 text-[#5F6C72] font-normal my-2 text-sm sm:text-base line-clamp-2">
              {featuredProduct?.title}
            </h3>

            <span className="font-semibold text-[#2DA5F3] text-xl my-2">
              <span className="text-base text-[#a19e9e] line-through">
                ${featuredProduct?.price}
              </span>{" "}
              $
              {(
                featuredProduct?.price *
                (1 - featuredProduct.discountPercentage / 100)
              ).toFixed(2)}
            </span>

            <p className="text-[#5F6C72] text-sm line-clamp-5 my-2">
              {featuredProduct?.description}
            </p>

            <div className="flex justify-between items-center gap-2 mt-auto">
              <div
                className="p-2 bg-[#FFE7D6] cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleWishlist(featuredProduct);
                }}
              >
                {isInWish(featuredProduct) ? (
                  <FaHeart size={22} color="red" />
                ) : (
                  <FiHeart size={22} className="text-current" />
                )}
              </div>

              <Link
                to={isInCart(featuredProduct) ? "/cart" : "#"}
                onClick={(e) => {
                  e.stopPropagation();

                  if (!isInCart(featuredProduct)) {
                    handleAddToCart(featuredProduct);
                  }
                }}
              >
                <div className="flex justify-center items-center bg-[#FA8232] px-6 py-2 gap-2 w-full">
                  {isInCart(featuredProduct) ? (
                    <BsCartCheck size={22} color="white" />
                  ) : (
                    <FiShoppingCart size={22} color="white" />
                  )}

                  <span className="text-xs text-white">
                    {isInCart(featuredProduct) ? "Go to Cart" : "Add to cart"}
                  </span>
                </div>
              </Link>

              <div
                className="p-2 bg-[#FFE7D6] cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedProduct(featuredProduct);
                }}
              >
                <AiOutlineEye size={22} />
              </div>
            </div>
          </div>
        )}

        {otherRandomProducts?.length > 0 &&
          otherRandomProducts.map((product, idx) => {
            return <Card product={product} key={idx} />;
          })}
      </div>
    </div>
  );
};

export default BestDeals;
