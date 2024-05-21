import { Button, Card, Skeleton } from "antd";
import { PATH } from "constant";
import { useGetPhimList } from "hooks/api";
import { generatePath, useNavigate } from "react-router-dom";

export const HomeTemplate = () => {
    const { data: phimList, isFetching: isFetchingPhimList } = useGetPhimList();

    const navigate = useNavigate();
    if (isFetchingPhimList) {
        return (
            <div className="grid grid-cols-5 gap-20">
                {[...Array(20)].map((_, index) => (
                    <Card
                        hoverable
                        key={index}
                        style={{ width: 240 }}
                        cover={<Skeleton.Image />}
                    >
                        <Card.Meta
                            title={
                                <Skeleton.Input
                                    active
                                    className="!w-full !h-[300px]"
                                />
                            }
                        />
                        <Skeleton.Button active className="mt-10" />
                    </Card>
                ))}
            </div>
        );
    }
    return (
        <div className="grid grid-cols-5 gap-20">
            {phimList?.map((phim) => (
                <Card
                    hoverable
                    key={phim.maPhim}
                    style={{ width: 240 }}
                    cover={<img alt="..." src={phim.hinhAnh} />}
                >
                    <Card.Meta title={phim.tenPhim} />
                    <Button
                        type="primary"
                        className="mt-20"
                        onClick={() => {
                            const path = generatePath(PATH.movieDetail, {
                                movieId: phim.maPhim,
                            });
                            navigate(path);
                        }}
                    >
                        Chi tiết
                    </Button>
                </Card>
            ))}
        </div>
    );
};
