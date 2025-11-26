import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "../Header/Navbar";
import SectionHeader from "../Header/SectionHeader";
import Card from "../Cards/Card";
import { ProductContext } from "../../Context/ProductContext";
import ProductDetails from "../Products/ProductDetails";
import Footer from "../Footer/Footer";

const SearchResults = () => {
  const { query } = useParams();
  const products = useSelector((s) => s.products.wholeProducts);
  const { selectedProduct, setSelectedProduct } = useContext(ProductContext);

  const results = products.filter(
    (p) =>
      p.title?.toLowerCase().includes(query.toLowerCase()) ||
      p.category?.toLowerCase().includes(query.toLowerCase()) ||
      p.tags?.some((tag) => tag?.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <div>
      <Navbar />
      <SectionHeader section={`Search results for ${query}`} />
      {results.length === 0 && <p>No results found.</p>}
      <div
        className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mt-6
        px-4 py-3 gap-6        sm:mx-6 md:mx-10 
        lg:mx-12 xl:mx-24"
      >
        {results.map((p) => (
          <Card product={p} key={p.id} />
        ))}
      </div>
      <ProductDetails
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
      <Footer />
    </div>
  );
};

export default SearchResults;
