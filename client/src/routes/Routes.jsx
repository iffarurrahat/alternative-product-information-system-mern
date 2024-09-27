import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import ErrorPage from "../pages/Error/ErrorPage";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Queries from "../pages/Queries/Queries";
import MyQueries from "../pages/MyQueries/MyQueries";

import MyQueriesUpdate from "../pages/MyQueries/MyQueriesUpdate";
import MyQueriesCardDetails from "../pages/MyQueries/MyQueriesCardDetails";
import MyQueriesPage from "../pages/MyQueries/MyQueriesPage";
import MyRecommendations from "../pages/MyRecommendations/MyRecommendations";
import RecommendationsForMe from "../pages/RecommendationsForMe/RecommendationsForMe";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/my-queries",
        element: (
          <PrivateRoute>
            <MyQueries />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-queries-page",
        element: (
          <PrivateRoute>
            <MyQueriesPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/query/:id",
        element: (
          <PrivateRoute>
            <MyQueriesCardDetails />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_API_URL}/query/${params.id}`),
      },
      {
        path: "/my-queries-update/:id",
        element: (
          <PrivateRoute>
            <MyQueriesUpdate />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_API_URL}/query/${params.id}`),
      },
      {
        path: "/queries",
        element: <Queries />,
      },
      {
        path: "/my-recommendations",
        element: (
          <PrivateRoute>
            <MyRecommendations />
          </PrivateRoute>
        ),
      },
      {
        path: "/recommendations-for-me",
        element: (
          <PrivateRoute>
            <RecommendationsForMe />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export default router;
