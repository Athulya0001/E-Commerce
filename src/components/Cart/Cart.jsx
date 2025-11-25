import React from "react";
import Navbar from "../Header/Navbar";
import Navigate from "../Header/Navigate";
import Footer from "../Footer/Footer";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import CartRow from "./CartRow";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearCart } from "../../redux/reducers/cartSlice";
import {
  removeFromCart,
  increaseQty,
  decreaseQty,
} from "../../redux/reducers/cartSlice";
import SectionHeader from "../Header/SectionHeader";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.count,
    0
  );
  const discount = cartItems.reduce(
    (sum, item) =>
      sum + (item.price * item.count * (item.discountPercentage || 0)) / 100,
    0
  );
  const tax = 25;
  const total = subtotal - discount + tax;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Navigate />

      <SectionHeader section={"Shopping Cart"} />

      <div className="px-4 sm:px-6 md:px-10 lg:px-12 xl:px-24 py-4 flex flex-col gap-6 flex-1">
        {cartItems.length === 0 ? (
          <p className="text-center text-gray-600 head5">
            Your cart is empty!!{" "}
            <a href="/" className="text-[#538eb2] hover:text[#007acc]">
              Add Items To your cart.
            </a>
          </p>
        ) : (
          <div className="flex flex-col lg:flex-row gap-10">
            <div className="w-full lg:w-2/3 border border-[#E4E7E9] py-4 rounded-md">
              <h1 className="text-[#191C1F] px-4 sm:px-6 font-medium text-lg mb-4">
                Shopping Cart
              </h1>

              <div className="hidden lg:block">
                <table className="w-full border-collapse text-left">
                  <thead>
                    <tr className="bg-[#F2F4F5] border border-[#E4E7E9] text-[#5F6C72] text-sm">
                      <th className="py-2.5 px-6 uppercase font-medium">
                        Product
                      </th>
                      <th className="py-2.5 px-6 uppercase font-medium">
                        Price
                      </th>
                      <th className="py-2.5 px-6 uppercase font-medium">
                        Quantity
                      </th>
                      <th className="py-2.5 px-6 uppercase font-medium">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => (
                      <CartRow key={item.id} product={item} />
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex flex-col gap-4 lg:hidden px-4 sm:px-6">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col border border-[#E4E7E9] rounded-md p-3 gap-2"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-[#191C1F]">
                        {item.title}
                      </span>
                      <span className="font-semibold text-[#191C1F]">
                        ${(item.price * item.count).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#5F6C72] text-sm">Price:</span>
                      <span className="text-[#191C1F]">
                        ${item.price.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#5F6C72] text-sm">Quantity:</span>
                      <div className="flex items-center border rounded px-2 py-1 gap-2">
                        <button
                          onClick={() => dispatch(decreaseQty(item.id))}
                          className="text-base"
                        >
                          -
                        </button>
                        <span className="text-base text-[#191C1F]">
                          {item.count}
                        </span>
                        <button
                          onClick={() => dispatch(increaseQty(item.id))}
                          disabled={item.count >= item.stock}
                          className="text-base"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div
                      className="w-full flex justify-center items-center border border-[#FA8232] bg-[#FA8232] py-2 rounded text-white hover:bg-white hover:text-[#FA8232] cursor-pointer"
                      onClick={() => dispatch(removeFromCart(item.id))}
                    >
                      Remove Item
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col md:flex-row justify-between border-t border-[#E4E7E9] items-center px-4 sm:px-6 py-4 pt-8 gap-4">
                <Link to="/" className="w-full md:w-auto">
                  <div className="flex justify-center items-center gap-2 uppercase text-sm text-[#2DA5F3] font-bold py-3 px-6 border border-[#2DA5F3] w-full md:w-auto">
                    <FiArrowLeft color="#2DA5F3" size={20} />
                    <span>Return To Shop</span>
                  </div>
                </Link>

                <button className="flex justify-center items-center gap-2 uppercase text-sm text-[#2DA5F3] font-bold py-3 px-6 border border-[#2DA5F3] w-full md:w-auto">
                  <span>Update Cart</span>
                </button>
              </div>
            </div>

            <div className="w-full lg:w-1/3 border border-[#E4E7E9] px-4 sm:px-6 py-5 rounded-md flex flex-col gap-5">
              <h1 className="text-lg font-medium text-[#191C1F]">Cart Total</h1>
              <div className="flex flex-col gap-4">
                <div className="flex justify-between text-sm">
                  <span className="text-[#5F6C72]">Subtotal</span>
                  <span className="font-medium text-[#191C1F]">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#5F6C72]">Shipping</span>
                  <span className="font-medium text-[#191C1F]">Free</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#5F6C72]">Discount</span>
                  <span className="font-medium text-[#191C1F]">
                    ${discount.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#5F6C72]">Tax</span>
                  <span className="font-medium text-[#191C1F]">
                    ${tax.toFixed(2)}
                  </span>
                </div>
                <div className="w-full border border-[#E4E7E9]"></div>
                <div className="flex justify-between text-base text-[#191C1F]">
                  <span>Total</span>
                  <span className="font-bold">${total.toFixed(2)}</span>
                </div>
                <button
                  className="px-8 py-4 uppercase text-white font-bold border border-[#FA8232] bg-[#FA8232] flex justify-center items-center gap-3 hover:bg-white hover:text-[#FA8232]"
                  onClick={() => dispatch(clearCart())}
                >
                  Proceed to pay <FiArrowRight size={24} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Cart;
