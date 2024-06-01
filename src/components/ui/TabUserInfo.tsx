import { useEffect, useState } from "react";
import { getInfoUser } from "apis/userApi";
import styled from "styled-components";
import { UserInfo } from "types";
import { useForm } from "react-hook-form";
import { Input, Modal } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

interface IUserUpdate {
    taiKhoan: string;
    matKhau: string;
    email: string;
    soDt: string;
    maNhom: string;
    maLoaiNguoiDung: string;
    hoTen: string;
}

export const TabUserInfo = () => {
    const [userInfo, setUserInfo] = useState<UserInfo>();
    const [infoBookTicket, setInfoBookTicket] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const fetchUserInfo = async () => {
        try {
            const res = await getInfoUser();
            setUserInfo(res.content);
            setInfoBookTicket(res.content.thongTinDatVe);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchUserInfo();
    }, []);

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleButton = () => {
        setIsModalOpen(true);
    };

    //handler form
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IUserUpdate>();

    const onSubmit = (data: IUserUpdate) => {
        console.log(data);
    };

    return (
        <Container>
            <Content>
                <TabUserInfoStyled>
                    <Title>Thông tin tài khoản</Title>
                    {userInfo ? (
                        <UserInfoStyled>
                            <p>Tên tài khoản: {userInfo.taiKhoan}</p>
                            <p>Họ tên: {userInfo.hoTen}</p>
                            <p>Email: {userInfo.email}</p>
                            <p>Số điện thoại: {userInfo.soDT}</p>
                            <p>Mã nhóm: {userInfo.maNhom}</p>
                            <WrapButton>
                                <ButtonStyled onClick={handleButton}>
                                    Chỉnh sửa thông tin
                                </ButtonStyled>
                            </WrapButton>
                        </UserInfoStyled>
                    ) : (
                        <p style={{ fontSize: 20 }}>Đang tải thông tin...</p>
                    )}
                    {/* Modal */}
                    <Modal
                        title={
                            <TitleModalStyled>
                                Chỉnh sửa thông tin
                            </TitleModalStyled>
                        }
                        open={isModalOpen}
                        onOk={handleSubmit(onSubmit)}
                        onCancel={handleCancel}
                        maskClosable={false}
                        width={700}
                        okText="Cập nhật"
                        cancelText="Hủy bỏ"
                    >
                        <div>
                            {userInfo && (
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <FormGrid>
                                        <FormItem>
                                            <label htmlFor="taiKhoan">
                                                Tài khoản:
                                            </label>
                                            <InputStyled
                                                type="text"
                                                id="taiKhoan"
                                                {...register("taiKhoan")}
                                                defaultValue={
                                                    userInfo?.taiKhoan || ""
                                                }
                                                disabled={true}
                                                
                                            />
                                        </FormItem>
                                        <FormItem>
                                            <label htmlFor="maNhom">
                                                Mã nhóm:
                                            </label>
                                            <InputStyled
                                                type="text"
                                                id="maNhom"
                                                {...register("maNhom")}
                                                defaultValue={
                                                    userInfo?.maNhom || ""
                                                }
                                                disabled={true}
                                            />
                                        </FormItem>
                                        <FormItem>
                                            <label htmlFor="hoTen">
                                                Họ tên:
                                            </label>
                                            <InputStyled
                                                type="text"
                                                id="hoTen"
                                                {...register("hoTen")}
                                                defaultValue={
                                                    userInfo?.hoTen || ""
                                                }
                                            />
                                        </FormItem>
                                        <FormItem>
                                            <label htmlFor="email">
                                                Email:
                                            </label>
                                            <InputStyled
                                                type="email"
                                                id="email"
                                                {...register("email")}
                                                defaultValue={
                                                    userInfo?.email || ""
                                                }
                                            />
                                        </FormItem>
                                        <FormItem>
                                            <label htmlFor="matKhau">
                                                Mật khẩu:
                                            </label>
                                            <PasswordInputStyled
                                                id="matKhau"
                                                {...register("matKhau")}
                                                defaultValue={
                                                    userInfo?.matKhau || ""
                                                }
                                                iconRender={(visible) =>
                                                    visible ? (
                                                        <EyeTwoTone />
                                                    ) : (
                                                        <EyeInvisibleOutlined />
                                                    )
                                                }
                                            />
                                        </FormItem>
                                        <FormItem>
                                            <label htmlFor="soDienThoai">
                                                Số điện thoại:
                                            </label>
                                            <InputStyled
                                                type="tel"
                                                id="soDienThoai"
                                                {...register("soDt")}
                                                defaultValue={
                                                    userInfo?.soDT || ""
                                                }
                                            />
                                        </FormItem>
                                        <FormItem>
                                            <label htmlFor="maLoaiNguoiDung">
                                                Loại người dùng
                                            </label>
                                            <InputStyled
                                                type="text"
                                                id="maLoaiNguoiDung"
                                                {...register("maLoaiNguoiDung")}
                                                defaultValue={
                                                    userInfo?.maLoaiNguoiDung || ""
                                                }
                                                disabled={true}
                                            />
                                        </FormItem>
                                    </FormGrid>
                                </form>
                            )}
                        </div>
                    </Modal>
                </TabUserInfoStyled>
            </Content>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 70vh;
`;

const Content = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
`;

const TabUserInfoStyled = styled.div`
    color: white;
    padding: 20px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const UserInfoStyled = styled.div`
    background: #282c34;
    padding: 20px;
    border-radius: 10px;
    width: 100%;
    max-width: 500px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

    p {
        font-size: 30px;
        margin: 10px 0;
    }
`;

const Title = styled.h2`
    font-size: 50px;
    font-weight: 600;
    margin-bottom: 20px;
`;

const ButtonStyled = styled.button`
    background: red;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    font-size: 20px;
    margin-top: 20px;
    cursor: pointer;

    &:hover {
        opacity: 0.7;
        transition: 0.3s all;
    }
`;

const WrapButton = styled.div`
    text-align: center;
`;

const FormGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    margin-bottom: 20px;

    
`;

const FormItem = styled.div`
    display: flex;
    flex-direction: column;

    label {
        font-size: 20px;
        font-weight: bold;
        margin: 5px;
    }
`;

const InputStyled = styled(Input)`
    padding: 10px 20px !important;
    font-size: 20px !important;
    background: #fff !important;
    color: #000;
`;

const TitleModalStyled = styled.div`
    font-size: 30px;
    font-weight: 600;
    text-align: center;
`;

const PasswordInputStyled = styled(Input.Password)`
    padding: 10px 20px !important;
    font-size: 20px !important;
    background: #fff !important;
    color: #000;
`;
