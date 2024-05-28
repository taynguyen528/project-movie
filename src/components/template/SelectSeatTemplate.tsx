import { getListBoxOffice } from "apis/ticketApi";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { InfoGhe, InfoPhim } from "types";

export const SelectSeatTemplate = () => {
  const { maLichChieu } = useParams<{ maLichChieu: string }>();

  const [infoMovie, setInfoMovie] = useState<InfoPhim>();
  const [listChair, setListChair] = useState<InfoGhe[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);

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
      setSelectedSeats(selectedSeats.filter(id => id !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  return (
    <SelectSeatStyled>
      <div className="container mx-auto">
        <Title>Chọn ghế ngồi</Title>
        <hr />
        <SelectSeatDetail>
          <InfoMovie>
            <TitleMovie>Tên phim: {infoMovie?.tenPhim}</TitleMovie>
            <NameCinema>
              Tên rạp: {infoMovie?.tenCumRap + " - " + infoMovie?.tenRap}
            </NameCinema>
            <TitleCinema>
              Xuất chiếu: {infoMovie?.gioChieu + " - " + infoMovie?.ngayChieu}
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

const SeatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(50px, 1fr));
  gap: 10px;
  margin-top: 20px;
`;

const Seat = styled.div<{ available: boolean; selected: boolean; vip: boolean }>`
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
