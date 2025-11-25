import React, { useState } from "react";
import {
  Close,
  Dropdown,
  Facebook,
  Instagram,
  Line,
  Pinterest,
  Reddit,
  Twitter,
  Youtube,
} from "../svg/Icons";

const Header = () => {
  const [showBanner, setShowBanner] = useState(true);
  return (
    <div className="text-white w-full hidden lg:block ">
      {showBanner && (
        <div className="bg-[#191C1F] relative">
          <div className="flex gap-4 px-4 py-4 sm:mx-6 md:mx-10 justify-between items-center lg:mx-12 lg:py-3 xl:mx-24">
            <div className="flex items-center gap-3 font-semibold text-lg md:text-base">
              <div className="bg-[#F3DE6D] text-[#191C1F] font-semibold px-3 py-1 -rotate-3">
                Black
              </div>
              Friday
            </div>

            <div className="hidden md:flex items-center gap-2 text-center justify-center md:justify-start">
              <span className="head5 font-medium">Up to</span>
              <span className="text-[#EBC80C] d4 font-semibold">59%</span>
              <span className="head6 font-semibold">OFF</span>
            </div>

            <div className="flex items-center justify-center gap-3 bg-[#EBC80C] text-[#191C1F] font-bold rounded-xs py-2 px-4 text-sm md:text-base w-auto">
              SHOP NOW
              <svg width="20" height="20" viewBox="0 0 20 20">
                <path d="M3.125 10H16.875" stroke="#191C1F" strokeWidth="1.5" />
                <path
                  d="M11.25 4.375L16.875 10L11.25 15.625"
                  stroke="#191C1F"
                  strokeWidth="1.5"
                />
              </svg>
            </div>
          </div>
          <div
            className="absolute top-2 md:top-6 right-0.5 md:right-3 z-50 cursor-pointer"
            onClick={() => setShowBanner(false)}
          >
            <Close />
          </div>
        </div>
      )}

      <div className="bg-[#1B6392] shadow-[0_-1px_0_0_#FFFFFF29_inset]">
        <div
          className="
            flex flex-col gap-4
            px-4 py-4
            sm:mx-6
            md:mx-10
            lg:flex-row md:justify-between md:items-center
            lg:mx-12 lg:py-3
            xl:mx-24
          "
        >
          <span className="head5 text-center md:text-left">
            Welcome to Clicon online eCommerce store.
          </span>

          <div
            className="
              flex flex-col gap-4
              md:flex-row md:items-center md:gap-6 md:justify-between md:w-full lg:w-auto lg:justify-center
            "
          >
            <div className="flex flex-col items-center gap-2 md:flex-row md:gap-5">
              <span className="head5 hidden lg:flex">Follow us:</span>
              <div className="flex items-center gap-3">
                <Twitter />
                <Facebook />
                <Pinterest />
                <Reddit />
                <Youtube />
                <Instagram />
              </div>
            </div>

            <div className="hidden lg:block">
              <Line />
            </div>

            <div className="flex items-center justify-center gap-5">
              <span className="flex items-center gap-2">
                ENG <Dropdown />
              </span>
              <span className="flex items-center gap-2">
                USD <Dropdown />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
