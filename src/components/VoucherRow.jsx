import React, { useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { useSWRConfig } from "swr";
import { pulsar } from "ldrs";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { BiDetail } from "react-icons/bi";
import { useCookies } from "react-cookie";

pulsar.register();

const VoucherRow = ({ item, index }) => {
  const navigate = useNavigate();
  const [token] = useCookies(["token"]);
  console.log("i am delete token", token.token);
  const id = item.id;
  const [isDeleting, setIsDeleting] = useState(false);
  const { mutate } = useSWRConfig();
  const date = new Date(item.created_at);
  const optionsDate = { day: "numeric", month: "short", year: "numeric" };
  const optionsTime = { hour: "numeric", minute: "numeric", hour12: true };
  const formattedDate = date.toLocaleDateString("en-GB", optionsDate);
  const formattedTime = date.toLocaleTimeString("en-GB", optionsTime);
  // console.log(item);

  const handleDeleteBtn = async () => {
    setIsDeleting(true);
    const url = `${import.meta.env.VITE_API_URL}/vouchers/${id}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token.token}`,
      },
    });
    console.log(response);
    if (response.status === 200) {
      const json = await response.json();
      toast.success(json.message);
      mutate(`${import.meta.env.VITE_API_URL}/vouchers`);
      setIsDeleting(false);
    } else {
      const errorMessage = await response.json();
      toast.error(errorMessage.message);
      setIsDeleting(false);
    }
  };

  return (
    <>
      <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
        <td className="px-6 py-4">{index + 1}</td>
        <td className="px-6 py-4">{item.customer_name}</td>
        <td className="px-6 py-4">{item.customer_email}</td>
        <td className="px-6 py-4">
          <p className="text-xs">{formattedDate}</p>
          <p className="text-xs">{formattedTime}</p>
        </td>
        <td className="px-6 py-4">
          <div className="font-lg text-blue-600 dark:text-blue-500 hover:underline flex gap-1.5">
            <button
              onClick={() => navigate(`detail/${id}`)}
              className="border text-lg text-blue-600 size-8 flex justify-center items-center"
            >
              <BiDetail />
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

export default VoucherRow;
