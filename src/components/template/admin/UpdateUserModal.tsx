import React, { useState, useEffect } from "react";
import { Modal, Button } from "antd";
import styled from "styled-components";
import { SubmitHandler, useForm } from "react-hook-form";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { updateUserByAdmin } from "apis/userApi";
import { toast } from "react-toastify";

interface Props {
    visible: boolean;
    user: UserInfo | null;
    onClose: () => void;
    fetchData: () => void;
}

export interface UserInfo {
    taiKhoan: string;
    hoTen: string;
    email: string;
    soDT: string;
    matKhau: string;
    maLoaiNguoiDung: string;
}

export const UpdateUserModal: React.FC<Props> = ({
    visible,
    user,
    onClose,
    fetchData,
}) => {
    if (!user) return null;
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<UserInfo>();

    useEffect(() => {
        if (user) {
            reset(user);
        }
    }, [user, reset]);

    const onSubmit: SubmitHandler<UserInfo> = async (data) => {
        const updatedData = {
            ...data,
            maNhom: "GP00",
        };

        try {
            const res = await updateUserByAdmin(updatedData);
            if (res && res.statusCode === 200) {
                toast.success(res.message);
                onClose();
                fetchData();
            }
        } catch (error: any) {
            toast.error(error.response.data.content);
        }
    };

    return (
        <Modal
            title={
                <div style={{ fontSize: 24, fontWeight: 600 }}>
                    Thông tin người dùng
                </div>
            }
            open={visible}
            onCancel={onClose}
            footer={[
                <Button key="cancel" onClick={onClose}>
                    Hủy
                </Button>,
                <Button
                    key="submit"
                    type="primary"
                    onClick={handleSubmit(onSubmit)}
                >
                    Cập nhật
                </Button>,
            ]}
        >
            <>
                <FormStyled onSubmit={handleSubmit(onSubmit)}>
                    <FormGrid>
                        <FormItem>
                            <label htmlFor="taiKhoan">Tài khoản:</label>
                            <InputStyled
                                type="text"
                                id="taiKhoan"
                                {...register("taiKhoan")}
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
                                    required: "Họ tên không được để trống",
                                })}
                            />
                            {errors.hoTen && (
                                <ErrorMsg>{errors.hoTen.message}</ErrorMsg>
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
                                    required: "Email không được để trống",
                                    pattern: {
                                        value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                                        message: "Email không hợp lệ",
                                    },
                                })}
                            />
                            {errors.email && (
                                <ErrorMsg>{errors.email.message}</ErrorMsg>
                            )}
                        </FormItem>
                        <FormItem>
                            <label htmlFor="matKhau">
                                Mật khẩu (<span>*</span>):
                            </label>
                            <InputWrapper>
                                <InputStyled
                                    type={showPassword ? "text" : "password"}
                                    id="matKhau"
                                    {...register("matKhau", {
                                        required:
                                            "Mật khẩu không được để trống",
                                        minLength: {
                                            value: 5,
                                            message:
                                                "Mật khẩu phải có ít nhất 5 ký tự",
                                        },
                                    })}
                                />
                                <IconWrapper
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                >
                                    {showPassword ? (
                                        <EyeTwoTone />
                                    ) : (
                                        <EyeInvisibleOutlined />
                                    )}
                                </IconWrapper>
                            </InputWrapper>
                            {errors.matKhau && (
                                <ErrorMsg>{errors.matKhau.message}</ErrorMsg>
                            )}
                        </FormItem>
                        <FormItem>
                            <label htmlFor="soDT">
                                Số điện thoại (<span>*</span>):
                            </label>
                            <InputStyled
                                type="tel"
                                id="soDT"
                                {...register("soDT", {
                                    required:
                                        "Số điện thoại không được để trống",
                                    pattern: {
                                        value: /^[0-9]{10}$/,
                                        message: "Số điện thoại không hợp lệ",
                                    },
                                })}
                            />
                            {errors.soDT && (
                                <ErrorMsg>{errors.soDT.message}</ErrorMsg>
                            )}
                        </FormItem>
                        <FormItem>
                            <label htmlFor="maLoaiNguoiDung">
                                Loại người dùng:
                            </label>
                            <SelectStyled
                                id="maLoaiNguoiDung"
                                {...register("maLoaiNguoiDung")}
                            >
                                <option value="KhachHang">Khách hàng</option>
                                <option value="QuanTri">Quản trị</option>
                            </SelectStyled>
                            {errors.maLoaiNguoiDung && (
                                <ErrorMsg>
                                    {errors.maLoaiNguoiDung.message}
                                </ErrorMsg>
                            )}
                        </FormItem>
                    </FormGrid>
                </FormStyled>
            </>
        </Modal>
    );
};

const FormStyled = styled.form`
    width: 100%;
`;

const FormGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 15px;
    margin-bottom: 20px;
`;

const FormItem = styled.div`
    display: flex;
    flex-direction: column;

    label {
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 5px;

        span {
            color: red;
        }
    }
`;

const InputStyled = styled.input`
    width: 100%;
    padding: 10px;
    font-size: 16px;
    background: #fff;
    color: #000;
    border: 1px solid #ccc;
    border-radius: 4px;

    &:disabled {
        background: #f0f0f0;
        cursor: not-allowed;
    }
`;

const SelectStyled = styled.select`
    width: 100%;
    padding: 10px;
    font-size: 16px;
    background: #fff;
    color: #000;
    border: 1px solid #ccc;
    border-radius: 4px;

    &:disabled {
        background: #f0f0f0;
        cursor: not-allowed;
    }
`;

const ErrorMsg = styled.p`
    color: red;
    font-size: 14px;
    margin-top: 5px;
`;

const InputWrapper = styled.div`
    position: relative;
    display: flex;
    align-items: center;
`;

const IconWrapper = styled.div`
    position: absolute;
    right: 10px;
    cursor: pointer;
    font-size: 20px;
    color: #000;
`;
