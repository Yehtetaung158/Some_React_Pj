import React from "react";
import Container from "../components/Container";
import BreadCrumb from "../components/BreadCrumb";
import VoucherInfo from "../components/VoucherInfo";

const SalePage = () => {
  return (
    <section>
      <Container>
        <BreadCrumb currentPage={"Sale"} />
        <VoucherInfo />
      </Container>
    </section>
  );
};

export default SalePage;
