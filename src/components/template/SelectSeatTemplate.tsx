import { Spin } from "antd";
import { getListBoxOffice } from "apis/ticketApi";
import { PATH } from "constant";
import { useEffect, useState } from "react";
import { generatePath, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { InfoGhe, InfoPhim } from "types";

export const SelectSeatTemplate = () => {
    const { maLichChieu } = useParams<{ maLichChieu: string }>();

    const [infoMovie, setInfoMovie] = useState<InfoPhim>();
    const [listChair, setListChair] = useState<InfoGhe[]>([]);
    const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const navigate = useNavigate();

    const fetchData = async (maLichChieu: string) => {
        try {
            const res = await getListBoxOffice(maLichChieu);
            setInfoMovie(res.thongTinPhim);
            setListChair(res.danhSachGhe);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (maLichChieu) {
            fetchData(maLichChieu);
        }
    }, [maLichChieu]);

    const toggleSeatSelection = (seatId: number) => {
        if (selectedSeats.includes(seatId)) {
            setSelectedSeats(selectedSeats.filter((id) => id !== seatId));
        } else {
            setSelectedSeats([...selectedSeats, seatId]);
        }
    };

    const getSelectedSeatNumbers = () => {
        return listChair
            .filter((chair) => selectedSeats.includes(chair.maGhe))
            .map((chair) => chair.tenGhe);
    };

    const calculateTotalPrice = () => {
        return listChair
            .filter((chair) => selectedSeats.includes(chair.maGhe))
            .reduce((total, chair) => total + chair.giaVe, 0);
    };

    const handleBookTicket = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            const path = generatePath(PATH.confirmTicket, {
                maLichChieu,
            });
            navigate(path, {
                state: {
                    infoMovie,
                    selectedSeats,
                    totalPrice: calculateTotalPrice(),
                    listChair,
                    maLichChieu,
                },
            });
        }, 2000);
    };

    return (
        <SelectSeatStyled>
            <div className="container mx-auto">
                {isLoading && (
                    <LoadingOverlay>
                        <Spin size="large" />
                    </LoadingOverlay>
                )}
                <Title>Chọn ghế ngồi</Title>
                <hr />
                <SelectSeatDetail>
                    <InfoMovie>
                        <TitleMovie>Tên phim: {infoMovie?.tenPhim}</TitleMovie>
                        <NameCinema>
                            Tên rạp:{" "}
                            {infoMovie?.tenCumRap + " - " + infoMovie?.tenRap}
                        </NameCinema>
                        <TitleCinema>
                            Xuất chiếu:{" "}
                            {infoMovie?.gioChieu + " - " + infoMovie?.ngayChieu}
                        </TitleCinema>
                        <TitleCinema>Địa chỉ: {infoMovie?.diaChi}</TitleCinema>
                    </InfoMovie>
                    <SeatLegend>
                        <LegendItem>
                            <LegendColor color="gray" /> Ghế thường
                        </LegendItem>
                        <LegendItem>
                            <LegendColor color="gold" /> Ghế VIP
                        </LegendItem>
                        <LegendItem>
                            <LegendColor color="red" /> Ghế đã đặt
                        </LegendItem>
                        <LegendItem>
                            <LegendColor color="green" /> Ghế đang chọn
                        </LegendItem>
                    </SeatLegend>
                    <Screen> Màn hình </Screen>
                    <SeatGrid>
                        {listChair.map((chair) => (
                            <Seat
                                key={chair.maGhe}
                                available={!chair.daDat}
                                selected={selectedSeats.includes(chair.maGhe)}
                                vip={chair.loaiGhe === "Vip"}
                                onClick={() => toggleSeatSelection(chair.maGhe)}
                            >
                                {chair.tenGhe}
                            </Seat>
                        ))}
                    </SeatGrid>
                    <ConfirmMovie>
                        <Column>
                            <img
                                src={infoMovie?.hinhAnh}
                                alt="..."
                                style={{ width: 200 }}
                            />
                        </Column>
                        <Column>
                            <p>
                                <b>Tên phim:</b> {infoMovie?.tenPhim}
                            </p>
                        </Column>
                        <Column>
                            <p>
                                <b>Rạp:</b> {infoMovie?.tenCumRap}
                            </p>
                            <p>
                                <b>Suất chiếu:</b>{" "}
                                {infoMovie?.gioChieu +
                                    " - " +
                                    infoMovie?.ngayChieu}
                            </p>
                            <p>
                                <b>Phòng chiếu:</b> {infoMovie?.tenRap}
                            </p>
                            <p>
                                <b>Ghế:</b>{" "}
                                {getSelectedSeatNumbers().join(", ")}
                            </p>
                        </Column>
                        <Column>
                            <p>
                                <b>Tổng cộng:</b>{" "}
                                {calculateTotalPrice().toLocaleString()} VNĐ
                            </p>
                        </Column>
                    </ConfirmMovie>
                    <BookTicket
                        onClick={handleBookTicket}
                        disabled={selectedSeats.length === 0}
                    >
                        Đặt vé
                    </BookTicket>
                </SelectSeatDetail>
            </div>
        </SelectSeatStyled>
    );
};

const SelectSeatStyled = styled.div`
    background: #111018;
    padding: 20px;
`;

const Title = styled.div`
    color: white;
    font-size: 40px;
    font-weight: 700;
`;

const SelectSeatDetail = styled.div`
    padding-top: 20px;
`;

const InfoMovie = styled.div`
    color: white;
`;

const TitleMovie = styled.div`
    color: white;
    font-weight: 600;
    font-size: 30px;
`;

const TitleCinema = styled.div`
    color: white;
    font-weight: 400;
    font-size: 20px;
    opacity: 0.7;
`;

const NameCinema = styled.div`
    color: white;
    font-weight: 600;
    font-size: 25px;
`;

const SeatLegend = styled.div`
    display: flex;
    gap: 20px;
    margin: 20px 0;
`;

const LegendItem = styled.div`
    display: flex;
    align-items: center;
    color: white;
    font-size: 16px;
`;

const LegendColor = styled.div<{ color: string }>`
    width: 20px;
    height: 20px;
    background-color: ${({ color }) => color};
    margin-right: 10px;
`;

const Screen = styled.div`
    background-color: white;
    color: black;
    font-weight: 700;
    text-align: center;
    padding: 10px;
    margin: 20px 0;
    font-size: 20px;
`;

const SeatGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(50px, 1fr));
    gap: 10px;
    margin-top: 20px;
`;

const Seat = styled.div<{
    available: boolean;
    selected: boolean;
    vip: boolean;
}>`
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${({ available, selected, vip }) =>
        selected ? "green" : !available ? "red" : vip ? "gold" : "gray"};
    color: white;
    cursor: ${({ available }) => (available ? "pointer" : "not-allowed")};
    opacity: ${({ available }) => (available ? 1 : 0.5)};
    pointer-events: ${({ available }) => (available ? "auto" : "none")};
`;

const ConfirmMovie = styled.div`
    display: flex;
    justify-content: space-between;
    color: white;
    margin-top: 20px;
`;

const Column = styled.div`
    flex: 1;
    padding: 10px;
    font-size: 25px;

    b {
        color: #e4d804;
    }
`;

const BookTicket = styled.button<{ disabled: boolean }>`
    width: 100%;
    font-size: 20px;
    background: ${({ disabled }) => (disabled ? "gray" : "red")};
    color: white;
    padding: 10px;
    font-weight: 600;
    cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
`;

const LoadingOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1001;
`;
