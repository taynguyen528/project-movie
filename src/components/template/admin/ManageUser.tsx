import { Table, Button, Space, Input } from "antd";
import { deleteUser, getListUser } from "apis/userApi";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import { UpdateUserModal } from "./UpdateUserModal";
import { AddUserModel } from "./AddUserModel";

const { Search } = Input;

interface InfoUser {
    taiKhoan: string;
    hoTen: string;
    email: string;
    soDT: string;
    matKhau: string;
    maLoaiNguoiDung: string;
}

export const ManageUser = () => {
    const [dataUser, setDataUser] = useState<InfoUser[]>([]);
    const [filteredData, setFilteredData] = useState<InfoUser[]>([]);
    const [modalUpdateVisible, setModalUpdateVisible] = useState(false);
    const [selectedUser, setSelectedUser] = useState<InfoUser | null>(null);
    const [modalAddNewVisible, setModalAddNewVisible] = useState(false);

    const fetchData = async () => {
        try {
            const res = await getListUser();
            setDataUser(res);
            setFilteredData(res);
        } catch (error) {
            throw error;
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async (taiKhoan: string) => {
        try {
            const res = await deleteUser(taiKhoan);
            if (res.statusCode === 200) {
                toast.success(res.content);
                fetchData();
            }
        } catch (error: any) {
            toast.error(error.response.data.content);
        }
    };

    const handleUpdate = (user: InfoUser) => {
        setSelectedUser(user);
        setModalUpdateVisible(true);
    };

    const handleAddNewUser = () => {
        setModalAddNewVisible(true);
    };

    const handleSearch = (value: string) => {
        const filtered = dataUser.filter(
            (user) =>
                user.taiKhoan.toLowerCase().includes(value.toLowerCase()) ||
                user.hoTen.toLowerCase().includes(value.toLowerCase()) ||
                user.email.toLowerCase().includes(value.toLowerCase()) ||
                user.soDT.includes(value)
        );
        setFilteredData(filtered);
    };

    const columns = [
        {
            title: "Tên tài khoản",
            dataIndex: "taiKhoan",
            key: "taiKhoan",
        },
        {
            title: "Họ tên",
            dataIndex: "hoTen",
            key: "hoTen",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Số điện thoại",
            dataIndex: "soDT",
            key: "soDT",
        },
        {
            title: "Mật khẩu",
            dataIndex: "matKhau",
            key: "matKhau",
            render: (text: string) => <Input.Password value={text} readOnly />,
        },
        {
            title: "Loại người dùng",
            dataIndex: "maLoaiNguoiDung",
            key: "maLoaiNguoiDung",
        },
        {
            title: "",
            key: "action",
            render: (_: any, record: InfoUser) => (
                <Space size="small">
                    <ButtonUpdateUser
                        type="primary"
                        onClick={() => handleUpdate(record)}
                    >
                        Chỉnh sửa
                    </ButtonUpdateUser>
                    <ButtonDeleteUser
                        onClick={() => handleDelete(record.taiKhoan)}
                    >
                        Xóa
                    </ButtonDeleteUser>
                </Space>
            ),
        },
    ];

    return (
        <>
            <Space
                direction="vertical"
                style={{ width: "100%", marginBottom: "20px" }}
            >
                <ButtonAddNewUser type="primary" onClick={() => handleAddNewUser()}>
                    Thêm mới người dùng
                </ButtonAddNewUser>
                <Search
                    placeholder="Tìm kiếm người dùng"
                    allowClear
                    enterButton="Tìm kiếm"
                    size="large"
                    onSearch={handleSearch}
                />
            </Space>
            <Table
                columns={columns}
                dataSource={filteredData}
                rowKey="taiKhoan"
                pagination={{ position: ["bottomCenter"], pageSize: 10 }}
            />
            <UpdateUserModal
                visible={modalUpdateVisible}
                user={selectedUser}
                onClose={() => setModalUpdateVisible(false)}
                fetchData={fetchData}
            />
            <AddUserModel
                fetchData={fetchData}
                onClose={() => setModalAddNewVisible(false)}
                visible={modalAddNewVisible}
            />
        </>
    );
};

const ButtonDeleteUser = styled(Button)`
    background: red !important;
    color: white !important;
`;

const ButtonUpdateUser = styled(Button)`
    background: #28a745 !important;
`;

const ButtonAddNewUser = styled(Button)`
    margin-bottom: 20px;
`;
