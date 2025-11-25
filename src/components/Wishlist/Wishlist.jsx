import React, { useContext } from "react";
import Navbar from "../Header/Navbar";
import ProductDetails from "../Products/ProductDetails";
import Footer from "../Footer/Footer";
import { ProductContext } from "../../Context/ProductContext";
import { useSelector } from "react-redux";
import SectionHeader from "../Header/SectionHeader";
import Navigate from "../Header/Navigate";
import Card from "../Cards/Card";

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
        <div className="py-4 px-4 my-2 sm:mx-6 md:mx-10 lg:mx-12 xl:mx-24 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mt-6 gap-4 text-sm sm:text-base">
          {wishlist.map((product) => (
            <Card product={product} key={product.id} />
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
