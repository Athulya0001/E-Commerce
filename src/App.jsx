import { useState, useEffect } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Cart from "./components/Cart/Cart";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import {
  setCategories,
  setProducts,
  setWholeProducts,
} from "./redux/reducers/productSlice";
import AllProducts from "./components/Products/AllProducts";
import ProductCategory from "./components/Category/ProductCategory";
import Wishlist from "./components/Wishlist/Wishlist";
import SearchResults from "./components/Search/SearchResults";

const App = () => {
  const dispatch = useDispatch();
  const wholeProducts = useSelector((state) => state.products.wholeProducts);
  const wishlist = useSelector((state) => state.products.wishlist);

  const selectedCategories = [
    "beauty",
    "fragrances",
    "skin-care",
    "womens-jewellery",
    "sunglasses",
    "womens-shoes",
    "mens-shoes",
    "womens-bags",
    "womens-dresses",
    "tops",
    "mens-shirts",
    "womens-watches",
    "mens-watches",
    "sports-accessories",
    "smartphones",
    "laptops",
    "mobile-accessories",
    "tablets",
    "motorcycle",
    "vehicle",
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
      <ToastContainer autoClose={1000} hideProgressBar={true} />
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
        <Route path="/search/:query" element={<SearchResults />} />
        <Route path="/wishlist" element={<Wishlist wishlist={wishlist} />} />
      </Routes>
    </div>
  );
};

export default App;
