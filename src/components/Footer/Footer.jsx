import React from "react";
import { BrowseArrow, Divider, Logo } from "../svg/Icons";
import { useSelector } from "react-redux";
import { SiGoogleplay } from "react-icons/si";
import { FaApple } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Footer = () => {
  const categories = useSelector((state) => state.products.categories);
  const navigate = useNavigate();
  const handleNavigate = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const tags = [
    "Game",
    "iPhone",
    "TV",
    "Asus Laptops",
    "MacBook",
    "SSD",
    "Graphic Card",
    "Power Bank",
    "Smart TV",
    "Speaker",
    "Tablet",
    "Microwave",
    "Samsung",
  ];
  return (
    <div className="bg-[#191C1F] py-6 sm:mt-6 md:mt-10 lg:mt-12 xl:mt-24">
      <div className="flex flex-col sm:flex-wrap sm:flex-row justify-center px-4 gap-10 sm:mx-6 md:mx-10 lg:mx-12 xl:mx-24 sm:my-4 md:my-6 lg:my-8 xl:my-16">
        <div className="flex flex-col gap-6 flex-1 min-w-[250px]">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <Logo color={"#FA8232"} />
            <span className="font-bold text-white text-xl lg:text-2xl">
              CLICON
            </span>
          </div>
          <div>
            <span className="text-[#77878F] head5">Customer Supports:</span>
            <span className="text-white text-lg block">(629) 555-0129</span>
          </div>
          <span className="text-[#77878F] text-base flex flex-col">
            <span>4517 Washington Ave.</span>
            <span>Manchester, Kentucky 39495</span>
          </span>
          <span className="text-white text-base">info@kinbo.com</span>
        </div>

        <div className="flex flex-col gap-6 flex-1 min-w-[200px]">
          <h1 className="uppercase text-white text-base">Top category</h1>
          <ul className="text-[#929FA5] head5 flex flex-col gap-3">
            <li className="listHover">Computer & Laptop</li>
            <li className="listHover">SmartPhone</li>
            <li className="listHover">Headphone</li>
            <li className="flex items-center gap-2 text-white">
              <Divider color={"#EBC80C"} /> Accessories
            </li>
            <li className="listHover">Camera & Photo</li>
            <li className="listHover">TV & Homes</li>
            <Link to={"/allproducts"}>
              <li className="text-[#EBC80C] flex items-center gap-2">
                Browse All Product <BrowseArrow color={"#EBC80C"} />
              </li>
            </Link>
          </ul>
        </div>

        <div className="flex flex-col gap-6 flex-1 min-w-[200px]">
          <h1 className="uppercase text-white text-base">Quick links</h1>
          <ul className="text-[#929FA5] head5 flex flex-col gap-3">
            <li className="listHover" onClick={() => handleNavigate("/")}>
              Shop Product
            </li>
            <li className="listHover" onClick={() => handleNavigate("/cart")}>
              Shopping Cart
            </li>
            <li
              className="listHover"
              onClick={() => handleNavigate("/wishlist")}
            >
              Wishlist
            </li>
            <li className="listHover">Compare</li>
            <li className="listHover">Track Order</li>
            <li className="listHover">Customer Help</li>
            <li className="listHover">About Us</li>
          </ul>
        </div>

        <div className="flex flex-col text-white gap-6 flex-1 min-w-[200px]">
          <h1 className="uppercase text-base">Download App</h1>
          <div className="flex justify-start items-center py-4 px-5 bg-[#303639] gap-4 rounded-md cursor-pointer">
            <SiGoogleplay size={"32px"} color="white" />
            <div className="flex flex-col gap-1">
              <span className="text-[11px]">Get it now</span>
              <span className="font-semibold head5">Google Play</span>
            </div>
          </div>
          <div className="flex justify-start items-center py-4 px-5 bg-[#303639] gap-4 rounded-md cursor-pointer">
            <FaApple size={"32px"} color="white" />
            <div className="flex flex-col gap-1">
              <span className="text-[11px]">Get it now</span>
              <span className="font-semibold head5">Apple Store</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col text-white gap-6 flex-1 min-w-[200px]">
          <h1 className="uppercase text-base">Popular Tag</h1>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <div
                key={index}
                className="py-1.5 px-3 text-white border border-[#303639] shadow-[0px_1px_0px_0px_#303639_inset] head5 hover:border-white hover:bg-[#303639] cursor-pointer rounded"
              >
                {tag}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="shadow-[0px_1px_0px_0px_#303639_inset] mt-6">
        <div className="sm:mx-6 md:mx-10 lg:mx-12 xl:mx-24 flex justify-center items-center p-6 text-center">
          <span className="text-[#ADB7BC] head5">
            Kinbo - eCommerce Template © 2021. Design by Templatecookie
          </span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
