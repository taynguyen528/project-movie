import { useGetMovieInfo } from "hooks/apiHooks";
import styled from "styled-components";
import { format } from "date-fns";
import { Rate, Tag } from "antd";

export const MovieDetailTemplate = () => {
    const { data } = useGetMovieInfo();

    const formattedDate = data?.ngayKhoiChieu
        ? format(new Date(data.ngayKhoiChieu), "dd/MM/yyyy")
        : "";

    return (
        <>
            <MovieDetailStyled>
                <div className="container mx-auto">
                    <Title>Thông tin phim</Title>
                    <hr />
                    <MovieDetail>
                        <MovieImage src={data?.hinhAnh} alt="imagePhim" />
                        <div>
                            <TitleMovie>
                                Tên Phim: {data?.tenPhim}
                                <HotTag color="#f50">
                                    {data?.hot ? "HOT" : "LOW"}
                                </HotTag>
                            </TitleMovie>
                            <DescriptionMovie>
                                Mô tả: {data?.moTa}
                            </DescriptionMovie>
                            <MovieInfoItem>
                                Ngày khởi chiếu: {formattedDate}
                            </MovieInfoItem>
                            <MovieInfoItem>
                                Đánh giá:{" "}
                                <Rate
                                    disabled
                                    count={10}
                                    value={data?.danhGia || 0}
                                />
                            </MovieInfoItem>
                            <hr />
                            <CinemaInfo></CinemaInfo>
                        </div>
                    </MovieDetail>
                </div>
            </MovieDetailStyled>
        </>
    );
};

const MovieDetailStyled = styled.div`
    background: #111018;
`;

const Title = styled.div`
    color: white;
    font-size: 40px;
    font-weight: 700;
`;

const MovieDetail = styled.div`
    display: flex;
    padding: 30px 0;
    gap: 50px;
`;

const MovieImage = styled.img`
    width: 600px;
    height: 600px;
    object-fit: contain;
`;

const TitleMovie = styled.div`
    font-size: 30px;
    font-weight: 600;
    color: white;
    padding: 30px 0;
    position: relative;
`;

const HotTag = styled(Tag)`
    position: absolute;
    top: -10px;
    right: -10px;
    transform: translate(0%, -35%);
    font-size: 14px;
`;

const DescriptionMovie = styled.div`
    font-size: 16px;
    padding-bottom: 30px;
    color: white;
`;

const MovieInfoItem = styled.div`
    font-size: 20px;
    padding-bottom: 30px;
    color: white;
`;

const CinemaInfo = styled.div``;
