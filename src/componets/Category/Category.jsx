import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { LeftArrow, RightArrow } from "../svg/Icons";
import { Link } from "react-router-dom";

const Category = () => {
  const categories = useSelector((state) => state.products.categories);
  const products = useSelector((state) => state.products.items);

  const [currentIdx, setCurrentIdx] = useState(0);

  function useWindowWidth() {
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
      const handleResize = () => setWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    return width;
  }

  const width = useWindowWidth();

  let itemsPerSlide = 6;
  if (width < 1028) itemsPerSlide = 5;
  if (width < 778) itemsPerSlide = 3;
  if (width < 640) itemsPerSlide = 2;

  const totalSlide = Math.ceil(categories?.length / itemsPerSlide);

  const visibleCategories = categories.slice(
    currentIdx * itemsPerSlide,
    currentIdx * itemsPerSlide + itemsPerSlide
  );

  const nextSlide = () => {
    if (currentIdx < totalSlide - 1) {
      setCurrentIdx(currentIdx + 1);
    }
  };

  const prevSlide = () => {
    if (currentIdx > 0) {
      setCurrentIdx(currentIdx - 1);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center px-4 sm:mx-6 md:mx-10 lg:mx-12 xl:mx-24 py-4 sm:my-6 md:my-10 lg:my-12 xl:my-24 gap-y-10">
      <h1 className="head2 font-semibold text-[#191C1F]">Shop With Category</h1>

      <div className="relative w-full z-10">
        <button
          onClick={prevSlide}
          disabled={currentIdx === 0}
          className="absolute -left-5 top-1/2 -translate-y-1/2 bg-[#FA8232] p-2 rounded-full z-50"
        >
          <LeftArrow />
        </button>

        <button
          onClick={nextSlide}
          disabled={currentIdx === totalSlide - 1}
          className="absolute -right-5 top-1/2 -translate-y-1/2 bg-[#FA8232] p-2 rounded-full z-50"
        >
          <RightArrow />
        </button>

        <div className="flex w-full justify-center gap-5 flex-wrap sm:flex-nowrap overflow-hidden">
          {visibleCategories.map((categoryName, index) => {
            const categoryObj = products?.find(
              (item) => item.category === categoryName
            );

            const firstProduct = categoryObj?.products?.[0];

            return (
              <Link to={`/${categoryName}`} key={index}>
                <div
                  key={index}
                  className="flex justify-center items-center flex-col py-3 px-6 border border-[#E4E7E9] hover:drop-shadow-2xl h-[150px] sm:h-[200px]"
                >
                  {firstProduct && (
                    <img
                      src={firstProduct.images[0]}
                      alt={firstProduct.title}
                      className="object-cover h-24 sm:h-36 hover:scale-125 transition-transform duration-300"
                    />
                  )}
                  <span className="mt-2 font-semibold text-center">
                    {categoryName.charAt(0).toUpperCase() +
                      categoryName.slice(1).replace(/-/g," ")}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Category;
