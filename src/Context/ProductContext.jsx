import { createContext, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setWishlist } from "../redux/reducers/productSlice";
import { toast } from "react-toastify";
import { FaCheckCircle } from "react-icons/fa";
import { addToCart } from "../redux/reducers/cartSlice";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const isInCart = (product) => {
    return cartItems.find((p) => p?.id === product?.id);
  };

  const wishlist = useSelector((state) => state.products.wishlist);
  const isInWish = (product) => {
    return wishlist.find((p) => p?.id === product?.id);
  };
  const dispatch = useDispatch();
  const [selectedProduct, setSelectedProduct] = useState(null);

  const toggleWishlist = (product) => {
    const inWish = isInWish(product);

    dispatch(setWishlist(product));

    if (inWish) {
      toast("Removed from wishlist");
    } else {
      toast.success("Added to wishlist", {
        icon: <FaCheckCircle size={24} color="#2DA5F3" />,
      });
    }
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart({ ...product, count: 1 }));
    
  };

  return (
    <ProductContext.Provider
      value={{
        selectedProduct,
        setSelectedProduct,
        toggleWishlist,
        isInCart,
        isInWish,
        handleAddToCart
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
