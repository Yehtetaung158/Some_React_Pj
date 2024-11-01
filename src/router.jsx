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

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layoud />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: "/voucher",
        element: <VoucherPage />,
      },
      {
        path: "/products",
        element: <ProductPage />,
      },
      {
        path: "/products/create",
        element: <ProductCreatePage />,
      },
      {
        path: "/products/edit/:id",
        element: <ProductEditPage />,
      },
      {
        path: "/sale",
        element: <SalePage />,
      },
      {
        path: "/voucher/detail/:id",
        element: <VoucherDetailPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
