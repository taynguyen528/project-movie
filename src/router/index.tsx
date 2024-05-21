import { PATH } from "constant";
import { AuthLayout, MainLayout } from "layouts";
import { Home, Login, MovieDetail, Register, UserInfo } from "pages";
import { RouteObject, useRoutes } from "react-router-dom";

const router: RouteObject[] = [
    {
        element: <AuthLayout />,
        children: [
            {
                path: PATH.login,
                element: <Login />,
            },
            {
                path: PATH.register,
                element: <Register />,
            },
        ],
    },
    {
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: PATH.userInfo,
                element: <UserInfo />,
            },
            {
                path: PATH.movieDetail,
                element: <MovieDetail />,
            },
        ],
    },
];

export const Router = () => useRoutes(router);
