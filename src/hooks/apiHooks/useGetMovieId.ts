import { useQuery } from "@tanstack/react-query";
import { quanLyPhimServices } from "services";
import qs from "qs";
import { useParams } from "react-router-dom";

export const useGetMovieInfo = () => {
    const { movieId } = useParams<{ movieId: string }>();
    const q = useQuery({
        queryKey: ["MovieDetail", movieId],
        queryFn: () => {
            const query = qs.stringify(
                {
                    MaPhim: movieId,
                },
                {
                    addQueryPrefix: true,
                }
            );
            return quanLyPhimServices.getMovieById({ query });
        },
    });

    return {
        ...q,
        data: q?.data?.data?.content,
    };
};
