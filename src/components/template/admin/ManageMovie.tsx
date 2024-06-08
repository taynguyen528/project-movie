import React, { useState, useEffect } from "react";
import { Table, Button, Space, Modal } from "antd";
import { ColumnsType } from "antd/es/table";
import moment from "moment";
import styled from "styled-components";
import { deleteMovieByAdmin, getListMovie } from "apis/movieApi";
import { AddMovieModal } from "./AddMovieModal";
import { toast } from "react-toastify";
import { UpdateMovieModal } from "./UpdateMovieModal";
import { Phim } from "types";
import { ShowTimeModal } from "./ShowTimeModal";

export const ManageMovie: React.FC = () => {
    const [dataMovie, setDataMovie] = useState<Phim[]>([]);
    const [isAddModalVisible, setIsAddModalVisible] = useState<boolean>(false);
    const [modalEditVisible, setIsEditModalVisible] = useState<boolean>(false);
    const [modalDeleteVisible, setModalDeleteVisible] =
        useState<boolean>(false);
    const [movieToDelete, setMovieToDelete] = useState<Phim | null>(null);
    const [modalShowTimes, setModalShowTimes] = useState<boolean>(false);

    const [movieEdit, setMovieEdit] = useState<Phim | null>(null);
    const [movieSelect, setMovieSelect] = useState<number>();

    const fetchData = async () => {
        try {
            const res = await getListMovie();
            setDataMovie(res);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleEdit = (record: Phim) => {
        setIsEditModalVisible(true);
        setMovieEdit(record);
    };

    const handleButtonShowTime = (record: Phim) => {
        setMovieSelect(record.maPhim);
        setModalShowTimes(true);
    };

    const showDeleteConfirm = (movie: Phim) => {
        setMovieToDelete(movie);
        setModalDeleteVisible(true);
    };

    const handleDelete = async () => {
        if (!movieToDelete) return;
        try {
            const res = await deleteMovieByAdmin(movieToDelete.maPhim);
            if (res.statusCode === 200) {
                toast.success(res.content);
                fetchData();
                setModalDeleteVisible(false);
            }
        } catch (error: any) {
            toast.error(error.response.data.content);
        }
    };

    const handleDesc = (text: string, maxLength: number) => {
        if (text.length > maxLength) {
            return `${text.substring(0, maxLength)}...`;
        }
        return text;
    };

    const columns: ColumnsType<Phim> = [
        {
            title: "Mã phim",
            dataIndex: "maPhim",
            key: "maPhim",
        },
        {
            title: "Hình ảnh",
            dataIndex: "hinhAnh",
            key: "hinhAnh",
            render: (text: string) => <StyledImage src={text} alt="movie" />,
        },
        {
            title: "Tên phim",
            dataIndex: "tenPhim",
            key: "tenPhim",
        },
        {
            title: "Đánh giá",
            dataIndex: "danhGia",
            key: "danhGia",
            render: (text: number) => `${text}/10`,
        },
        {
            title: "Mô tả",
            dataIndex: "moTa",
            key: "moTa",
            render: (text: string) => handleDesc(text, 100),
        },
        {
            title: "Ngày khởi chiếu",
            dataIndex: "ngayKhoiChieu",
            key: "ngayKhoiChieu",
            render: (text: string) => moment(text).format("DD/MM/YYYY"),
        },
        {
            title: "",
            key: "action",
            render: (_, record: Phim) => (
                <Space size="middle">
                    <ButtonUpdateMovie
                        type="primary"
                        onClick={() => handleEdit(record)}
                    >
                        Cập nhật
                    </ButtonUpdateMovie>
                    <ButtonDeleteMovie
                        onClick={() => showDeleteConfirm(record)}
                    >
                        Xóa
                    </ButtonDeleteMovie>
                    <Button
                        type="primary"
                        onClick={() => handleButtonShowTime(record)}
                    >
                        Tạo lịch chiếu
                    </Button>
                </Space>
            ),
        },
    ];

    const showModal = () => {
        setIsAddModalVisible(true);
    };

    const handleAddModalOk = () => {
        setIsAddModalVisible(false);
        fetchData();
    };

    const handleUpdateModalOk = () => {
        setIsEditModalVisible(false);
        fetchData();
    };

    const handleAddModalCancel = () => {
        setIsAddModalVisible(false);
    };

    const handleShowTimeModalOk = () => {
        setModalShowTimes(false);
    };

    return (
        <div>
            <Space
                direction="vertical"
                style={{ width: "100%", marginBottom: "20px" }}
            >
                <ButtonAddNewMovie type="primary" onClick={showModal}>
                    Thêm mới phim
                </ButtonAddNewMovie>
            </Space>
            <Table
                columns={columns}
                dataSource={dataMovie}
                rowKey="maPhim"
                pagination={{ position: ["bottomCenter"], pageSize: 8 }}
            />
            <AddMovieModal
                visible={isAddModalVisible}
                onOk={handleAddModalOk}
                onCancel={handleAddModalCancel}
            />
            <UpdateMovieModal
                visible={modalEditVisible}
                onClose={() => setIsEditModalVisible(false)}
                fetchData={fetchData}
                onOk={handleUpdateModalOk}
                movieEdit={movieEdit}
            />
            <ShowTimeModal
                visible={modalShowTimes}
                onClose={() => setModalShowTimes(false)}
                fetchData={fetchData}
                onOk={handleShowTimeModalOk}
                IdMovieSelect={movieSelect}
            />
            <Modal
                title="Xác nhận xóa"
                open={modalDeleteVisible}
                onOk={handleDelete}
                onCancel={() => setModalDeleteVisible(false)}
            >
                <p>
                    Bạn có chắc chắn muốn xóa phim "{movieToDelete?.tenPhim}"
                    với mã phim: "{movieToDelete?.maPhim}" không?
                </p>
            </Modal>
        </div>
    );
};

const StyledImage = styled.img`
    width: 150px;
    height: auto;
`;

const ButtonDeleteMovie = styled(Button)`
    background: red !important;
    color: white !important;
`;

const ButtonUpdateMovie = styled(Button)`
    background: #28a745 !important;
`;

const ButtonAddNewMovie = styled(Button)`
    margin-bottom: 20px;
`;
