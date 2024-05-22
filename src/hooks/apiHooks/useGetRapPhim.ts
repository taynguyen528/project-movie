import { useQuery } from "@tanstack/react-query";
import { quanLyRapServices } from "services";

export const useGetRapPhim = () => {
    // call api
    const q = useQuery({
        queryKey: ["RapPhim"],
        queryFn: () => quanLyRapServices.getPartner(),
    });

    return {
        ...q,
        data: q?.data?.data?.content,
    };
};
