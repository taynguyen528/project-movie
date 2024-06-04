import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { PATH } from "constant";

const ProtectedRoute = () => {
    const { userLogin } = useSelector(
        (state: RootState) => state.quanLyNguoiDung
    );

    if (!userLogin) {
        return <Navigate to={PATH.login} />;
    }
    return <Outlet />;
};

export default ProtectedRoute;
