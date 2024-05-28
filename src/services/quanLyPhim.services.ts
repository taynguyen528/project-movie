import { QUAN_LY_PHIM_API, apiInstance } from "constant";
import { Phim } from "types";

const api = apiInstance.create({
    baseURL: QUAN_LY_PHIM_API,
});

export const quanLyPhimServices = {
    getPhimList: (maNhom: string) =>
        api.get<HttpResponse<Phim[]>>(`LayDanhSachPhim?maNhom=${maNhom}`),
    getMovieById: ({ query = "" } = {}) =>
        api.get<HttpResponse<Phim>>(`/LayThongTinPhim${query}`),
    // getMovieById: (MaPhim: number) =>
    //     api.get<HttpResponse<Phim>>(`/LayThongTinPhim?MaPhim=${MaPhim}`),
    getBannerPhim: () => api.get("/LayDanhSachBanner"),
};
