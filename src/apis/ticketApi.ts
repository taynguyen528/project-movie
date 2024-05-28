import { QUAN_LY_PHONG_VE_API, QUAN_LY_RAP_API, apiInstance } from "constant";

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
        console.error(error);
    }
};

export { getListBoxOffice };
