import React from "react";

const ProductSkeletonLoader = ({ loadingRow }) => {
  return (
    <>
      {Array.from({ length: loadingRow }).map((_, index) => (
        <tr
          key={index}
          className="animate-pulse bg-gray-100 border-b dark:bg-gray-700 "
        >
          <td className="px-6 py-4">
            <div className="h-4 w-12 bg-gray-300 rounded"></div>
          </td>
          <td className="px-6 py-4">
            <div className="h-4 w-48 bg-gray-300 rounded"></div>
          </td>
          <td className="px-6 py-4">
            <div className="h-4 w-20 bg-gray-300 rounded"></div>
          </td>
          <td className="px-6 py-4">
            <div className="flex flex-col">
              <div className="h-3 w-24 bg-gray-300 rounded"></div>
              <div className="h-3 w-16 bg-gray-300 rounded mt-1"></div>
            </div>
          </td>
          <td className="px-6 py-4">
            <div className="flex gap-1">
              <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
              <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
            </div>
          </td>
        </tr>
      ))}
    </>
  );
};

export default ProductSkeletonLoader;
