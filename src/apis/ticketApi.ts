import { FormDataShowTime } from "components/template/admin/ShowTimeModal";
import { QUAN_LY_PHONG_VE_API, apiInstance } from "constant";
import { DanhSachVe } from "types";

const api = apiInstance.create({
    baseURL: QUAN_LY_PHONG_VE_API,
});

const getListBoxOffice = async (maLichChieu: string) => {
    try {
        const res = await api.get(
            `/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`
        );
        return res.data.content;
    } catch (error) {
        console.log(error);
    }
};

const bookTicket = async (danhSachVe: DanhSachVe) => {
    try {
        const token = localStorage.getItem("USER")
            ? JSON.parse(localStorage.getItem("USER")!).accessToken
            : "";

        if (!token) {
            throw new Error("Không tìm thấy token");
        }

        const response = await api.post(
            "/DatVe",
            {
                maLichChieu: danhSachVe.maLichChieu,
                danhSachVe: danhSachVe.danhSachVe,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const createShowTime = async (formData: FormDataShowTime) => {
    try {
        const token = localStorage.getItem("USER")
            ? JSON.parse(localStorage.getItem("USER")!).accessToken
            : "";

        if (!token) {
            throw new Error("Không tìm thấy token");
        }

        const response = await api.post("/TaoLichChieu", formData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export { getListBoxOffice, bookTicket, createShowTime };
