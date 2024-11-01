import React, { useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { PiPencil } from "react-icons/pi";
import { useSWRConfig } from "swr";
import { pulsar } from "ldrs";
import { useNavigate } from "react-router-dom";

pulsar.register();

const ProductRow = ({ item: { id, products_name, price, create_at } }) => {
  const date = new Date(create_at);
  const optionsDate = { day: "numeric", month: "short", year: "numeric" };
  const optionsTime = { hour: "numeric", minute: "numeric", hour12: true };
  const formattedDate = date.toLocaleDateString("en-GB", optionsDate);
  const formattedTime = date.toLocaleTimeString("en-GB", optionsTime);

  const [isDeleting, setIsDeleting] = useState(false);
  const nav = useNavigate();
  const { mutate } = useSWRConfig();

  const handleDeleteBtn = async () => {
    setIsDeleting(true);
    const url = `${import.meta.env.VITE_API_URL}/products/${id}`;
    console.log("Deleting product with URL:", url);

    try {
      const response = await fetch(url, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete product");

      mutate(`${import.meta.env.VITE_API_URL}/products`);
    } catch (error) {
      console.error("Error deleting product:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
        <td className="px-6 py-4">{id}</td>
        <th
          scope="row"
          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          {products_name}
        </th>
        <td className="px-6 py-4">${price}</td>
        <td className="px-6 py-4">
          <p className="text-xs">{formattedDate}</p>
          <p className="text-xs">{formattedTime}</p>
        </td>
        <td className="px-6 py-4">
          <div className="font-lg text-blue-600 dark:text-blue-500 hover:underline flex gap-1.5">
            <button onClick={() => nav(`/products/edit/${id}`)} className="border text-lg size-8 flex justify-center items-center">
              <PiPencil />
            </button>
            <button
              onClick={handleDeleteBtn}
              className="border text-lg text-red-600 size-8 flex justify-center items-center"
            >
              {isDeleting ? (
                <l-pulsar size="20" speed="1.75" color="red"></l-pulsar>
              ) : (
                <MdDeleteOutline />
              )}
            </button>
          </div>
        </td>
      </tr>
    </>
  );
};

export default ProductRow;
