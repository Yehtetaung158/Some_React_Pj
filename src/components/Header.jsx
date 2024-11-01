import React from "react";
import  Container  from "./Container";

const Header = () => {
  return (
    <header className=" text-start mb-5">
      <Container>
        <h1 className=" text-3xl font-bold">MMS IT</h1>
        <p className=" text-stone-500">Voucher App</p>
      </Container>
    </header>
  );
};

export default Header;
