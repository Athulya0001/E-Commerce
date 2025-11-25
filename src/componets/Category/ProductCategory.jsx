import React, { useContext } from "react";
import { ProductContext } from "../../Context/ProductContext";
import Navbar from "../Header/Navbar";
import Navigate from "../Header/Navigate";
import { Link } from "react-router-dom";
import { FiHome } from "react-icons/fi";
import { HiOutlineChevronRight } from "react-icons/hi";
import ProductDetails from "../Products/ProductDetails";
import Footer from "../Footer/Footer";
import ItemCard from "../Cards/ItemCard";

const ProductCategory = ({ category,products }) => {
  const { selectedProduct, setSelectedProduct } = useContext(ProductContext);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Navigate />
      <div className="bg-[#F2F4F5] my-3 mt-10">
        <div className="py-4 px-4 my-2 sm:mx-6 md:mx-10 lg:mx-12 xl:mx-24 flex flex-wrap items-center gap-2 text-sm sm:text-base">
          <Link to={"/"} className="flex justify-center items-center gap-2">
            <FiHome />
            <span className="text-[#5F6C72] head5">Home</span>
          </Link>
          <HiOutlineChevronRight size={15} color="#77878F" />
          <span className="text-[#2DA5F3] head5 uppercase">{category}</span>
        </div>
      </div>
      <div className="py-4 px-4 my-2 sm:mx-6 md:mx-10 lg:mx-12 xl:mx-24 flex flex-wrap items-center gap-2 text-sm sm:text-base">
        <div
          key={`cat-${category}`}
          className="flex flex-col w-full mb-6"
        >
          <h1 className="uppercase font-bold text-lg">
            {category.replace(/-/g, " ")}
          </h1>

          <div className="flex items-center flex-wrap gap-4 mt-3">
            {products
              .filter((product) => product.category === category)
              .map((product, ind) => (
                <div key={`${category}-prod-${ind}`}>
                  <ItemCard product={product} />
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
