import { MovieFormData } from "components/template/admin/AddMovieModal";
import { FormDataUpdate } from "components/template/admin/UpdateMovieModal";
import { QUAN_LY_PHIM_API, QUAN_LY_RAP_API, apiInstance } from "constant";

const apiRap = apiInstance.create({
    baseURL: QUAN_LY_RAP_API,
});

const apiMovie = apiInstance.create({
    baseURL: QUAN_LY_PHIM_API,
});

const MA_NHOM = "GP01";

const getCinemaMovieById = async (movieId: string) => {
    try {
        const response = await apiRap.get(
            `/LayThongTinLichChieuPhim?MaPhim=${movieId}`
        );
        return response.data.content;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const LayThongTinCumRapTheoHeThong = async (maHeThongRap: string) => {
    try {
        const response = await apiRap.get(
            `/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThongRap}`
        );
        return response.data.content;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const getListMovieTheater = async (maNhom: string = MA_NHOM) => {
    try {
        const res = await apiRap.get(
            `/LayThongTinLichChieuHeThongRap?maNhom=${maNhom}`
        );
        return res.data.content;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const getListMovie = async (maNhom: string = MA_NHOM) => {
    try {
        const res = await apiMovie.get(`/LayDanhSachPhim?maNhom=${maNhom}`);
        return res.data.content;
    } catch (error) {
        console.error(error);
        throw error;
    }
};


const addNewMovie = async (data: MovieFormData) => {
    try {
        const res = await apiMovie.post("/ThemPhimUploadHinh", data);
        return res.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const updateMovieByAdmin = async (data: FormDataUpdate) => {
    try {
        const token = localStorage.getItem("USER")
            ? JSON.parse(localStorage.getItem("USER")!).accessToken
            : "";

        if (!token) {
            throw new Error("Không tìm thấy token");
        }
        const res = await apiMovie.post("/CapNhatPhimUpload", data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const deleteMovieByAdmin = async (maPhim: number) => {
    try {
        const token = localStorage.getItem("USER")
            ? JSON.parse(localStorage.getItem("USER")!).accessToken
            : "";

        if (!token) {
            throw new Error("Không tìm thấy token");
        }
        const res = await apiMovie.delete(`/XoaPhim?MaPhim=${maPhim}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export {
    getCinemaMovieById,
    getListMovieTheater,
    getListMovie,
    addNewMovie,
    deleteMovieByAdmin,
    updateMovieByAdmin,
    LayThongTinCumRapTheoHeThong,
};
