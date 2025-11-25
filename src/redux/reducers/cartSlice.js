import { createSlice } from "@reduxjs/toolkit";
import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { toast } from "react-toastify";

const savedCart = JSON.parse(localStorage.getItem("cart")) || [];

const initialState = {
  cartItems: savedCart,
};

const saveToLocalStorage = (cartItems) => {
  localStorage.setItem("cart", JSON.stringify(cartItems));
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      if (item.stock < 1) {
        toast.error("Out of stock!");
        return;
      }
      const existing = state.cartItems.find((p) => p.id === item.id);

      if (existing) {
        const oldCount = existing.count;
        existing.count = Math.min(existing.count + item.count, existing.stock);

        if (existing.count > oldCount) {
          toast.success("Item quantity increased in cart!", {
            icon: () =>
              React.createElement(FaCheckCircle, {
                size: 24,
                color: "#2DA5F3",
              }),
            style: {
              color: "#2DA5F3",
            },
          });
        } else {
          toast.info("Reached maximum stock limit!", {
            style: {
              color: "#2DA5F3",
            },
          });
        }
      } else {
        state.cartItems.push({
          ...item,
          count: Math.min(item.count, item.stock),
        });

        toast.success("Item added to cart", {
          icon: () =>
            React.createElement(FaCheckCircle, { size: 24, color: "#2DA5F3" }),
          style:{
            color:"#2DA5F3"
          }
        });
      }

      saveToLocalStorage(state.cartItems);
    },

    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );

      toast("Item removed from cart.",{
        style:{
          color:"#2DA5F3"
        }
      });

      saveToLocalStorage(state.cartItems);
    },
    increaseQty: (state, action) => {
      const item = state.cartItems.find((p) => p.id === action.payload);
      if (!item) return;

      if (item.count < item.stock) {
        item.count += 1;
      } else {
        toast.info("Reached maximum stock limit!");
      }

      saveToLocalStorage(state.cartItems);
    },

    decreaseQty: (state, action) => {
      const item = state.cartItems.find((p) => p.id === action.payload);
      if (!item) return;

      if (item.count > 1) {
        item.count -= 1;
      } else {
        state.cartItems = state.cartItems.filter(
          (item) => item.id !== action.payload
        );
        toast("Item removed from cart");
      }

      saveToLocalStorage(state.cartItems);
    },

    clearCart: (state) => {
      state.cartItems = [];
      saveToLocalStorage([]);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQty,
  decreaseQty,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
