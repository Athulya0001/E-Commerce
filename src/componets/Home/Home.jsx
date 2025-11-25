import React, { useContext } from "react";
import Header from "../Header/Header";
import Navbar from "../Header/Navbar";
import Navigate from "../Header/Navigate";
import BestDeals from "../Products/BestDeals";
import Category from "../Category/Category";
import Products from "../Products/Products";
import Footer from "../Footer/Footer";
import ProductDetails from "../Products/ProductDetails";
import { ProductContext } from "../../Context/ProductContext";

const Home = () => {
  const { selectedProduct, setSelectedProduct } = useContext(ProductContext);

  return (
    <div>
      <Header />
      <Navbar />
      <Navigate />
      <BestDeals />
      <ProductDetails
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
      <Category />
      <Products />
      <Footer />
    </div>
  );
};

export default Home;
