import React from "react";
import Container from "../components/Container";
import BreadCrumb from "../components/BreadCrumb";
import ProductFrom from "../components/ProductFrom";

const ProductCreatePage = () => {
  return (
    <section>
      <Container>
        <BreadCrumb
          currentPage={"Create Product"}
          links={[{ title: "Product", path: "/products" }]}
        />
        <ProductFrom/>
      </Container>
    </section>
  );
};

export default ProductCreatePage;
