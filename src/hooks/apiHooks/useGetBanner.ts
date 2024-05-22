import { useQuery } from "@tanstack/react-query";
import { quanLyPhimServices } from "services";

export const useGetBanner = () => {
    const q = useQuery({
        queryKey: ["GetBanner"],
        queryFn: () => quanLyPhimServices.getBannerPhim(),
    });

    return {
        ...q,
        data: q?.data?.data?.content,
    };
};
