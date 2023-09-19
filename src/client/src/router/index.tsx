

import { createBrowserRouter } from "react-router-dom";
import { Homepage } from "../pages/Homepage";
import { Login } from "../pages/Login";
import { SignUp } from "../pages/SignUp";
import { ErrorBoundary } from "../components/ErrorBoundary";
import About from "../pages/About";
import Services from "../pages/Services";



export const router = createBrowserRouter([
    {
      path: "/",
      errorElement:<ErrorBoundary />,
      children: [
        {
            path: "/",
            element: <Homepage />,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/services",
          element: <Services />,
        },
        {
            path: "/login",
            element: <Login />,
        },
        {
            path: "/signup",
            element: <SignUp />,
        },
      ],
    },
  ]);