import React, { useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { PiPencil } from "react-icons/pi";
import { pulsar } from "ldrs";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useSWR, { useSWRConfig } from "swr";
import { useCookies } from "react-cookie";

pulsar.register();

const ProductRow = ({
  item: { id, product_name, price, created_at },
  index,
}) => {
  const [token] = useCookies(["token"]);
  const date = new Date(created_at);
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
    const response = await fetch(url, { method: "DELETE" , headers: { Authorization: `Bearer ${token.token}` } });
    if (response.status === 200) {
      const json = await response.json();
      toast.success(json.message);
      mutate(`${import.meta.env.VITE_API_URL}/products`);
      setIsDeleting(false);
    } else {
      const errorMessage = await response.json();
      toast.error(errorMessage.message);
    }
  };

  return (
    <>
      <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
        <td className="px-6 py-4">{index + 1}</td>
        <th
          scope="row"
          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          {product_name}
        </th>
        <td className="px-6 py-4">${price}</td>
        <td className="px-6 py-4">
          <p className="text-xs">{formattedDate}</p>
          <p className="text-xs">{formattedTime}</p>
        </td>
        <td className="px-6 py-4">
          <div className="font-lg text-blue-600 dark:text-blue-500 hover:underline flex gap-1.5">
            <button
              onClick={() => nav(`/dashboard/products/edit/${id}`)}
              className="border text-lg size-8 flex justify-center items-center"
            >
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
