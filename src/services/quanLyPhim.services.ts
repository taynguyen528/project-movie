import { QUAN_LY_PHIM_API, apiInstance } from "constant";
import { Phim } from "types";

const api = apiInstance.create({
    baseURL: QUAN_LY_PHIM_API,
});

export const quanLyPhimServices = {
    getPhimList: () => api.get<HttpResponse<Phim[]>>("LayDanhSachPhim"),
    getMovieById: ({ query = "" } = {}) =>
        api.get<HttpResponse<Phim>>(`/LayThongTinPhim${query}`),
    getCinemaMovieById: ({ query = "" } = {}) =>
        api.get(`/LayThongTinLichChieuPhim${query}`),
    getBannerPhim: () => api.get("/LayDanhSachBanner"),
};
