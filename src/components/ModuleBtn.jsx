import React from "react";
import { Link } from "react-router-dom";

const ModuleBtn = ({ name, icon, url }) => {
  return (
    <Link
      to={url}
      className=" flex flex-col items-center bg-blue-500 text-white p-5 rounded-lg"
    >
      {icon}
      <br />
      {name}
    </Link>
  );
};

export default ModuleBtn;
