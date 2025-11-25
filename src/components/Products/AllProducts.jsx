import React, { useContext, useState } from "react";
import Navbar from "../Header/Navbar";
import Navigate from "../Header/Navigate";
import Footer from "../Footer/Footer";
import { useSelector } from "react-redux";
import { ProductContext } from "../../Context/ProductContext";
import ProductDetails from "./ProductDetails";
import SectionHeader from "../Header/SectionHeader";
import Card from "../Cards/Card";

const AllProducts = ({ products }) => {
  const { selectedProduct, setSelectedProduct } = useContext(ProductContext);
  const categories = useSelector((state) => state.products.categories);
  // const [expanded, setExpanded] = useState({});

  // const toggleCategory = (cat) => {
  //   setExpanded((prev) => ({
  //     ...prev,
  //     [cat]: !prev[cat],
  //   }));
  // };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Navigate />
      <SectionHeader section={"All Products"} />
      <div className="py-4 px-4 my-2 sm:mx-6 md:mx-10 lg:mx-12 xl:mx-24 flex flex-wrap items-center gap-2 text-sm sm:text-base">
        {categories.map((item, index) => {

          return (
            <div
              key={`cat-${item}-${index}`}
              className="flex flex-col justify-center items-center w-full mb-6 "
            >
              <h1 className="uppercase font-bold text-center sm:text-start w-full text-lg">
                {item.replace(/-/g, " ")}
              </h1>

              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mt-6 gap-4">
                {products
                  .filter((product) => product.category === item)
                  .map((product, ind) => (
                    <div key={`${item}-prod-${ind}`}>
                      <Card product={product} key={product.id}/>
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
