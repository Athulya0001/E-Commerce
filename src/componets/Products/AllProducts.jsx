import React, { useContext, useState } from "react";
import Navbar from "../Header/Navbar";
import Navigate from "../Header/Navigate";
import { Link } from "react-router-dom";
import { FiHome } from "react-icons/fi";
import { HiOutlineChevronRight } from "react-icons/hi";
import Footer from "../Footer/Footer";
import { useSelector } from "react-redux";
import ProductCard from "../Cards/ProductCard";
import { ProductContext } from "../../Context/ProductContext";
import ProductDetails from "./ProductDetails";
import ItemCard from "../Cards/ItemCard";
import SectionHeader from "../Header/SectionHeader";

const AllProducts = ({ products }) => {
  const { selectedProduct, setSelectedProduct } = useContext(ProductContext);
  const categories = useSelector((state) => state.products.categories);
  const [expanded, setExpanded] = useState({});

  const toggleCategory = (cat) => {
    setExpanded((prev) => ({
      ...prev,
      [cat]: !prev[cat],
    }));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Navigate />
      <SectionHeader section={"All Products"} />
      <div className="py-4 px-4 my-2 sm:mx-6 md:mx-10 lg:mx-12 xl:mx-24 flex flex-wrap items-center gap-2 text-sm sm:text-base">
        {categories.map((item, index) => {
          const filteredProducts = products.filter(
            (product) => product.category === category
          );

          const isExpanded = expanded[category];
          return (
            <div
              key={`cat-${category}-${index}`}
              className="flex flex-col justify-center items-center w-full mb-6 "
            >
              <h1 className="uppercase font-bold text-center sm:text-start w-full text-lg">
                {item.replace(/-/g, " ")}
              </h1>

              <div className="flex line-clamp-1 flex-col sm:flex-row sm:flex-wrap gap-4 mt-3">
                {products
                  .filter((product) => product.category === item)
                  .map((product, ind) => (
                    <div key={`${item}-prod-${ind}`}>
                      <ItemCard product={product} />
                    </div>
                  ))}
              </div>
            </div>
          );
        })}
      </div>
      {selectedProduct && (
        <ProductDetails
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
      <Footer />
    </div>
  );
};

export default AllProducts;
