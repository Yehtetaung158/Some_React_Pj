import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [token, setToken] = useCookies("token");
  const [userCookie, setUserCookie] = useCookies("user");
  const nav = useNavigate();
  const { register, handleSubmit, reset } = useForm();
  const formHandle = async (data) => {
    // console.log(data);
    const response = await fetch(import.meta.env.VITE_API_URL + "/login", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const json = await response.json();
    console.log("iam json", json.user);
    setToken("token", json.token);
    setUserCookie("user", JSON.stringify(json.user));
    if (response.status === 200) {
      toast.success("Login successfully");
      nav("/dashboard");
    } else {
      toast.error("Something is wrong");
    }
    reset();
  };
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <svg
          className="mx-auto h-12 w-auto"
          xmlns="http://www.w3.org/2000/svg"
          width={300}
          height={150}
          viewBox="0 0 300 150"
        >
          <defs>
            <linearGradient
              id="metallicGradientY"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop
                offset="0%"
                style={{ stopColor: "#FFD700", stopOpacity: 1 }}
              />{" "}
              {/* Gold */}
              <stop
                offset="100%"
                style={{ stopColor: "#FFA500", stopOpacity: 1 }}
              />{" "}
              {/* Orange */}
            </linearGradient>
            <linearGradient
              id="metallicGradientH"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop
                offset="0%"
                style={{ stopColor: "#00FF00", stopOpacity: 1 }}
              />{" "}
              {/* Green */}
              <stop
                offset="100%"
                style={{ stopColor: "#008000", stopOpacity: 1 }}
              />{" "}
              {/* Dark Green */}
            </linearGradient>
            <linearGradient
              id="metallicGradientA"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop
                offset="0%"
                style={{ stopColor: "#1E90FF", stopOpacity: 1 }}
              />{" "}
              {/* Dodger Blue */}
              <stop
                offset="100%"
                style={{ stopColor: "#0000FF", stopOpacity: 1 }}
              />{" "}
              {/* Blue */}
            </linearGradient>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation={4} result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <text
            x={30}
            y={90}
            fontFamily="Arial"
            fontSize={72}
            fontWeight="bold"
            filter="url(#glow)"
          >
            <tspan fill="url(#metallicGradientY)">Y</tspan>
            <tspan fill="url(#metallicGradientH)">H</tspan>
            <tspan fill="url(#metallicGradientA)">A</tspan>
          </text>
        </svg>
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          onSubmit={handleSubmit(formHandle)}
          className="space-y-6"
          action="#"
          method="POST"
        >
          <div>
            <label
              htmlFor="email"
              className="block text-sm/6 font-medium text-gray-900 text-start"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                {...register("email")}
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Password
              </label>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2 relative">
              <input
                {...register("password")}
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3"
              >
                {showPassword ? (
                  <AiFillEyeInvisible
                    onClick={() => setShowPassword(!showPassword)}
                  />
                ) : (
                  <AiFillEye onClick={() => setShowPassword(!showPassword)} />
                )}
              </button>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>
        <p className="mt-10 text-center text-sm/6 text-gray-500">
          I don't have an account.
          <Link
            to="/register"
            className="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            <span className="underline">Register</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
