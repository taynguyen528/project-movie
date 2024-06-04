import { useEffect, useState } from "react";
import { getInfoUser, updateInfoUser } from "apis/userApi";
import styled from "styled-components";
import { UserInfo } from "types";
import { SubmitHandler, useForm } from "react-hook-form";
import { Modal } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { toast } from "react-toastify";

export interface IUserUpdate {
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
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const fetchUserInfo = async () => {
        try {
            const res = await getInfoUser();
            setUserInfo(res.content);
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

    const onSubmit: SubmitHandler<IUserUpdate> = async (data) => {
        const result = await updateInfoUser(data);
        if (result.statusCode) {
            toast.success("Cập nhật thông tin thành công.");
            setIsModalOpen(false);
            fetchUserInfo();
        }
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
                                                    userInfo.taiKhoan || ""
                                                }
                                                disabled={true}
                                            />
                                            <input
                                                type="hidden"
                                                {...register("taiKhoan")}
                                                defaultValue={
                                                    userInfo.taiKhoan || ""
                                                }
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
                                                    userInfo.maNhom || ""
                                                }
                                                disabled={true}
                                            />
                                            <input
                                                type="hidden"
                                                {...register("maNhom")}
                                                defaultValue={
                                                    userInfo.maNhom || ""
                                                }
                                            />
                                        </FormItem>
                                        <FormItem>
                                            <label htmlFor="hoTen">
                                                Họ tên (<span>*</span>):
                                            </label>
                                            <InputStyled
                                                type="text"
                                                id="hoTen"
                                                {...register("hoTen", {
                                                    required:
                                                        "Họ tên không được để trống",
                                                })}
                                                defaultValue={
                                                    userInfo.hoTen || ""
                                                }
                                            />
                                            {errors.hoTen && (
                                                <ErrorMsg>
                                                    {errors.hoTen.message}
                                                </ErrorMsg>
                                            )}
                                        </FormItem>
                                        <FormItem>
                                            <label htmlFor="email">
                                                Email (<span>*</span>):
                                            </label>
                                            <InputStyled
                                                type="email"
                                                id="email"
                                                {...register("email", {
                                                    required:
                                                        "Email không được để trống",
                                                })}
                                                defaultValue={
                                                    userInfo.email || ""
                                                }
                                            />
                                            {errors.email && (
                                                <ErrorMsg>
                                                    {errors.email.message}
                                                </ErrorMsg>
                                            )}
                                        </FormItem>
                                        <FormItem>
                                            <label htmlFor="matKhau">
                                                Mật khẩu (<span>*</span>):
                                            </label>
                                            <InputWrapper>
                                                <InputStyled
                                                    type={
                                                        showPassword
                                                            ? "text"
                                                            : "password"
                                                    }
                                                    id="matKhau"
                                                    {...register("matKhau", {
                                                        required:
                                                            "Mật khẩu không được để trống",
                                                    })}
                                                    defaultValue={
                                                        userInfo.matKhau || ""
                                                    }
                                                />
                                                {showPassword ? (
                                                    <EyeTwoTone
                                                        onClick={() =>
                                                            setShowPassword(
                                                                !showPassword
                                                            )
                                                        }
                                                    />
                                                ) : (
                                                    <EyeInvisibleOutlined
                                                        onClick={() =>
                                                            setShowPassword(
                                                                !showPassword
                                                            )
                                                        }
                                                    />
                                                )}
                                            </InputWrapper>
                                            {errors.matKhau && (
                                                <ErrorMsg>
                                                    {errors.matKhau.message}
                                                </ErrorMsg>
                                            )}
                                        </FormItem>
                                        <FormItem>
                                            <label htmlFor="soDt">
                                                Số điện thoại (<span>*</span>):
                                            </label>
                                            <InputStyled
                                                type="tel"
                                                id="soDt"
                                                {...register("soDt", {
                                                    required:
                                                        "Số điện thoại không được để trống",
                                                })}
                                                defaultValue={
                                                    userInfo.soDT || ""
                                                }
                                            />
                                            {errors.soDt && (
                                                <ErrorMsg>
                                                    {errors.soDt.message}
                                                </ErrorMsg>
                                            )}
                                        </FormItem>
                                        <FormItem>
                                            <label htmlFor="maLoaiNguoiDung">
                                                Loại người dùng:
                                            </label>
                                            <InputStyled
                                                type="text"
                                                id="maLoaiNguoiDung"
                                                {...register("maLoaiNguoiDung")}
                                                defaultValue={
                                                    userInfo.maLoaiNguoiDung ||
                                                    ""
                                                }
                                                disabled={true}
                                            />
                                            <input
                                                type="hidden"
                                                {...register("maLoaiNguoiDung")}
                                                defaultValue={
                                                    userInfo.maLoaiNguoiDung ||
                                                    ""
                                                }
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

        span {
            color: red;
        }
    }
`;

const InputStyled = styled.input`
    padding: 10px 20px;
    font-size: 20px;
    background: #fff;
    color: #000;
    border: 2px solid #ccc;
    border-radius: 8px;

    &:disabled {
        background: #f0f0f0;
        cursor: not-allowed;
    }
`;

const TitleModalStyled = styled.div`
    font-size: 30px;
    font-weight: 600;
    text-align: center;
`;

const ErrorMsg = styled.p`
    color: red;
    font-size: 18px;
    margin: 5px 0 0;
`;

const InputWrapper = styled.div`
    position: relative;
    display: flex;
    align-items: center;

    .anticon {
        position: absolute;
        right: 10px;
        cursor: pointer;
    }
`;
