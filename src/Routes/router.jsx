import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import AuthLayout from "../layouts/AuthLayout";
import LogIn from "../pages/Auth/LogIn/LogIn";
import Register from "../pages/Auth/Register/Register";
import AddLesson from "../pages/AddLesson/AddLesson";
import DashboardLayout from "../Layouts/DashboardLayout";
import MyLessons from "../pages/Dashboard/MyLessons/MyLessons";
import PrivateRoute from "../Routes/PrivateRoute";
import Payment from "../pages/Home/Payment/Payment";
import MyProfile from "../pages/Dashboard/MyProfile/MyProfile";
import UpdateMyProfile from "../pages/Dashboard/MyProfile/UpdateMyProfile";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "payment",
        element: (
          <PrivateRoute>
            <Payment />
          </PrivateRoute>
        ),
      },
      // {
      //   path: "login",
      //   element: <Login />,
      // },
      // {
      //   path: "register",
      //   element: <Register />,
      // },
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
        path: "add-lesson",
        element: <AddLesson />,
      },
      {
        path: "my-lessons",
        element: <MyLessons />,
      },
      {
        path: "my-profile",
        element: <MyProfile />,
      },
      {
        path: "/dashboard/update-my-profile",
        element: <UpdateMyProfile />,
      },
    ],
  },
]);
