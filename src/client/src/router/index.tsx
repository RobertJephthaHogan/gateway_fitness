import { createBrowserRouter } from "react-router-dom";
import { Homepage } from "../pages/Homepage";
import { Login } from "../pages/Login";
import { SignUp } from "../pages/SignUp";
import { ErrorBoundary } from "../components/ErrorBoundary";
import About from "../pages/About";
import Services from "../pages/Services";
import Welcome from "../pages/Welcome";
import MainLayout from "../Layouts/MainLayout";
import Dashboard from "../pages/Dashboard";
import UserWorkouts from "../pages/UserWorkouts";
import UserNutrition from "../pages/UserNutrition";
import WorkoutPlans from "../pages/WorkoutPlans";
import NutritionPlans from "../pages/Nutrition Plans";
import ProtectedRoutes from "./ProtectedRoutes";



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
        {
			path: "/welcome",
			element: <Welcome />,
      	},
      ],
    },
	{
		path: "/",
		element: <ProtectedRoutes />,
		errorElement:<ErrorBoundary />,
		children: [
			{
				path: "/",
				element: <MainLayout />,
				errorElement:<ErrorBoundary />,
				children: [
					{
						path: "/dashboard",
						element: <Dashboard />,
					},
					{
						path: "/my-workouts",
						element: <UserWorkouts />,
					},
					{
						path: "/my-nutrition",
						element: <UserNutrition />,
					},
					{
						path: "/workout-plans",
						element: <WorkoutPlans />,
					},
					{
						path: "/nutrition-plans",
						element: <NutritionPlans />,
					},
				],
			  },
		],
	  },
  ]);