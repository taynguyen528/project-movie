import { QUAN_LY_NGUOI_DUNG_API, apiInstance } from "constant";
import { LoginType, RegisterType } from "schemas";
import { UserInfo, UserLogin } from "types";

const api = apiInstance.create({
    baseURL: QUAN_LY_NGUOI_DUNG_API,
});

export const qlNguoiDungServices = {
    dangKy: (payload: RegisterType) => api.post("/DangKy", payload),
    dangNhap: (payload: LoginType) =>
        api.post<HttpResponse<UserLogin>>("/DangNhap", payload),
    getUserInfo: () => api.post<HttpResponse<UserInfo>>("/ThongTinTaiKhoan"),
};
