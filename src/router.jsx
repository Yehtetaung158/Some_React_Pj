import { createBrowserRouter } from "react-router-dom";
import Layoud from "./components/Layoud";
import DashboardPage from "./pages/DashboardPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProductPage from "./pages/ProductPage";
import SalePage from "./pages/SalePage";
import VoucherDetailPage from "./pages/VoucherDetailPage";
import VoucherPage from "./pages/VoucherPage";
import ProductCreatePage from "./pages/ProductCreatePage";
import ProductEditPage from "./pages/ProductEditPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UserPage from "./pages/UserPage";
import UserNameChange from "./pages/UserNameChange";
import UserPasswordChange from "./pages/UserPasswordChange";
import UserImageChange from "./pages/UserImageChange";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "dashboard",
        element: <Layoud />,
        errorElement: <NotFoundPage />,
        children: [
          {
            index: true,
            element: <DashboardPage />,
          },
          {
            path: "voucher",
            element: <VoucherPage />,
          },
          {
            path: "products",
            element: <ProductPage />,
          },
          {
            path: "products/create",
            element: <ProductCreatePage />,
          },
          {
            path: "products/edit/:id",
            element: <ProductEditPage />,
          },
          {
            path: "sale",
            element: <SalePage />,
          },
          {
            path: "voucher/detail/:id",
            element: <VoucherDetailPage />,
          },
          {
            path: "user",
            errorElement : <NotFoundPage/>,
            children: [
              {
                index: true,
                element: <UserPage />,
              },
              {
                path: "user-img-change",
                element: <UserImageChange />,
              },
              {
                path: "user-name-change",
                element: <UserNameChange />,
              },
              {
                path: "user-password-change",
                element: <UserPasswordChange />,
              },
            ]
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
