import { useQuery } from "@tanstack/react-query";
import { quanLyPhimServices } from "services/quanLyPhim.services";
import { sleep } from "utils";

export const QUERY_KEY_PHIM_LIST = "GetDanhSachPhim";

export const useGetPhimList = () => {
    //using react query call data
    const q = useQuery({
        queryKey: [QUERY_KEY_PHIM_LIST],
        queryFn: async () => {
            await sleep();
            return quanLyPhimServices.getPhimList();
        },
    });

    return { ...q, data: q.data?.data?.content };
};
