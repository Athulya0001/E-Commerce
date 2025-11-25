import { useState, useEffect } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./componets/Home/Home";
import Cart from "./componets/Cart/Cart";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import {
  setCategories,
  setProducts,
  setWholeProducts,
} from "./redux/reducers/productSlice";
import AllProducts from "./componets/Products/AllProducts";
import ProductCategory from "./componets/Category/ProductCategory";
import Wishlist from "./componets/Wishlist/Wishlist";

const App = () => {
  const dispatch = useDispatch();
  const wholeProducts = useSelector((state) => state.products.wholeProducts);
  const wishlist = useSelector((state) => state.products.wishlist);

  const selectedCategories = [
    "smartphones",
    "laptops",
    "mobile-accessories",
    "tablets",
    "motorcycle",
    "vehicle",
    "mens-watches",
    "sports-accessories",
    "womens-bags",
    "mens-shoes",
    "womens-jewellery",
    "womens-shoes",
    "mens-shirts",
    "womens-watches",
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        dispatch(setCategories(selectedCategories));

        const productsByCategory = await Promise.all(
          selectedCategories.map(async (cat) => {
            const response = await axios.get(
              `https://dummyjson.com/products/category/${cat}`
            );
            return {
              category: cat,
              products: response.data.products || [],
            };
          })
        );

        dispatch(setProducts(productsByCategory));

        const wholeProducts = productsByCategory.flatMap(
          (category) => category.products || []
        );

        dispatch(setWholeProducts(wholeProducts));
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [dispatch]);

  return (
    <div>
      <ToastContainer autoClose={1000} hideProgressBar={true}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route
          path="/allproducts"
          element={<AllProducts products={wholeProducts} />}
        />
        {selectedCategories.map((category) => (
          <Route
            key={category}
            path={`/${category}`}
            element={
              <ProductCategory category={category} products={wholeProducts} />
            }
          />
        ))}
        <Route path="/wishlist" element={<Wishlist wishlist={wishlist} />} />
      </Routes>
    </div>
  );
};

export default App;
