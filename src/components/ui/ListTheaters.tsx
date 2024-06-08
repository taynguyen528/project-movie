import { Tabs, Tag } from "antd";
import { getListMovieTheater } from "apis/movieApi";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { DanhSachPhim, InfoRap, LstCumRap, LstLichChieuTheoPhim } from "types";
import { format } from "date-fns";
import { NavLink } from "react-router-dom";

export const ListTheaters = () => {
    const [dataTheater, setDataTheater] = useState([]);
    const [activeTheater, setActiveTheater] = useState<string>();

    const fetchData = async () => {
        try {
            const res = await getListMovieTheater();
            setDataTheater(res);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleTheaterClick = (theaterId: string) => {
        setActiveTheater(theaterId);
    };

    const generateTabItems = () => {
        if (!dataTheater.length) return [];
        return dataTheater.map((theater: InfoRap, index) => ({
            key: String(index + 1),
            label: (
                <img
                    src={theater.logo}
                    alt={theater.maHeThongRap}
                    style={{ width: 70 }}
                />
            ),
            children: (
                <Tabs
                    defaultActiveKey="1"
                    tabPosition="left"
                    items={renderTheatersTabLeft(theater.lstCumRap)}
                    style={{
                        maxHeight: "70vh",
                    }}
                />
            ),
        }));
    };

    const renderTheatersTabLeft = (lstCumRap: any) => {
        return lstCumRap.map((cumRap: LstCumRap, index: number) => ({
            key: String(index + 1),
            label: (
                <TabChildrenLeft
                    className={
                        activeTheater === cumRap.maCumRap ? "active" : ""
                    }
                    onClick={() => handleTheaterClick(cumRap.maCumRap)}
                >
                    <p>Tên rạp: {cumRap.tenCumRap}</p>
                    <p>Địa chỉ: {cumRap.diaChi}</p>
                </TabChildrenLeft>
            ),
            children: (
                <Tabs
                    defaultActiveKey="1"
                    tabPosition="left"
                    items={renderTheatersTabRight(cumRap.danhSachPhim)}
                    style={{
                        maxHeight: "70vh",
                    }}
                />
            ),
        }));
    };

    const renderTheatersTabRight = (danhSachPhim: any) => {
        return danhSachPhim.map((phim: DanhSachPhim, index: number) => ({
            key: String(index + 1),
            label: (
                <TabChildrenRight>
                    <WrapInfo>
                        <img
                            src={phim.hinhAnh}
                            alt={phim.tenPhim}
                            style={{
                                width: 200,
                                height: 300,
                                objectFit: "cover",
                            }}
                        />
                        <WrapInfoRight>
                            <NameMovie>
                                <MovieLink to={`/movie/${phim.maPhim}`}>
                                    {phim.tenPhim}
                                    <HotTag color="#f50">
                                        {phim?.hot ? "HOT" : "LOW"}
                                    </HotTag>
                                </MovieLink>
                            </NameMovie>
                            <Showtime>Lịch chiếu:</Showtime>
                            <ButtonWrapper>
                                {phim.lstLichChieuTheoPhim.map(
                                    (
                                        lichChieu: LstLichChieuTheoPhim,
                                        index: number
                                    ) => (
                                        <NavLink
                                            key={index}
                                            to={`/selectSeat/${lichChieu.maLichChieu}`}
                                            style={{ textDecoration: "none" }}
                                        >
                                            <ButtonShowTime>
                                                {format(
                                                    new Date(
                                                        lichChieu.ngayChieuGioChieu
                                                    ),
                                                    "dd/MM/yyyy HH:mm:ss"
                                                )}
                                            </ButtonShowTime>
                                        </NavLink>
                                    )
                                )}
                            </ButtonWrapper>
                        </WrapInfoRight>
                    </WrapInfo>
                </TabChildrenRight>
            ),
        }));
    };

    return (
        <ListTheatersStyled>
            <div className="container mx-auto">
                <Title>Danh sách rạp phim</Title>
                <Tabs
                    defaultActiveKey="1"
                    tabPosition="top"
                    items={generateTabItems()}
                />
            </div>
        </ListTheatersStyled>
    );
};

const ListTheatersStyled = styled.div`
    padding: 20px;
    background: #1f1e24;

    .ant-tabs-tab-btn {
        width: 100%;
    }
`;

const Title = styled.div`
    color: #fff;
    font-size: 30px;
    font-weight: 700;
    margin: 20px 0;
`;

const TabChildrenLeft = styled.div`
    color: white;
    font-size: 18px;
    font-weight: 600;
    min-width: 50%;
    transition: 0.5s all;
    max-width: 40vw;
    white-space: wrap;
    cursor: pointer;

    &:hover {
        color: rgba(255, 255, 0, 0.7);
    }

    &.active {
        color: yellow;
    }
`;

const TabChildrenRight = styled.div`
    color: white;
    max-width: 100vh;
`;

const HotTag = styled(Tag)`
    position: absolute;
    top: -10px;
    right: -10px;
    transform: translate(-10%, -25%);
    font-size: 14px;
`;

const WrapInfo = styled.div`
    display: flex;
    gap: 20px;
`;

const NameMovie = styled.p`
    font-size: 25px;
    margin-right: auto;
    color: white !important;
`;

const Showtime = styled.div`
    font-size: 20px;
    margin-right: auto;
    margin-bottom: 10px;
    cursor: default;
`;

const WrapInfoRight = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
`;

const ButtonWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    max-height: 70vh;
    overflow-y: auto;
`;

const ButtonShowTime = styled.button`
    border: 2px solid #ccc;
    padding: 10px 20px;
    border-radius: 8px;
    white-space: normal;
`;

const MovieLink = styled(NavLink)`
    text-decoration: none;
    color: white !important;
    transition: 1s all !important;

    &:hover {
        color: rgba(255, 255, 0, 0.7) !important;
    }
`;
