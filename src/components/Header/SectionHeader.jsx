import React from "react";
import { FiHome } from "react-icons/fi";
import { HiOutlineChevronRight } from "react-icons/hi2";
import { Link } from "react-router-dom";

const SectionHeader = ({section}) => {
  const sectionName = section.replace(/-/g," ")
  return (
    <div className="bg-[#F2F4F5] my-3 mt-10">
      <div className="py-4 px-4 my-2 sm:mx-6 md:mx-10 lg:mx-12 xl:mx-24 flex flex-wrap items-center gap-2 text-sm sm:text-base">
        <Link to={"/"} className="flex justify-center items-center gap-2">
          <FiHome />
          <span className="text-[#5F6C72] head5 uppercase">Home</span>
        </Link>
        <HiOutlineChevronRight size={15} color="#77878F" />
        <span className="text-[#2DA5F3] head5 uppercase">{sectionName}</span>
      </div>
    </div>
  );
};

export default SectionHeader;
