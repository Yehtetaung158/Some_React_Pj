import React, { useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaPlus } from "react-icons/fa";
import useSWR from "swr";
import ProductSkeletonLoader from "./ProductSkeletonLoadr";
import ProductEmptyState from "./ProductEmptyState";
import ProductRow from "./ProductRow";
import { Link } from "react-router-dom";
import { debounce } from "lodash";
import { HiX } from "react-icons/hi";
import Pagination from "./Pagination";
const fetcher = (url) => fetch(url).then((res) => res.json());

const ProductList = () => {
  const serRef = useRef();
  const [fetchUrl, setFetchUrl] = useState(
    `${import.meta.env.VITE_API_URL}/products`
  );

  const { data, isLoading, error } = useSWR(fetchUrl, fetcher);

  const handleSearchProduct = debounce(
    (e) =>
      setFetchUrl(
        `${import.meta.env.VITE_API_URL}/products?q=${e.target.value}`
      ),
    500
  );

  const handleClear = () => {
    if (serRef.current) {
      serRef.current.value = "";
      serRef.current.focus();
      setFetchUrl(`${import.meta.env.VITE_API_URL}/products`);
    }
  };
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 px-2 bg-white dark:bg-gray-900 mb-3">
        <div className="relative">
          <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
            <CiSearch />
          </div>
          <input
            ref={serRef}
            onChange={handleSearchProduct}
            type="text"
            id="table-search-users"
            className="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search for users"
          />
          {serRef.current?.value && (
            <button
              onClick={handleClear}
              className="absolute inset-y-0 right-0 flex items-center px-3 text-red-500"
              aria-label="Clear Search"
            >
              <HiX />
            </button>
          )}
        </div>

        <div>
          <Link
            to="/products/create"
            id="dropdownActionButton"
            data-dropdown-toggle="dropdownAction"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 flex gap-2 items-center"
            type="button"
          >
            <span className="sr-only">Action button</span>
            Add New Product
            <FaPlus />
          </Link>
        </div>
      </div>

      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              #
            </th>
            <th scope="col" className="px-6 py-3">
              Product name
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th scope="col" className="px-6 py-3">
              Create_at
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <ProductSkeletonLoader loadingRow={5} />
          ) : data?.data?.length === 0 ? (
            <>
              <ProductEmptyState />
            </>
          ) : (
            data?.data?.map((item, index) => (
              <ProductRow key={item.id} item={item} index={index} />
            ))
          )}
        </tbody>
      </table>

      {!isLoading && (
        <Pagination
          links={data?.links}
          meta={data?.meta}
          updateFetchUrl={setFetchUrl}
        />
      )}
    </div>
  );
};

export default ProductList;
