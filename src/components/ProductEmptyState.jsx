import React from "react";

const ProductEmptyState = () => {
  return (
      <tr className="text-center">
        <td colSpan="5" className="px-6 py-4 text-gray-500">
          No products available.
        </td>
      </tr>
  );
};

export default ProductEmptyState;
