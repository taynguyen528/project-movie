import { Button, Input } from "antd";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { RegisterType, registerSchema } from "schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Navigate, useNavigate } from "react-router-dom";
import { PATH } from "constant";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { quanLyNguoiDungActionsThunks } from "store/quanLyNguoiDung";
import { RootState, useAppDispatch } from "store";

export const RegisterTemplate = () => {
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<RegisterType>({
        resolver: zodResolver(registerSchema),
    });

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { isFetchingRegister, userLogin } = useSelector(
        (state: RootState) => state.quanLyNguoiDung
    );
    console.log("isFetchingRegister", isFetchingRegister);

    // const onSubmit: SubmitHandler<RegisterType> = async (data) => {
    //     try {
    //         console.log(data);
    //         await qlNguoiDungServices.dangKy(data);
    //         toast.success("Đăng ký tài khoản thành công.");
    //         navigate(PATH.login);
    //     } catch (error: any) {
    //         toast.error(error?.response?.data?.content);
    //     }
    // };

    const onSubmit: SubmitHandler<RegisterType> = (data) => {
        // C1
        // dispatch(
        //     quanLyNguoiDungActionsThunks.registerThunk(
        //         123
        //     ) as unknown as UnknownAction
        // );

        // C2
        dispatch(quanLyNguoiDungActionsThunks.registerThunk(data))
            .unwrap()
            .then(() => {
                //action thunk xử lý thành công
                toast.success("Đăng ký tài khoản thành công.");
                navigate(PATH.login);
            })
            .catch((error) => {
                toast.error(error?.response?.data?.content);
            });
    };

    if (userLogin) {
        return <Navigate to="/" />;
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h1 className="text-white text-30 font-600 mb-[30px] text-center">
                Đăng ký
            </h1>
            <div className="text-white mb-4">Họ tên: </div>
            <Controller
                control={control}
                name="hoTen"
                render={({ field }) => (
                    <Input {...field} placeholder="Họ tên:" />
                )}
            />
            {errors.hoTen && (
                <p className="text-[16px] text-red-600">
                    {errors.hoTen.message}
                </p>
            )}

            <div className="text-white mt-10">Tài khoản: </div>
            <Controller
                control={control}
                name="taiKhoan"
                render={({ field }) => (
                    <Input {...field} placeholder="Tài khoản:" />
                )}
            />
            {errors.taiKhoan && (
                <p className="text-[16px] text-red-600">
                    {errors.taiKhoan.message}
                </p>
            )}

            <div className="text-white mt-10">Mật khẩu: </div>
            <Controller
                control={control}
                name="matKhau"
                render={({ field }) => (
                    <Input.Password {...field} placeholder="Mật khẩu:" />
                )}
            />
            {errors.matKhau && (
                <p className="text-[16px] text-red-600">
                    {errors.matKhau.message}
                </p>
            )}

            <div className="text-white mt-10">Email: </div>
            <Controller
                control={control}
                name="email"
                render={({ field }) => (
                    <Input {...field} placeholder="Email:" />
                )}
            />
            {errors.email && (
                <p className="text-[16px] text-red-600">
                    {errors.email.message}
                </p>
            )}

            <div className="text-white mt-10">Mã nhóm: </div>
            <Controller
                control={control}
                name="maNhom"
                render={({ field }) => (
                    <Input {...field} placeholder="Mã nhóm:" />
                )}
            />
            {errors.maNhom && (
                <p className="text-[16px] text-red-600">
                    {errors.maNhom.message}
                </p>
            )}

            <div className="text-white mt-10">Số điện thoại: </div>
            <Controller
                control={control}
                name="soDt"
                render={({ field }) => (
                    <Input {...field} placeholder="Số điện thoại:" />
                )}
            />
            {errors.soDt && (
                <p className="text-[16px] text-red-600">
                    {errors.soDt.message}
                </p>
            )}

            <div className="text-center">
                <Button
                    htmlType="submit"
                    danger
                    type="primary"
                    className="mt-20"
                    size="large"
                    loading={isFetchingRegister}
                >
                    Đăng ký
                </Button>
            </div>
            <div className="text-right mt-20">
                <span className="text-white">Bạn đã có tài khoản? </span>
                <p
                    className="inline-block cursor-pointer text-red-500 underline italic"
                    onClick={() => navigate("/login")}
                >
                    Đăng nhập
                </p>
                <span
                    className="block cursor-pointer mt-[5px] text-white"
                    onClick={() => navigate("/")}
                >
                    Trở về trang chủ.
                </span>
            </div>
        </form>
    );
};
