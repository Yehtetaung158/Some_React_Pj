import React, { useEffect } from "react";
import Header from "./Header";
import { Toaster } from "react-hot-toast";
import { Outlet, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import useUserStore from "../stores/useUserStore";
import LogOutBtn from "./LogOutBtn";

const Layout = () => {
  const [cookies] = useCookies(["token", "user"]);  
  const { user, setUser } = useUserStore();
  const navigate = useNavigate();

  console.log(cookies)

  useEffect(() => {
    if (cookies.user) {
      setUser(cookies);
    }
    if (!cookies.token) {
      navigate("/");
    }
  }, [cookies, navigate, setUser]); 
   //
  if (!cookies.token) return null;

  return (
    <main className="flex flex-col min-h-screen p-5">
      <Header />
      <Outlet />
      <LogOutBtn/>
      <Toaster position="top-right" reverseOrder={false} />
    </main>
  );
};

export default Layout;
