import { bookTicket } from "apis/ticketApi";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { Button, Modal, Result, Spin } from "antd";
import { useEffect, useState } from "react";
import { QRCode } from "antd";

export const ConfirmTicketTemplate = () => {
    const location = useLocation();
    const { infoMovie, selectedSeats, totalPrice, listChair } = location.state;

    const { maLichChieu } = useParams<{ maLichChieu: string }>();

    const [isBookingSuccess, setIsBookingSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [bookingInfo, setBookingInfo] = useState({
        tenPhim: "",
        gioChieu: "",
        ngayChieu: "",
        xuatChieu: "",
        soGhe: "",
    });

    const navigate = useNavigate();

    const renderTableRows = () => {
        return selectedSeats.map((seatId: number, index: number) => {
            const chair = listChair.find(
                (chair: any) => chair.maGhe === seatId
            );
            return (
                <TableRow key={seatId}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{chair?.tenGhe}</TableCell>
                    <TableCell>{chair?.loaiGhe}</TableCell>
                    <TableCell>{chair?.giaVe.toLocaleString()} VNĐ</TableCell>
                    <TableCell>{chair?.giaVe.toLocaleString()} VNĐ</TableCell>
                </TableRow>
            );
        });
    };

    const getSeatNumberFromId = (seatId: number) => {
        const seat = listChair.find((chair: any) => chair.maGhe === seatId);
        return seat ? seat.tenGhe : "";
    };

    const handleButton = async () => {
        try {
            if (!maLichChieu) {
                console.error("MaLichChieu không tồn tại.");
                return;
            }

            const danhSachVe = selectedSeats.map((seatId: number) => ({
                maGhe: seatId,
                giaVe:
                    listChair.find((chair: any) => chair.maGhe === seatId)
                        ?.giaVe || 0,
            }));

            const result = await bookTicket({
                maLichChieu: maLichChieu,
                danhSachVe: danhSachVe,
            });

            if (result) {
                setIsBookingSuccess(true);
                setBookingInfo({
                    tenPhim: infoMovie?.tenPhim,
                    gioChieu: infoMovie?.gioChieu,
                    ngayChieu: infoMovie?.ngayChieu,
                    xuatChieu: infoMovie?.tenCumRap + " - " + infoMovie?.tenRap,
                    soGhe: selectedSeats
                        .map((seatId: number) => getSeatNumberFromId(seatId))
                        .join(", "),
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (isLoading) {
            setTimeout(() => {
                navigate("/");
            }, 2000);
        }
    }, [isLoading, navigate]);

    const handleCancel = () => {
        setIsBookingSuccess(false);
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            navigate("/");
        }, 2000);
    };
    return (
        <ConfirmTicketStyled>
            {isLoading && (
                <LoadingOverlay>
                    <Spin size="large" />
                </LoadingOverlay>
            )}
            <div className="container mx-auto">
                <Title>Thông tin vé</Title>
                <hr />
                <InfoMovie>
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
                        <p>
                            <b>Rạp:</b> {infoMovie?.tenCumRap}
                        </p>
                        <p>
                            <b>Suất chiếu:</b>{" "}
                            {infoMovie?.gioChieu + " - " + infoMovie?.ngayChieu}
                        </p>
                        <p>
                            <b>Phòng chiếu:</b> {infoMovie?.tenRap}
                        </p>
                    </Column>
                </InfoMovie>
                <Title>Chi tiết</Title>
                <hr />
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHeaderCell>STT</TableHeaderCell>
                            <TableHeaderCell>Ghế</TableHeaderCell>
                            <TableHeaderCell>Loại ghế</TableHeaderCell>
                            <TableHeaderCell>Đơn giá</TableHeaderCell>
                            <TableHeaderCell>Thành tiền</TableHeaderCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>{renderTableRows()}</TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell
                                colSpan={4}
                                style={{ textAlign: "right" }}
                            >
                                Tổng cộng:
                            </TableCell>
                            <TableCell>
                                {totalPrice.toLocaleString()} VNĐ
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
                <WrapButton>
                    <ButtonConfirmPayment onClick={handleButton}>
                        Xác nhận thanh toán
                    </ButtonConfirmPayment>
                </WrapButton>
            </div>
            <Modal
                open={isBookingSuccess}
                footer={[
                    <Button
                        type="primary"
                        key="console"
                        onClick={() => {
                            setIsLoading(true);
                        }}
                    >
                        Trở về trang chủ
                    </Button>,
                ]}
                onCancel={handleCancel}
            >
                <Result
                    status="success"
                    title="Đặt vé thành công"
                    subTitle={
                        <>
                            <p>
                                <b>Tên phim:</b> {bookingInfo?.tenPhim}
                            </p>
                            <p>
                                <b>Xuất chiếu:</b> {bookingInfo?.xuatChieu}
                            </p>
                            <p>
                                <b>Ngày chiếu: </b>
                                {bookingInfo?.ngayChieu +
                                    " - " +
                                    bookingInfo?.gioChieu}
                            </p>
                            <p>
                                <b>Ghế đặt:</b> {bookingInfo?.soGhe}
                            </p>
                            <p
                                style={{
                                    fontSize: 18,
                                    color: "black",
                                    fontWeight: 600,
                                    marginBottom: 10,
                                    marginTop: 10,
                                }}
                            >
                                Cảm ơn quý khách đã đặt vé của chúng tôi.
                            </p>
                            <hr />
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    marginTop: 10,
                                    marginBottom: 10,
                                }}
                            >
                                <QRCode value="https://example.com" />
                            </div>
                            <hr />
                            <p
                                style={{
                                    fontSize: 18,
                                    color: "black",
                                    fontWeight: 600,
                                    marginBottom: 10,
                                }}
                            >
                                Vui lòng xuất trình mã QR tại quầy để nhận vé
                            </p>
                        </>
                    }
                />
            </Modal>
        </ConfirmTicketStyled>
    );
};

const ConfirmTicketStyled = styled.div`
    background: #111018;
    padding: 20px;
`;

const Title = styled.div`
    color: white;
    font-size: 35px;
    font-weight: 700;
`;

const InfoMovie = styled.div`
    padding-top: 20px;
    display: flex;
    gap: 30px;
    color: white;
`;

const Column = styled.div`
    padding: 10px;
    font-size: 25px;

    b {
        color: #e4d804;
    }
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
`;

const TableHeader = styled.thead`
    background-color: #333;
    color: white;
`;

const TableHeaderCell = styled.th`
    padding: 10px;
    text-align: left;
`;

const TableBody = styled.tbody``;

const TableFooter = styled.tfoot`
    background-color: #333;
    color: white;
`;

const TableRow = styled.tr`
    color: white;
`;

const TableCell = styled.td`
    padding: 10px;
`;

const WrapButton = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
`;

const ButtonConfirmPayment = styled.button`
    background: red;
    padding: 10px 20px;
    color: white;
    border-radius: 8px;
    font-size: 18px;
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
