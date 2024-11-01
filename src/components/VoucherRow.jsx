import React, { useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { useSWRConfig } from "swr";
import { pulsar } from "ldrs";
import {  useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { BiDetail } from "react-icons/bi";

pulsar.register();

const VoucherRow = ({ item ,index}) => {
  const navigate=useNavigate()
  const id = item.id;
  const [isDeleting, setIsDeleting] = useState(false);
  const { mutate } = useSWRConfig();
  const date = new Date(item.saleDate);
  const optionsDate = { day: "numeric", month: "short", year: "numeric" };
  const optionsTime = { hour: "numeric", minute: "numeric", hour12: true };
  const formattedDate = date.toLocaleDateString("en-GB", optionsDate);
  const formattedTime = date.toLocaleTimeString("en-GB", optionsTime);

  // const handleDeleteBtn = async () => {
  //   setIsDeleting(true);
  //   console.log(import.meta.env.VITE_API_URL + `/vouchers/${item.id}`)
  //   await fetch(import.meta.env.VITE_API_URL + `/vouchers/${item.id}`, {
  //     method: "DELETE",
  //   });
  //   mutate(import.meta.env.VITE_API_URL + `/vouchers`);
  //   setIsDeleting(false);
  // };
  const handleDeleteBtn = async () => {
    setIsDeleting(true);

    await fetch(import.meta.env.VITE_API_URL + `/vouchers/${id}`, {
      method: "DELETE",
    });
    toast.success("Voucher deleted successfully");
    mutate(import.meta.env.VITE_API_URL + `/vouchers`);
  };

  // const handleDetail=async()=>{
  //   nav(`/vouchers/${id}`)
  //   console.log("I am Id",id)
  //   console.log("I am item",item)
  // }

  return (
    <>
      <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
        <td className="px-6 py-4">{index+1}</td>
        <td className="px-6 py-4">{item.customerName}</td>
        <td className="px-6 py-4">{item.customerEmail}</td>
        <td className="px-6 py-4">
          <p className="text-xs">{formattedDate}</p>
          <p className="text-xs">{formattedTime}</p>
        </td>
        <td className="px-6 py-4">
          <div className="font-lg text-blue-600 dark:text-blue-500 hover:underline flex gap-1.5">
            <button
             onClick={() => navigate(`/voucher/detail/${id}`)}
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
