import { createBrowserRouter } from "react-router-dom";
import Login from "../routes/Login";
import Signup from "../routes/Signup";
import ToBeDeveloped from "../components/ToBeDeveloped";
import Dashboard from "../routes/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        index: true,
        element: <Signup />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "dashboard/:id",
        element: <Dashboard />,
      },
    ],
  },
  {
    path: "*",
    element: <ToBeDeveloped />,
  },
]);

export default router;
