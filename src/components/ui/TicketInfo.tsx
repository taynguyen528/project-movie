import { getInfoUser } from "apis/userApi";
import { useEffect, useState } from "react";
import { Table } from "antd";
import styled from "styled-components";
import { format } from "date-fns";

export const TicketInfo = () => {
    const [infoBookTicket, setInfoBookTicket] = useState([]);
    console.log(infoBookTicket);

    const fetchUserInfo = async () => {
        try {
            const res = await getInfoUser();
            setInfoBookTicket(res.content.thongTinDatVe);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchUserInfo();
    }, []);

    const formatDate = (isoDate: string) =>
        format(new Date(isoDate), "dd/MM/yyyy HH:mm:ss");

    const columns = [
        {
            title: "Mã vé",
            dataIndex: "maVe",
            key: "maVe",
        },
        {
            title: "Tên phim",
            dataIndex: "tenPhim",
            key: "tenPhim",
        },
        {
            title: "Ngày đặt",
            dataIndex: "ngayDat",
            key: "ngayDat",
            render: (ngayDat: any) => formatDate(ngayDat),
        },
        {
            title: "Giá vé",
            dataIndex: "giaVe",
            key: "giaVe",
        },
        {
            title: "Thời lượng phim",
            dataIndex: "thoiLuongPhim",
            key: "thoiLuongPhim",
        },
        {
            title: "Ghế đã đặt",
            dataIndex: "danhSachGhe",
            key: "danhSachGhe",
            render: (danhSachGhe: any) =>
                danhSachGhe.map((ghe: any) => ghe.tenGhe).join(", "),
        },
    ];

    return (
        <Container>
            {infoBookTicket ? (
                <>
                    <h2>Thông tin đặt vé</h2>
                    <Table
                        dataSource={infoBookTicket}
                        columns={columns}
                        rowKey="maVe"
                        pagination={{ position: ["bottomCenter"], pageSize: 8 }}
                    />
                </>
            ) : (
                <p>Đang tải thông tin</p>
            )}
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 70vh;
    padding: 20px;
    background: #f0f2f5;
    border-radius: 8px;
    margin-bottom: 40px;

    h2 {
        text-align: center;
        margin-bottom: 20px;
        font-size: 24px;
        color: #333;
        font-size: 35px;
        font-weight: bold;
    }

    .ant-table {
        background: white;
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    .ant-pagination {
        margin-top: 20px;
        display: flex;
        justify-content: center;

        .ant-pagination-item-active {
            background-color: #ccc;
            border-color: #ccc;
        }

        .ant-pagination-item {
            border-radius: 4px;
            margin: 0 5px;
        }

        .ant-pagination-prev,
        .ant-pagination-next {
            border-radius: 4px;
        }
    }
`;
