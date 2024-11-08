import React, { useEffect } from "react";
import Header from "./Header";
import { Link, Navigate, Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useCookies } from "react-cookie";
import useUserStore  from "../stores/useUserStore";

const Layoud = () => {
  const [token] = useCookies();
  const [userCookie] = useCookies();
  const { user,setUser } = useUserStore();

  useEffect(() => {
    setUser( userCookie.user);
  }, []);

  if (!token) {
    return <Navigate to="/" />;
  }
  return (
    <main className=" flex flex-col min-h-screen p-5">
      <Header />
      <Outlet />
      <Toaster position="top-right" reverseOrder={false} />
    </main>
  );
};

export default Layoud;
