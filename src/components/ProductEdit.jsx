import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { pulsar } from "ldrs";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";
import PuductEditLoader from "./PuductEditLoader";
import { useCookies } from "react-cookie";

pulsar.register();

const ProductEdit = ({ id }) => {
  console.log(id)
  const notify = () => toast.success("Product Upadate is successfully");
  const [isSending, setIsSending] = useState(false);
  const nav = useNavigate();
  const [token] = useCookies(["token"]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const fetcher = (url) => fetch(url, { headers: { Authorization: `Bearer ${token.token}` } }).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    `${import.meta.env.VITE_API_URL}/products/${id}`,
    fetcher
  );

  const handleForm = async (data) => {
    console.log(data)
    setIsSending(true);
    await fetch(import.meta.env.VITE_API_URL + "/products/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.token}`,
      },
      body: JSON.stringify({
        product_name: data.product_name,
        price: data.price,
        create_at: new Date().toISOString(),
      }),
    });
    reset();
    setIsSending(false);
    notify();
    nav("/dashboard/products");
  };

  return (
    <>
      {isLoading ? (
        <>
          <PuductEditLoader />
        </>
      ) : (
        <>
          <form
            onSubmit={handleSubmit(handleForm)}
            className="max-w-sm mx-auto mt-5 text-start"
          >
            <div className=" mb-3">
              <h1 className=" text-2xl font-bold text-gray-700">
                Product Create
              </h1>
              <p className=" text-gray-500">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi
                doloribus labore ea.
              </p>
            </div>

            <div className="mb-5">
              <label
                htmlFor="name"
                className={` ${
                  errors.product_name ? "text-red-500" : "text-gray-900"
                } block mb-2 text-sm font-medium  dark:text-white`}
              >
                Product Name
              </label>
              <input
                {...register("product_name", {
                  required: true,
                  minLength: 3,
                  maxLength: 30,
                })}
                type="name"
                id="product_name"
                defaultValue={data?.data?.product_name}
                className={` ${
                  errors.product_name
                    ? " border-red-500 focus:ring-red-500 focus:border-red-500 "
                    : " border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                } bg-gray-50 border text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-2"
          placeholder="Kyaw Kyaw`}
              />
              {errors.product_name?.type === "required" && (
                <p className=" text-red-500 text-xs">First name is required</p>
              )}
              {errors.product_name?.type === "minLength" && (
                <p className=" text-red-500 text-xs">Name must more than 3</p>
              )}
              {errors.product_name?.type === "maxLength" && (
                <p className=" text-red-500 text-xs">Name must lass then 30</p>
              )}
            </div>
            <div className="mb-5">
              <label
                htmlFor="price"
                className={` ${
                  errors.price ? "text-red-500" : "text-gray-900"
                } block mb-2 text-sm font-medium  dark:text-white`}
              >
                Price
              </label>
              <input
                defaultValue={data?.data?.price}
                {...register("price", { required: true, min: 100, max: 30000 })}
                type="number"
                id="price"
                className={` ${
                  errors.price
                    ? " border-red-500 focus:ring-red-500 focus:border-red-500 "
                    : " border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                } bg-gray-50 border text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-2"
          placeholder="Kyaw Kyaw`}
              />
              {errors.price?.type === "required" && (
                <p className=" text-red-500 text-xs">First price is required</p>
              )}
              {errors.price?.type === "min" && (
                <p className=" text-red-500 text-xs">
                  price must more than 100
                </p>
              )}
              {errors.price?.type === "max" && (
                <p className=" text-red-500 text-xs">
                  price must lass then 30000
                </p>
              )}
            </div>
            <div className="flex items-start mb-5">
              <div className="flex items-center h-5">
                <input
                  id="remember"
                  type="checkbox"
                  defaultValue
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                  required
                />
              </div>

              <label
                htmlFor="remember"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Remember me
              </label>
            </div>

            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-32 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {isSending ? (
                <span className=" inline-flex gap-2">
                  <>Saving</>
                  <l-pulsar size="20" speed="1.75" color="white"></l-pulsar>
                </span>
              ) : (
                <>Save</>
              )}
            </button>
          </form>
        </>
      )}
    </>
  );
};

export default ProductEdit;
