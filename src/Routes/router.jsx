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
import EditLesson from '../../src/pages/Dashboard/MyLessons/EditLesson'
import PaymentSuccess from "../pages/Home/Payment/PaymentSuccess";
import PaymentCancelled from "../pages/Home/Payment/PaymentCancelled";
import ErrorPage from "../Components/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
           {
        path: '/lesson/:id',
        element:   <PrivateRoute><LessonDetails /></PrivateRoute>,
      },
{
  path: "payment",
  element: <PrivateRoute><Payment /></PrivateRoute>,
},
{
  path: "payment/success",
  element: <PaymentSuccess />,
},
{
  path: "payment/cancelled",
  element: <PaymentCancelled />,
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
        path: "/dashboard/my-profile/edit-lesson/:id",
        element: <EditLesson />,
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
