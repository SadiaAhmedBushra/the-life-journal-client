import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import AuthLayout from "../layouts/AuthLayout";
import LogIn from "../pages/Auth/LogIn/LogIn";
import Register from "../pages/Auth/Register/Register";
import DashboardLayout from "../Layouts/DashboardLayout";
import MyLessons from "../pages/Dashboard/MyLessons/MyLessons";
import PrivateRoute from "../Routes/PrivateRoute";
import Payment from "../pages/Home/Payment/Payment";
import MyProfile from "../pages/Dashboard/MyProfile/MyProfile";
import AddLesson from "../pages/Dashboard/AddLesson/AddLesson";
import UpdateMyProfile from "../pages/Dashboard/MyProfile/UpdateMyProfile";
import LessonDetails from "../pages/LessonDetails/LessonDetails";
import EditLesson from "../../src/pages/Dashboard/MyLessons/EditLesson";
import PaymentSuccess from "../pages/Home/Payment/PaymentSuccess";
import PaymentCancelled from "../pages/Home/Payment/PaymentCancelled";
import ErrorPage from "../Components/ErrorPage";
import PublicLessons from "../pages/Shared/PublicLessons/PublicLessons";
import ReportLesson from "../pages/Shared/ReportLesson/ReportLesson";
import AuthorLessons from "../pages/Shared/AuthorLessons/AuthorLessons";
import MyFavorites from "../pages/Dashboard/MyFavorites/MyFavorites";
import MyDashboardHome from "../pages/Dashboard/MyDashboardHome/MyDashboardHome";
import AdminRoute from "./AdminRoute";
import AdminDashboardHome from "../pages/AdminDashboard/AdminDashboardHome/AdminDashboardHome";
import AdminDashboardLayout from "../Layouts/AdminDashboardLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "public-lessons",
        element: <PublicLessons />,
      },
      {
        path: "/lesson/:id",
        element: (
          <PrivateRoute>
            <LessonDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "payment",
        element: (
          <Payment />
        ),
      },
      {
        path: "/profile/:email",
        element: (
          <PrivateRoute>
            <AuthorLessons></AuthorLessons>
          </PrivateRoute>
        ),
      },
      {
        path: "payment/success",
        element: <PaymentSuccess />,
      },
      {
        path: "payment/cancelled",
        element: <PaymentCancelled />,
      },
      {
        path: "/report-lesson/:id",
        element: (
          <PrivateRoute>
            <ReportLesson />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <LogIn /> },
      { path: "register", element: <Register /> },
    ],
  },

  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <MyDashboardHome />,
      },
      {
        path: "/dashboard/add-lesson",
        element: <AddLesson />,
      },
      {
        path: "/dashboard/my-lessons",
        element: <MyLessons />,
      },
      {
        path: "/dashboard/my-profile/edit-lesson/:id",
        element: <EditLesson />,
      },
      {
        path: "/dashboard/my-profile",
        element: <MyProfile />,
      },
      {
        path: "/dashboard/update-my-profile",
        element: <UpdateMyProfile />,
      },
      {
        path: "/dashboard/my-favorites",
        element: <MyFavorites />,
      },
      {
        path: "/dashboard/admin",
        element: (
          <AdminRoute>
            <AdminDashboardHome />
          </AdminRoute>
        ),
      },
    ],
  },
    {
    path: "admin-dashboard",
    element: (
      <AdminRoute>
        <AdminDashboardLayout />
      </AdminRoute>
    ),
    children: [
      {
        index: true,
        element: <AdminDashboardHome />,
      },
      {
        path: "/admin-dashboard/add-lesson",
        element: <AddLesson />,
      },
      {
        path: "/admin-dashboard/my-lessons",
        element: <MyLessons />,
      },
      {
        path: "/admin-dashboard/my-profile/edit-lesson/:id",
        element: <EditLesson />,
      },
      {
        path: "/admin-dashboard/my-profile",
        element: <MyProfile />,
      },
      {
        path: "/admin-dashboard/update-my-profile",
        element: <UpdateMyProfile />,
      },
      {
        path: "/admin-dashboard/my-favorites",
        element: <MyFavorites />,
      },
    ],
  },
]);
