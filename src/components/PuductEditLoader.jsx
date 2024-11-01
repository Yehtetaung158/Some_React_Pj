import React from "react";

const PuductEditLoader = () => {
  return (
    <>
      <div className="max-w-sm mx-auto mt-5">
        <div className="animate-pulse mb-3">
          <div className="bg-gray-300 h-8 w-48 rounded mb-2" />
          <div className="bg-gray-300 h-4 w-64 rounded" />
        </div>
        <div className="animate-pulse">
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-700">
            <div className="bg-gray-300 h-4 w-32 rounded" />
            </label>
            <div className="bg-gray-300 h-10 w-full rounded-lg mb-2" />
          </div>
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-700">
            <div className="bg-gray-300 h-4 w-32 rounded" />
            </label>
            <div className="bg-gray-300 h-10 w-full rounded-lg mb-2" />
          </div>
          <div className="flex items-start mb-5">
            <div className="bg-gray-300 w-4 h-4 rounded mr-2" />
            <label className="text-sm font-medium text-gray-700">
            <div className="bg-gray-300 h-4 w-32 rounded" />
            </label>
          </div>
          <div className="w-32 bg-gray-300 h-10 rounded-lg" />
        </div>
      </div>
    </>
  );
};

export default PuductEditLoader;
