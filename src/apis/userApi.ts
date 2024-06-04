import { QUAN_LY_NGUOI_DUNG_API, apiInstance } from "constant";
import { IUserUpdate } from "ui";

const api = apiInstance.create({
    baseURL: QUAN_LY_NGUOI_DUNG_API,
});

const getInfoUser = async () => {
    try {
        const token = localStorage.getItem("USER")
            ? JSON.parse(localStorage.getItem("USER")!).accessToken
            : "";

        if (!token) {
            throw new Error("Không tìm thấy token");
        }

        const res = await api.post("/ThongTinTaiKhoan", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const updateInfoUser = async (userInfo: IUserUpdate) => {
    try {
        const token = localStorage.getItem("USER")
            ? JSON.parse(localStorage.getItem("USER")!).accessToken
            : "";

        if (!token) {
            throw new Error("Không tìm thấy token");
        }

        const res = await api.put("/CapNhatThongTinNguoiDung", userInfo, {
            headers: {
                Authorization: `Bearer ${token}`,
            }, 
        })

        return res.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export { getInfoUser, updateInfoUser };
