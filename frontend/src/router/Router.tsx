import { createBrowserRouter } from "react-router-dom";
import Login from "../routes/Login";
import Signup from "../routes/Signup";
import ToBeDeveloped from "../components/ToBeDeveloped";
import Home from "../routes/Home";

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
        path: "tbd",
        element: <ToBeDeveloped />,
      },
      {
        path: "home",
        element: <Home />,
      },
    ],
  },
]);

export default router;
