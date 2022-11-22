import React from "react";
import ReactDOM from "react-dom/client";
import router from "./router/Router";
import { RouterProvider } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import AppProvider from "./context/Provider";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AppProvider>
      <ChakraProvider>
        <RouterProvider router={router} />
      </ChakraProvider>
    </AppProvider>
  </React.StrictMode>
);
