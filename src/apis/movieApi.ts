import { QUAN_LY_RAP_API, apiInstance } from "constant";

const api = apiInstance.create({
    baseURL: QUAN_LY_RAP_API,
});

const getCinemaMovieById = async (movieId: string) => {
    try {
        const response = await api.get(
            `/LayThongTinLichChieuPhim?MaPhim=${movieId}`
        );
        return response.data.content;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export { getCinemaMovieById };
