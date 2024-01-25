import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";

import App from "./App";
import Connexion from "./pages/Connexion";
import Upload from "./pages/Upload";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import SingleVideoPage from "./pages/SingleVideoPage";
import UserContextProvider from "./context/UserContext";
import AdminContextProvider from "./context/AdminContext";
import RegisterUser from "./pages/RegisterUser";
import PageUser from "./pages/PageUser";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import UsersList from "./admin/UsersList";
import Videos from "./admin/Videos";
import VideoContextProvider from "./context/videoContext";
import AdminMain from "./admin/AdminMain";
import Playlists from "./admin/Playlists";

const router = createBrowserRouter([
  {
    element: (
      <VideoContextProvider>
        <UserContextProvider>
          <MantineProvider>
            <App />
          </MantineProvider>
        </UserContextProvider>
      </VideoContextProvider>
    ),
    path: "/",
    children: [
      {
        path: "/onevideo",
        element: <SingleVideoPage />,
      },
      {
        path: "/inscription",
        element: <RegisterUser />,
      },
      {
        path: "/connexion",
        element: <Connexion />,
      },
      {
        path: "/resetpassword",
        element: <ResetPassword />,
      },
      {
        element: <Upload />,
        path: "/upload",
      },
      {
        element: <PageUser />,
        path: "/user",
      },
      {
        element: <ForgotPassword />,
        path: "/fpassword",
      },
      {
        path: "/",
        element: <Home />,
      },
      {
        element: (
          <AdminContextProvider>
            <Admin />
          </AdminContextProvider>
        ),
        path: "/admin",
        children: [
          {
            path: "/admin/users",
            element: <UsersList />,
          },
          {
            path: "/admin/videos",
            element: <Videos />,
          },
          {
            path: "/admin/",
            element: <AdminMain />,
          },
          {
            path: "/admin/playlists",
            element: <Playlists />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
