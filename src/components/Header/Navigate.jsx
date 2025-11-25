import React from "react";
import { useSelector } from "react-redux";
import { LuMapPin, LuHeadphones, LuInfo } from "react-icons/lu";
import { FiRefreshCw } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

const Navigate = () => {
  const categories = useSelector((state) => state.products.categories);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const selectedCategory = e.target.value;
    if (selectedCategory) {
      navigate(`/category/${selectedCategory}`);
    }else{
      navigate('/allproducts')
    }
  };

  return (
    <div className="shadow-[0_-1px_0_0_#E4E7E9_inset]">
      <div
        className="
        py-4 px-4
        sm:mx-6 md:mx-10 lg:mx-12 xl:mx-24
        flex flex-wrap items-center justify-center md:gap-4 gap-6
        text-sm sm:text-base
      "
      >
        <select
          name="category"
          id="category"
          className="
          bg-[#F2F4F5] py-3 px-4 sm:px-6 
          head5 rounded hidden lg:block
          w-full md:w-auto
        "
          onChange={handleChange}
        >
          <option value="">All Products</option>
          {categories.map((item, index) => (
            <option value={item} key={index} className="uppercase">
              {item.charAt(0).toUpperCase() + item.slice(1).replace(/-/g, " ")}
            </option>
          ))}
        </select>

        <div className="hidden lg:flex items-center gap-6 flex-wrap">
          <div className="flex items-center gap-1.5 cursor-pointer">
            <LuMapPin />
            <span className="text-[#5F6C72] head5">Track Order</span>
          </div>

          <div className="flex items-center gap-1.5 cursor-pointer">
            <FiRefreshCw />
            <span className="text-[#5F6C72] head5">Compare</span>
          </div>

          <div className="flex items-center gap-1.5 cursor-pointer">
            <LuHeadphones />
            <span className="text-[#5F6C72] head5">Customer Support</span>
          </div>

          <div className="flex items-center gap-1.5 cursor-pointer">
            <LuInfo />
            <span className="text-[#5F6C72] head5">Need Help</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigate;
