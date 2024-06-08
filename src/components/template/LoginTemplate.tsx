import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "antd";
import { LOCALE_USER_LOGIN_KEY } from "constant";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate, Navigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { LoginType, loginSchema } from "schemas";
import { RootState, useAppDispatch } from "store";
import { quanLyNguoiDungActionsThunks } from "store/quanLyNguoiDung";

export const LoginTemplate = () => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginType>({
        resolver: zodResolver(loginSchema),
    });

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const onSubmit: SubmitHandler<LoginType> = async (data) => {
        try {
            await dispatch(
                quanLyNguoiDungActionsThunks.loginThunk(data)
            ).unwrap();
            const userLoginData = localStorage.getItem(LOCALE_USER_LOGIN_KEY);
            const checkAdmin = userLoginData
                ? JSON.parse(userLoginData).maLoaiNguoiDung
                : "";
            const from = location.state?.from || "/";
            if (checkAdmin === "QuanTri") {
                navigate("/admin");
            } else {
                navigate(from);
            }
            toast.success("Đăng nhập thành công!");
        } catch (err: any) {
            toast.error(err.response.data.content);
        }
    };

    const { isFetchingLogin, userLogin } = useSelector(
        (state: RootState) => state.quanLyNguoiDung
    );

    if (userLogin) {
        return <Navigate to="/" />;
    }

    return (
        <form className="text-white" onSubmit={handleSubmit(onSubmit)}>
            <h1 className="text-30 font-600 text-center">Đăng nhập</h1>

            <div className="mt-20">
                <p className="mb-10">Tài khoản</p>
                <Controller
                    control={control}
                    name="taiKhoan"
                    render={({ field }) => <Input {...field} />}
                />
                {!!errors?.taiKhoan && (
                    <p className="text-red-500 text-12">
                        {errors.taiKhoan.message}
                    </p>
                )}
            </div>
            <div className="mt-20 ">
                <p className="mb-10">Mật khẩu</p>
                <Controller
                    control={control}
                    name="matKhau"
                    render={({ field }) => <Input.Password {...field} />}
                />
                {!!errors?.matKhau && (
                    <p className="text-red-500 text-12">
                        {errors.matKhau.message}
                    </p>
                )}
            </div>
            <div className="text-center mt-20">
                <Button
                    htmlType="submit"
                    type="primary"
                    danger
                    loading={isFetchingLogin}
                >
                    Đăng nhập
                </Button>
            </div>
            <div className="text-right mt-20">
                <span>Bạn chưa có tài khoản? </span>
                <p
                    className="inline-block cursor-pointer text-red-500 underline italic"
                    onClick={() => navigate("/register")}
                >
                    Đăng ký
                </p>
                <span
                    className="block cursor-pointer mt-[5px]"
                    onClick={() => navigate("/")}
                >
                    Trở về trang chủ.
                </span>
            </div>
        </form>
    );
};
