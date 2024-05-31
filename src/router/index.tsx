import { ConfirmTicketTemplate } from "components/template/ConfirmTicketTemplate";
import ProtectedRoute from "components/template/ProtectedRoute";
import { PATH } from "constant";
import { AuthLayout, MainLayout } from "layouts";
import { Home, Login, MovieDetail, Register, UserInfo } from "pages";
import { RouteObject, useRoutes } from "react-router-dom";
import { SelectSeatTemplate } from "template";

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
            {
                element: <ProtectedRoute />,
                children: [
                    {
                        path: PATH.selectSeat,
                        element: <SelectSeatTemplate />,
                    },
                    {
                        path: PATH.confirmTicket,
                        element: <ConfirmTicketTemplate />,
                    },
                ],
            },
        ],
    },
];

export const Router = () => useRoutes(router);
