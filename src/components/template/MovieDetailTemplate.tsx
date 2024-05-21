import { useQuery } from "@tanstack/react-query";
import { Modal } from "antd";
import { useParams } from "react-router-dom";
import { quanLyPhimServices } from "services/quanLyPhim.services";
import qs from "qs";

export const MovieDetailTemplate = () => {
    const { movieId } = useParams<{ movieId: string }>();

    console.log("movieId", movieId);

    const { data } = useQuery({
        queryKey: ["MovideDetail", movieId],
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
    console.log("data", data);
    return (
        <div>
            MovieDetailTemplate
            <Modal />
        </div>
    );
};
