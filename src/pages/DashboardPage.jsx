import React from "react";
import ModuleBtn from "../components/ModuleBtn";
import { FaDatabase } from "react-icons/fa";
import { SiDask } from "react-icons/si";
import { IoNewspaper } from "react-icons/io5";
import Container from "../components/Container";
import { BiUser } from "react-icons/bi";

const DashboardPage = () => {
  return (
    <section>
      <Container>
        <div className=" grid grid-cols-2 md:grid-cols-4 gap-5">
          <div>
            <ModuleBtn
              name={"Product"}
              icon={<FaDatabase className={"size-14"} />}
              url={"/dashboard/products"}
            />
          </div>{" "}
          <div>
            <ModuleBtn
              name={"Sale"}
              icon={<SiDask className={"size-14"} />}
              url={"/dashboard/sale"}
            />
          </div>{" "}
          <div>
            <ModuleBtn
              name={"Voucher"}
              icon={<IoNewspaper className={"size-14"} />}
              url={"/dashboard/voucher"}
            />
          </div>
          <div>
            <ModuleBtn
              name={"User"}
              icon={<BiUser className={"size-14"} />}
              url={"/dashboard/user"}
            />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default DashboardPage;
