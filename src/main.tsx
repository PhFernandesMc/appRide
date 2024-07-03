import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./styles/index.scss";
import RidePage from "./pages/RidePage.tsx";
import HomePage from "./pages/HomePage.tsx";
import RideDetailPage from "./pages/RideDetailPage.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/Ride",
    element: <RidePage />,
  },
  {
    path: "/rideDetail/:rideID",
    element: <RideDetailPage />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
