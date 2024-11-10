import React from "react";
import Container from "../components/Container";
import BreadCrumb from "../components/BreadCrumb";
import { useForm } from "react-hook-form";
import useUserStore from "../stores/useUserStore";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const UserPasswordChange = () => {
  const nav = useNavigate();
  const [cookies] = useCookies(["token"]);
  const { register, handleSubmit, reset } = useForm();
  // const formHandle = async (data) => {
  //   console.log(data);
  //   const response = await fetch(
  //     import.meta.env.VITE_API_URL + "/user-profile/change-password",
  //     {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Accept: "application/json",
  //         Authorization: `Bearer ${cookies.token}`,
  //       },
  //       body: JSON.stringify(data),
  //     }
  //   );
  //   const json = await response.json();
  //   console.log(json);
  //   if (response.status === 200) {
  //     toast.success(json.message);
  //     // setUserCookie("user", JSON.stringify(json.user));
  //     setUser(json.user);
  //     nav(-1);
  //   } else {
  //     toast.error(json.message);
  //   }
  //   reset();
  // };

  const formHandle = async (data) => {
    if (data.new_password !== data.new_password_confirmation) {
      toast.error("New passwords do not match.");
      return;
    }
    const response = await fetch(
      import.meta.env.VITE_API_URL + "/user-profile/change-password",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${cookies.token}`,
        },
        body: JSON.stringify(data),
      }
    );
    const json = await response.json();

    if (response.status === 200) {
      toast.success(json.message);
      nav("/");
    } else {
      toast.error(json.message);
    }
    reset();
  };

  return (
    <div>
      <Container>
        <BreadCrumb currentPage={"Voucher"} />
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form
              onSubmit={handleSubmit(formHandle)}
              className="space-y-6"
              action="#"
              method="POST"
            >
              <div>
                <label
                  htmlFor="old_password"
                  className="block text-sm/6 font-medium text-gray-900 text-start"
                >
                  Your Old Password
                </label>
                <div className="mt-2">
                  <input
                    {...register("old_password")}
                    id="old_password"
                    name="old_password"
                    type="old_password"
                    autoComplete="old_password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="new_password"
                  className="block text-sm/6 font-medium text-gray-900 text-start"
                >
                  Your New Password
                </label>
                <div className="mt-2">
                  <input
                    {...register("new_password")}
                    id="new_password"
                    name="new_password"
                    type="new_password"
                    autoComplete="new_password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="new_password_confirmation"
                  className="block text-sm/6 font-medium text-gray-900 text-start"
                >
                  Confirm Your New Password
                </label>
                <div className="mt-2">
                  <input
                    {...register("new_password_confirmation")}
                    id="new_password_confirmation"
                    name="new_password_confirmation"
                    type="new_password_confirmation"
                    autoComplete="new_password_confirmation"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Upload Your New Name
                </button>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default UserPasswordChange;
