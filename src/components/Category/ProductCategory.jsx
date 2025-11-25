import React, { useContext } from "react";
import { ProductContext } from "../../Context/ProductContext";
import Navbar from "../Header/Navbar";
import Navigate from "../Header/Navigate";
import { Link, useParams } from "react-router-dom";
import { FiHome } from "react-icons/fi";
import { HiOutlineChevronRight } from "react-icons/hi";
import ProductDetails from "../Products/ProductDetails";
import Footer from "../Footer/Footer";
import Card from "../Cards/Card";
import SectionHeader from "../Header/SectionHeader";

const ProductCategory = ({ products }) => {
  const { selectedProduct, setSelectedProduct } = useContext(ProductContext);
  const { category } = useParams();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Navigate />
      <SectionHeader section={category} />
      <div className="py-4 px-4 my-2 sm:mx-6 md:mx-10 lg:mx-12 xl:mx-24 flex flex-wrap items-center gap-2 text-sm sm:text-base">
        <div key={`cat-${category}`} className="flex flex-col w-full mb-6">
          <h1 className="uppercase font-bold text-lg">
            {category.replace(/-/g, " ")}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mt-6 gap-4">
            {products
              .filter((product) => product.category === category)
              .map((product, ind) => (
                <div key={`${category}-prod-${ind}`}>
                  <Card product={product} key={product} />
                </div>
              ))}
          </div>
        </div>
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

export default ProductCategory;
