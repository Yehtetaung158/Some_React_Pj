import React from "react";
import Container from "./Container";
import { useCookies } from "react-cookie";
import useUserStore from "../stores/useUserStore";

const Header = () => {
  const { user } = useUserStore();
  // console.log(user);
  return (
    <header className=" text-start mb-5">
      <Container>
        <div className=" flex justify-between">
          <div>
            <h1 className=" text-3xl font-bold">MMS IT</h1>
            <p className=" text-stone-500">Voucher App</p>
          </div>
          <div className=" flex gap-5 items-center">
            <img
              className="size-12 rounded-full"
              src={
                user.profile_image ||
                "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
              }
              alt="user profile"
            />

            <div>
              <h1 className=" text-3xl font-bold">{user.name}</h1>
              <p className=" text-stone-500">Voucher App</p>
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
