import { QUAN_LY_RAP_API, apiInstance } from "constant";

const api = apiInstance.create({
  baseURL: QUAN_LY_RAP_API,
});

const MA_NHOM = "GP03";

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

const getListMovieTheater = async (maNhom: string = MA_NHOM) => {
  try {
    const res = await api.get(
      `/LayThongTinLichChieuHeThongRap?maNhom=${maNhom}`
    );
    return res.data.content;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { getCinemaMovieById, getListMovieTheater };
