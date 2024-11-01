import React from "react";
import { BiArrowFromRight } from "react-icons/bi";
import { CiHome } from "react-icons/ci";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";

const BreadCrumb = ({ currentPage, links }) => {
  return (
    <div>
      <nav className="flex" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
          <li className="inline-flex items-center">
            <Link
              to="/"
              className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white  gap-2"
            >
              <CiHome />
              Home
            </Link>
          </li>
          {links &&
            links.map((i, index) => (
              <Link
                key={index}
                to={i.path}
                className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white  gap-2"
              >
                <IoIosArrowForward />
                {i.title}
              </Link>
            ))}
          <li>
            <div className="flex items-center">
              <IoIosArrowForward />
              <Link className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white">
                {currentPage}
              </Link>
            </div>
          </li>
        </ol>
      </nav>
    </div>
  );
};

export default BreadCrumb;
