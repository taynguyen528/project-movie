import { useEffect, useState } from "react";
import styled from "styled-components";
import { TreeSelect, Select, Modal, Button as AntButton } from "antd";
import { format } from "date-fns";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { useNavigate } from "react-router-dom";

const { TreeNode } = TreeSelect;
const { Option } = Select;

export const CinemaInfo = (props: { cinemaMovie: any }) => {
    const { cinemaMovie } = props;
    const [selectedRap, setSelectedRap] = useState<string | undefined>();
    const [lichChieu, setLichChieu] = useState<any[]>([]);
    const [selectedShowtime, setSelectedShowtime] = useState<string | undefined>();
    const [isBookingEnabled, setIsBookingEnabled] = useState<boolean>(false);
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const navigate = useNavigate();

    const { userLogin } = useSelector((state: RootState) => state.quanLyNguoiDung);

    useEffect(() => {
        if (selectedRap) {
            const rap = cinemaMovie.heThongRapChieu.flatMap((heThongRap: any) =>
                heThongRap.cumRapChieu.filter(
                    (cumRap: any) => cumRap.maCumRap === selectedRap
                )
            )[0];
            setLichChieu(rap?.lichChieuPhim || []);
        } else {
            setLichChieu([]);
        }
        setSelectedShowtime(undefined);
    }, [selectedRap, cinemaMovie]);

    useEffect(() => {
        setIsBookingEnabled(
            selectedRap !== undefined && selectedShowtime !== undefined
        );
    }, [selectedRap, selectedShowtime]);

    const handleRapChange = (value: string | undefined) => {
        setSelectedRap(value);
        setLichChieu([]);
        setSelectedShowtime(undefined);
    };

    const handleButton = () => {
        if (!userLogin) {
            setIsModalVisible(true);
        } else {
            alert("123");
        }
    };

    const handleOk = () => {
        setIsModalVisible(false);
        navigate("/login")
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <>
            <div>
                <TitleCinema>Hệ thống rạp chiếu</TitleCinema>
                <TreeSelect
                    showSearch
                    style={{ width: "100%" }}
                    dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
                    placeholder="Chọn rạp"
                    allowClear
                    treeDefaultExpandAll
                    onChange={handleRapChange}
                >
                    {cinemaMovie?.heThongRapChieu?.map((heThongRap: any) => (
                        <TreeNode
                            value={heThongRap.maHeThongRap}
                            title={heThongRap.tenHeThongRap}
                            key={heThongRap.maHeThongRap}
                        >
                            {heThongRap.cumRapChieu.map((cumRap: any) => (
                                <TreeNode
                                    value={cumRap.maCumRap}
                                    title={cumRap.tenCumRap}
                                    key={cumRap.maCumRap}
                                />
                            ))}
                        </TreeNode>
                    ))}
                </TreeSelect>
            </div>
            <Select
                showSearch
                style={{ width: "100%", marginTop: "20px" }}
                placeholder="Chọn suất chiếu"
                value={selectedShowtime}
                onChange={(value) => setSelectedShowtime(value)}
            >
                {lichChieu.map((lich: any) => (
                    <Option key={lich.maLichChieu} value={lich.maLichChieu}>
                        {format(
                            new Date(lich.ngayChieuGioChieu),
                            "dd/MM/yyyy HH:mm"
                        )}
                        {" - "}
                        {lich.tenRap}
                        {" - "}
                        {lich.giaVe} VNĐ
                    </Option>
                ))}
            </Select>
            <WrapButton>
                <StyledButton
                    onClick={handleButton}
                    disabled={!isBookingEnabled}
                    isDisabled={!isBookingEnabled}
                >
                    <span>Chọn ghế ngồi</span>
                </StyledButton>
            </WrapButton>
            <StyledModal
                title="Cảnh báo"
                open={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                width={700}
                footer={[
                    <AntButton key="cancel" onClick={handleCancel}>
                        Hủy
                    </AntButton>,
                    <AntButton key="ok" type="primary" onClick={handleOk}>
                        Xác nhận
                    </AntButton>,
                ]}
            >
                <ModalContent>
                    Bạn cần phải đăng nhập để thực hiện chức năng tiếp theo.
                </ModalContent>
            </StyledModal>
        </>
    );
};

const TitleCinema = styled.div`
    padding: 10px 0;
    font-size: 25px;
    color: white;
`;

const WrapButton = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
`;

const StyledButton = styled.button<{ isDisabled?: boolean }>`
    background: red;
    padding: 10px 20px;
    color: white;
    border-radius: 8px;
    cursor: ${({ isDisabled }) => (isDisabled ? "not-allowed" : "pointer")};
    opacity: ${({ isDisabled }) => (isDisabled ? "0.6" : "1")};
    font-size: 18px;
`;

const StyledModal = styled(Modal)`
    .ant-modal-title {
        font-size: 24px !important;
    }
    
    .ant-modal-content {
        font-size: 18px;
    }
`;

const ModalContent = styled.p`
    font-size: 18px;
    height: 50px;
`;

