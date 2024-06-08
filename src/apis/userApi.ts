
import { AddNewUserInfo } from "components/template/admin/AddUserModal";
import { UserInfo } from "components/template/admin/UpdateUserModal";
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
        });

        return res.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const MA_NHOM = "GP03";

const getListUser = async () => {
    try {
        const res = await api.get(`/LayDanhSachNguoiDung?MaNhom=${MA_NHOM}`);
        return res.data.content;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const deleteUser = async (taiKhoan: string) => {
    try {
        const res = await api.delete(`XoaNguoiDung?TaiKhoan=${taiKhoan}`);
        return res.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const updateUserByAdmin = async (userInfo: UserInfo) => {
    try {
        const token = localStorage.getItem("USER")
            ? JSON.parse(localStorage.getItem("USER")!).accessToken
            : "";

        if (!token) {
            throw new Error("Không tìm thấy token");
        }

        const res = await api.post("/CapNhatThongTinNguoiDung", userInfo, {
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

const addNewUserByAdmin = async (data: AddNewUserInfo) => {
    try {
        const token = localStorage.getItem("USER")
            ? JSON.parse(localStorage.getItem("USER")!).accessToken
            : "";

        if (!token) {
            throw new Error("Không tìm thấy token");
        }

        const res = await api.post("/ThemNguoiDung", data, {
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

export {
    getInfoUser,
    updateInfoUser,
    getListUser,
    deleteUser,
    updateUserByAdmin,
    addNewUserByAdmin,
};
