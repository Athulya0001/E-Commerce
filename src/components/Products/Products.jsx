import React from "react";
import { useSelector } from "react-redux";
import ProductCard from "../Cards/ProductCard";

const Products = () => {
  const products = useSelector((state) => state.products?.items);

  const wholeProducts = [];
  products.forEach((category) => {
    if (category.products?.length) wholeProducts.push(...category.products);
  });

  // const getRandomItems = (arr, n) => {
  //   const shuffled = [...arr].sort(() => 0.5 - Math.random());
  //   return shuffled.slice(0, n);
  // };

  const flashSale = wholeProducts.filter((product) => product.stock < 2);
  const bestSellar = wholeProducts.filter(
    (product) => product.discountPercentage > 19
  );
  const topRated = wholeProducts.filter((product) => product.rating > 4.95);
  const newArrivals = wholeProducts.filter((product) => product.stock > 90);

  const CategorySection = ({ title, items }) => (
    <div className="flex flex-col gap-4 w-full">
      <h2 className="uppercase text-base font-semibold text-[#191C1F]">
        {title}
      </h2>

      <div className="flex flex-row sm:flex-col gap-3 overflow-x-auto sm:overflow-x-visible scrollbar-hide">
        {items.slice(0, 3).map((product, idx) => (
          <div key={idx} className="min-w-[200px] sm:min-w-full">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 sm:px-6 md:px-10 lg:px-12 xl:px-24 py-6">
      <CategorySection title="Flash Sale Today" items={flashSale.slice(0, 3)} />
      <CategorySection title="Best Seller" items={bestSellar.slice(0, 3)} />
      <CategorySection title="Top Rated" items={topRated.slice(0, 3)} />
      <CategorySection title="New Arrival" items={newArrivals.slice(0, 3)} />
    </div>
  );
};

export default Products;
