import React, { useContext } from "react";
import ProductCard from "../Cards/ProductCard";
import Navbar from "../Header/Navbar";
import { Link } from "react-router-dom";
import { FiHome } from "react-icons/fi";
import { HiOutlineChevronRight } from "react-icons/hi";
import ProductDetails from "../Products/ProductDetails";
import Footer from "../Footer/Footer";
import { ProductContext } from "../../Context/ProductContext";
import ItemCard from "../Cards/ItemCard";
import { useSelector } from "react-redux";
import SectionHeader from "../Header/SectionHeader";
import Navigate from "../Header/Navigate";

const Wishlist = ({ wishlist }) => {
  const { selectedProduct, setSelectedProduct } = useContext(ProductContext);
  const wishlists = useSelector((state) => state.products.wishlist);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Navigate />
      <SectionHeader section={"Wishlist"}/>
      {wishlists.length === 0 ? (
        <div>
          <p className="text-center text-gray-600 head5">
            Your wishlist is empty!!{" "}
            <a href="/" className="text-[#538eb2] hover:text[#007acc]">
              List your favorites
            </a>
          </p>
        </div>
      ) : (
        <div className="py-4 px-4 my-2 sm:mx-6 md:mx-10 lg:mx-12 xl:mx-24 flex flex-wrap items-center gap-2 text-sm sm:text-base">
          {wishlist.map((product) => (
            <ItemCard product={product} key={product.id} />
          ))}
        </div>
      )}
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

export default Wishlist;
