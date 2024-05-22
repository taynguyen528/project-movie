import { QUAN_LY_RAP_API, apiInstance } from "constant";
import { Rap } from "types";

const api = apiInstance.create({
    baseURL: QUAN_LY_RAP_API,
});

export const quanLyRapServices = {
    getPartner: () => api.get<HttpResponse<Rap[]>>("LayThongTinHeThongRap"),
};
