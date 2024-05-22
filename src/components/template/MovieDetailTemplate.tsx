import { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { Rate, Tabs, Tag } from "antd";
import { getCinemaMovieById } from "apis/movieApi";
import { useGetMovieInfo } from "hooks/apiHooks";
import { format } from "date-fns";

export const MovieDetailTemplate = () => {
    const { movieId } = useParams<{ movieId: string }>();
    const { data } = useGetMovieInfo();
    const [cinemaMovie, setCinemaMovie] = useState<any>({});
    const [selectedCumRap, setSelectedCumRap] = useState<any>(null);
    const [selectedLichChieu, setSelectedLichChieu] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (movieId) {
                    const movieData = await getCinemaMovieById(movieId);
                    setCinemaMovie(movieData);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [movieId]);

    const formattedDate = data?.ngayKhoiChieu
        ? format(new Date(data.ngayKhoiChieu), "dd/MM/yyyy")
        : "";

    const items = cinemaMovie?.heThongRapChieu?.map((heThongRap: any, index: number) => {
        return {
            label: (
                <img
                    style={{ width: 50 }}
                    src={heThongRap.logo}
                    alt={heThongRap.maHeThongRap}
                />
            ),
            key: heThongRap.maHeThongRap.toString() + index,
            children: (
                <>
                    {heThongRap.cumRapChieu.map((cumRap: any) => (
                        <CumRapContainer
                            key={cumRap.maCumRap}
                            onClick={() => {
                                setSelectedCumRap(cumRap);
                                setSelectedLichChieu(null); // Reset selectedLichChieu when cumRap changes
                            }}
                        >
                            <h4>{cumRap.tenCumRap}</h4>
                            <ul>
                                {cumRap.lichChieuPhim.map((lichChieu: any) => (
                                    <LichChieuItem
                                        key={lichChieu.maLichChieu}
                                        onClick={(e) => {
                                            e.stopPropagation(); // Prevent triggering cumRap click event
                                            setSelectedLichChieu(lichChieu);
                                        }}
                                    >
                                        <span>{format(new Date(lichChieu.ngayChieuGioChieu), "dd/MM/yyyy HH:mm")}</span>{" "}
                                        <span>{lichChieu.tenRap}</span>
                                    </LichChieuItem>
                                ))}
                            </ul>
                        </CumRapContainer>
                    ))}
                </>
            ),
        };
    });

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
                            <CinemaInfo>
                                <TitleCinema>Hệ thống rạp chiếu</TitleCinema>
                                <Tabs
                                    style={{ height: 220 }}
                                    defaultActiveKey="0"
                                    items={items}
                                />
                            </CinemaInfo>
                            {selectedCumRap && (
                                <CinemaDetail>
                                    <h3>Chi tiết cụm rạp</h3>
                                    <div>
                                        <h4>{selectedCumRap.tenCumRap}</h4>
                                        <ul>
                                            {selectedCumRap.lichChieuPhim.map((lichChieu: any) => (
                                                <LichChieuItem
                                                    key={lichChieu.maLichChieu}
                                                    onClick={() => setSelectedLichChieu(lichChieu)}
                                                >
                                                    <span>{format(new Date(lichChieu.ngayChieuGioChieu), "dd/MM/yyyy HH:mm")}</span>{" "}
                                                    <span>{lichChieu.tenRap}</span>
                                                </LichChieuItem>
                                            ))}
                                        </ul>
                                    </div>
                                </CinemaDetail>
                            )}
                            {selectedLichChieu && (
                                <LichChieuDetail>
                                    <h3>Chi tiết lịch chiếu</h3>
                                    <div>
                                        <p>Ngày chiếu: {format(new Date(selectedLichChieu.ngayChieuGioChieu), "dd/MM/yyyy HH:mm")}</p>
                                        <p>Rạp: {selectedLichChieu.tenRap}</p>
                                    </div>
                                </LichChieuDetail>
                            )}
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

const CinemaInfo = styled.div`
    margin-top: 20px;
`;

const TitleCinema = styled.div`
    font-size: 25px;
    color: white;
    margin-top: 30px;
`;

const CinemaDetail = styled.div`
    margin-top: 20px;
    padding: 20px;
    background: #222;
    border-radius: 8px;
    color: white;
`;

const LichChieuDetail = styled.div`
    margin-top: 20px;
    padding: 20px;
    background: #333;
    border-radius: 8px;
    color: white;
`;

const CumRapContainer = styled.div` 
    border: 1px solid #444;
    padding: 10px;
    margin-bottom: 10px;
    color: white;
    cursor: pointer;
`;

const LichChieuItem = styled.li`
    color: white;
    cursor: pointer;
`;

