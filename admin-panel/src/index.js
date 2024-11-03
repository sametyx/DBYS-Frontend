import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Faculties from "./Components/Pages/Faculties/Faculties";
import Header from "./Components/Header";
import Navbar from "./Components/Navbar";
import Teachers from "./Components/Pages/Teachers/Teachers";
import LessonsOLD from "./Components/Pages/Lessons/LessonsOLD";
import Departments from "./Components/Pages/Departments/Departments";
import Ranks from "./Components/Pages/Ranks/Ranks";
import Classrooms from "./Components/Pages/Classrooms/Classrooms";
import { Toaster } from "react-hot-toast";
import DragTry from "./DragTry";
import { Provider } from "react-redux";
import store from "./Redux/store";
import Lessons from "./Components/Pages/Lessons/Lessons";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/faculties",
    element: <Faculties />,
  },
  {
    path: "/lessons",
    element: <Lessons />,
  },
  {
    path: "/teachers",
    element: <Teachers />,
  },
  {
    path: "/departments",
    element: <Departments />,
  },
  {
    path: "/ranks",
    element: <Ranks />,
  },
  {
    path: "/classrooms",
    element: <Classrooms />,
  },
  {
    path: "/",
    element: <DragTry />,
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <Header />
      <Toaster
        position="bottom-right"
        reverseOrder={false}
        toastOptions={{
          className: "",
          style: {
            fontSize: "1.5rem",
            fontFamily: "Inter",
          },
        }}
      />
      <div className="navbar-content">
        <Navbar />
        <RouterProvider router={router} />
      </div>
    </Provider>
  </QueryClientProvider>,
);
