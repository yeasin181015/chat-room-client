import "./index.css";
import App from "./App";
import React from "react";
import ReactDOM from "react-dom/client";
import { Outlet } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { ChakraProvider } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./components/Home";
import ChatState from "./context/chatState";
import Dashboard from "./components/Dashboard/Dashboard";

const token = localStorage.getItem("token");

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ChatState>
        <ChakraProvider>
          <App token={token} />
          <Outlet />
        </ChakraProvider>
      </ChatState>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
