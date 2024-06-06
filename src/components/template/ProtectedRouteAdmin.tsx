import { Button, Result } from "antd";
import { LOCALE_USER_LOGIN_KEY } from "constant";
import { DashBoardAdmin } from "./admin/DashBoardAdmin";
import { useNavigate } from "react-router-dom";

export const ProtectedRouteAdmin = () => {
    const userLoginData = localStorage.getItem(LOCALE_USER_LOGIN_KEY);
    const checkAdmin = userLoginData
        ? JSON.parse(userLoginData).maLoaiNguoiDung
        : "";

    const navigate = useNavigate();

    if (checkAdmin !== "QuanTri") {
        return (
            <Result
                status="403"
                title="403"
                subTitle="Xin lỗi, bạn không có quyền try cập trang này"
                extra={
                    <Button
                        type="primary"
                        onClick={() => {
                            navigate("/");
                        }}
                    >
                        Trở về trang chủ
                    </Button>
                }
            />
        );
    }
    return <DashBoardAdmin></DashBoardAdmin>;
};
