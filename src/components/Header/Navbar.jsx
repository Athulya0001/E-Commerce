import React, { useEffect, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { CartIcon, WishIcon, UserIcon, Logo } from "../svg/Icons";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setSearchResults } from "../../redux/reducers/productSlice";
import Search from "../Search/Search";

const Navbar = () => {
  const products = useSelector((state) => state.products.wholeProducts);
  const searchResults = useSelector((state) => state.products.searchResults);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const cartItems = useSelector((state) => state.cart.cartItems);
  const wishlist = useSelector((state) => state.products.wishlist);
  const wishlistCount = wishlist?.length;
  // const cartCount = cartItems.reduce((sum, item) => sum + item.count, 0);
  const cartCount = cartItems?.length;

  const handleEnter = () => {
    navigate(`/search/${searchQuery}`);
    setSearchQuery("");
    dispatch(setSearchResults([]));
  };

  useEffect(() => {
    if (searchQuery.length >= 3) {
      const lowerQuery = searchQuery.toLowerCase();

      const filtered = products.filter((p) => {
        const titleMatch = p.title?.toLowerCase().includes(lowerQuery);

        const categoryMatch = p.category?.toLowerCase().startsWith(lowerQuery);

        const tagMatch = p.tags?.some((tag) =>
          tag?.toLowerCase().includes(lowerQuery)
        );

        return titleMatch || categoryMatch || tagMatch;
      });

      dispatch(setSearchResults(filtered));
    } else {
      dispatch(setSearchResults([]));
    }
  }, [searchQuery, products, dispatch]);

  return (
    <div className="bg-[#1B6392] text-white sticky top-0 z-50">
      <nav
        className="
          px-4 py-3 
          sm:mx-6 md:mx-10 
          lg:mx-12 xl:mx-24
          flex flex-col gap-4
          lg:flex-row lg:justify-between lg:items-center
        "
      >
        <div className="flex items-center justify-between w-full lg:w-auto">
          <div
            className="flex items-center gap-2"
            id="logo"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <Logo color="white" />
            <span className="font-bold text-xl lg:text-2xl">CLICON</span>
          </div>

          <div className="flex items-center gap-4 lg:hidden">
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="text-2xl"
            >
              <FaSearch />
            </button>

            <button
              className="text-white text-3xl"
              onClick={() => setOpen(true)}
            >
              <FiMenu />
            </button>
          </div>
        </div>

        {showSearch && (
          <div className="relative lg:hidden flex-col w-full animate-fade-down">
            <input
              type="text"
              placeholder="Search for anything..."
              className="
                w-full bg-white rounded-xs py-2 pl-4 pr-10
                text-gray-800 placeholder-gray-500
                focus:outline-none
              "
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleEnter();
                }
              }}
            />
            {searchResults.length > 0 && (
              <div className="absolute mt-10 w-full bg-white shadow-lg rounded-md max-h-70 overflow-y-auto z-50">
                {searchResults.map((product, index) => (
                  <Search
                    product={product}
                    key={index}
                    setSearchQuery={setSearchQuery}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        <div className="relative hidden lg:flex flex-col w-full max-w-md mx-auto lg:mx-0">
          <div className="relative flex">
            <input
              type="text"
              placeholder="Search for anything..."
              className="w-full bg-white rounded-xs py-2 pl-4 pr-10 text-gray-800 placeholder-gray-500 focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleEnter();
                }
              }}
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500">
              <FaSearch />
            </div>
          </div>

          {searchResults.length > 0 && (
            <div className="absolute mt-10 w-full bg-white shadow-lg rounded-md max-h-70 overflow-y-auto z-50">
              {searchResults.map((product, index) => (
                <Search
                  product={product}
                  key={index}
                  setSearchQuery={setSearchQuery}
                />
              ))}
            </div>
          )}
        </div>

        <div className="hidden lg:flex items-center gap-8">
          <Link to="/cart" className="relative">
            <CartIcon />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-white text-black text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
          <Link to="/wishlist" className="relative">
            <WishIcon />
            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-white text-black text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </Link>
          <Link to="/profile">
            <UserIcon />
          </Link>
        </div>

        {open && (
          <div className="fixed inset-0 flex justify-end z-50">
            <div
              className="bg-black/40 w-full h-full"
              onClick={() => setOpen(false)}
            />

            <div
              className="
              bg-[#1B6392] text-white 
              w-60 h-full p-5 
              animate-slide-left
            "
            >
              <div className="flex justify-end mb-6">
                <button onClick={() => setOpen(false)} className="text-3xl">
                  <FiX />
                </button>
              </div>

              <div className="flex flex-col gap-4 mb-8 items-center">
                <Link className="menu-item-mobile" to="/cart">
                  Cart
                </Link>
                <Link className="menu-item-mobile" to="/wishlist">
                  Wishlist
                </Link>
                <Link className="menu-item-mobile" to="/profile">
                  Profile
                </Link>
              </div>

              <div className="flex flex-col gap-4 items-center">
                <Link className="menu-item-mobile">Track Order</Link>
                <Link className="menu-item-mobile">Compare</Link>
                <Link className="menu-item-mobile">Customer Support</Link>
                <Link className="menu-item-mobile">Need Help</Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
