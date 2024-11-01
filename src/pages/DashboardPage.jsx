import React from "react";
import ModuleBtn from "../components/ModuleBtn";
import { FaDatabase } from "react-icons/fa";
import { SiDask } from "react-icons/si";
import { IoNewspaper } from "react-icons/io5";
import Container from "../components/Container";

const DashboardPage = () => {
  return (
    <section>
      <Container>
        <div className=" grid grid-cols-3 gap-5">
          <div>
            <ModuleBtn
              name={"Product"}
              icon={<FaDatabase className={"size-14"} />}
              url={"/products"}
            />
          </div>{" "}
          <div>
            <ModuleBtn
              name={"Sale"}
              icon={<SiDask className={"size-14"} />}
              url={"/sale"}
            />
          </div>{" "}
          <div>
            <ModuleBtn
              name={"Voucher"}
              icon={<IoNewspaper className={"size-14"} />}
              url={"/voucher"}
            />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default DashboardPage;
