import React from "react";
import { useForm } from "react-hook-form";
import useRecordStore from "../stores/userRecordStore";
import useSWR from "swr";

const SaleForm = ({token}) => {
  const { addRecord, records } = useRecordStore();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const handleForm = async (data) => {
    // console.log(JSON.parse(data.current_product));
    if (data) {
      const current_product = JSON.parse(data.current_product);
      console.log("data in self", data);
      addRecord({
        product_id: current_product.id,
        product: {
          id: current_product.id,
          product_name: current_product.product_name,
          price: current_product.price,
          created_at: new Date().toISOString(),
        },
        quantity: parseInt(data.quantity),
        cost: parseInt(data.quantity) * parseInt(current_product.price),
        created_at: new Date().toISOString(),
      });
    }
    reset();
  };

  // const isExist = (id) => {
  //   return records.some((record) => record.product_id === id);
  // };

  const fetcher = (url) => fetch(url, { headers: { Authorization: `Bearer ${token.token}` } }).then((res) => res.json());

  const { data, error, isLoading } = useSWR(
    `${import.meta.env.VITE_API_URL}/products`,
    fetcher
  );

  if (isLoading) return <div>Loading...</div>;
  // console.log(data)

  return (
    <form
      className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3 bg-gray-50 rounded-lg shadow-lg"
      onSubmit={handleSubmit(handleForm)}
    >
      <div className="flex flex-col">
        <label
          htmlFor="current_product"
          className={`${
            errors.current_product ? "text-red-500" : "text-gray-900"
          } block mb-2 text-sm font-medium`}
        >
          Select Product
        </label>
        <select
          id="current_product"
          name="current_product"
          className={`${
            errors.current_product
              ? "border-red-500 focus:ring-red-500 focus:border-red-500"
              : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          } bg-gray-50 border text-gray-900 text-sm rounded-lg w-full p-2.5`}
          {...register("current_product", { required: true })}
        >
          <option value="">Select Product</option>
          {data?.data?.map((product) => (
            <option
              key={product.id}
              name="prduct_id"
              value={JSON.stringify(product)}
            >
              {product.product_name}
            </option>
          ))}
        </select>
        {errors.current_product && (
          <p className="text-red-500 text-xs mt-1">
            Product selection is required
          </p>
        )}
      </div>

      <div className="flex flex-col">
        <label
          htmlFor="quantity"
          className={`${
            errors.quantity ? "text-red-500" : "text-gray-900"
          } block mb-2 text-sm font-medium`}
        >
          Quantity
        </label>
        <input
          {...register("quantity", {
            required: true,
            max: 200000,
            min: 1,
          })}
          type="number"
          name="quantity"
          id="quantity"
          className={`${
            errors.quantity
              ? "border-red-500 focus:ring-red-500 focus:border-red-500"
              : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          } bg-gray-50 border text-gray-900 text-sm rounded-lg w-full p-2.5`}
          placeholder="Enter quantity"
        />
        {errors.quantity?.type === "required" && (
          <p className="text-red-500 text-xs mt-1">Quantity is required</p>
        )}
        {errors.quantity?.type === "max" && (
          <p className="text-red-500 text-xs mt-1">
            Quantity must be less than 200000
          </p>
        )}
        {errors.quantity?.type === "min" && (
          <p className="text-red-500 text-xs mt-1">
            Quantity must be more than 100
          </p>
        )}
      </div>

      <div className="flex justify-center items-center mt-4 md:mt-0 col-span-1">
        <button
          type="submit"
          className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 w-full md:w-auto"
        >
          Buy
        </button>
      </div>
    </form>
  );
};

export default SaleForm;
