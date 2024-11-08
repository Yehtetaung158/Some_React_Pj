import React, { useRef } from "react";
import Container from "../components/Container";
import BreadCrumb from "../components/BreadCrumb";
import { useForm } from "react-hook-form";
import useUserStore from "../stores/useUserStore";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { HiPencilSquare } from "react-icons/hi2";

const UserImageChange = () => {
  const nav = useNavigate();
  const imageUploadRef = useRef(null);
  const [cookies, setUserCookie] = useCookies(["token"]);
  const { user, setUser } = useUserStore();

  const { handleSubmit, register, reset } = useForm();

  const formHandle = async (event) => {
    const formData = new FormData();
    formData.append("profile_image", event.target.files[0]);

    if (formData.get("profile_image")) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/user-profile/change-profile-image`,
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${cookies.token}`,
            },
            body: formData,
          }
        );

        const json = await response.json();

        if (response.ok) {
          toast.success(json.message);
          setUserCookie("user", JSON.stringify(json.user));
          setUser(json.user);
          nav(-1);
        } else {
          toast.error(json.message);
        }
      } catch (error) {
        toast.error("Failed to update profile image. Please try again.");
      }
    }

    reset();
  };

  return (
    <Container>
      <BreadCrumb currentPage="Voucher" />
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6">
            <div className="relative bg-green-300 w-fit">
              <img
                className="size-32 rounded-lg"
                src={
                  user.profile_image ||
                  "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
                }
                alt="user profile"
              />

              <button
                type="button"
                onClick={() => imageUploadRef.current.click()}
                className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 size-6 flex justify-center items-center rounded-full bg-blue-600 text-white hover:bg-blue-200"
              >
                <HiPencilSquare size={10} />
              </button>
            </div>
            <input
              {...register("profile_image")}
              ref={imageUploadRef}
              onChange={formHandle}
              id="profile_image"
              name="profile_image"
              type="file"
              className="hidden"
            />
            <button
              type="button"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={() => imageUploadRef.current.click()}
            >
              Upload Your New Image
            </button>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default UserImageChange;
