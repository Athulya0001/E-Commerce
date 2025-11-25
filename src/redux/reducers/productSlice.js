import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  categories: [],
  wholeProducts: [],
  searchResults: [],
  wishlist: JSON.parse(localStorage.getItem("wishlist")) || [],
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.items = action.payload;
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
      // console.log(action.payload,"cate");
    },
    setWholeProducts: (state, action) => {
      state.wholeProducts = action.payload;
    },
    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
      // console.log(action.payload);
    },
    setWishlist: (state, action) => {
      const item = action.payload;
      const existing = state.wishlist.find((p) => p?.id === item?.id);

      if (existing) {
        state.wishlist = state.wishlist.filter((p) => p?.id !== item?.id);
      } else {
        state.wishlist.push(item);
      }
      localStorage.setItem("wishlist", JSON.stringify(state.wishlist));
    },
  },
});

export const {
  setProducts,
  setCategories,
  setWholeProducts,
  setSearchResults,
  setWishlist,
} = productSlice.actions;

export default productSlice.reducer;
