import React from "react";
import { Modal, Button } from "antd";
import styled from "styled-components";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { addNewUserByAdmin } from "apis/userApi";

interface AddUserModelProps {
    fetchData: () => void;
    onClose: () => void;
    visible: boolean;
}

export interface AddNewUserInfo {
    taiKhoan: string;
    hoTen: string;
    email: string;
    soDt: string; 
    matKhau: string;
    maLoaiNguoiDung: string;
    maNhom: string;
}

export const AddUserModel: React.FC<AddUserModelProps> = ({
    visible,
    onClose,
    fetchData,
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<AddNewUserInfo>();

    const onSubmit: SubmitHandler<AddNewUserInfo> = async (data) => {
        // console.log(data);
        try {
            const res = await addNewUserByAdmin(data);
            // console.log("res", res);
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
                    Thêm người dùng mới
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
                    Thêm
                </Button>,
            ]}
        >
            <>
                <FormStyled onSubmit={handleSubmit(onSubmit)}>
                    <FormGrid>
                        <FormItem>
                            <label htmlFor="taiKhoan">
                                Tài khoản (<span>*</span>):
                            </label>
                            <InputStyled
                                type="text"
                                id="taiKhoan"
                                {...register("taiKhoan", {
                                    required: "Tài khoản không được để trống",
                                })}
                            />
                            {errors.taiKhoan && (
                                <ErrorMsg>{errors.taiKhoan.message}</ErrorMsg>
                            )}
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
                            <InputStyled
                                type="password"
                                id="matKhau"
                                {...register("matKhau", {
                                    required: "Mật khẩu không được để trống",
                                    minLength: {
                                        value: 5,
                                        message:
                                            "Mật khẩu phải có ít nhất 5 ký tự",
                                    },
                                })}
                            />
                            {errors.matKhau && (
                                <ErrorMsg>{errors.matKhau.message}</ErrorMsg>
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
                                    pattern: {
                                        value: /^[0-9]{10}$/,
                                        message: "Số điện thoại không hợp lệ",
                                    },
                                })}
                            />
                            {errors.soDt && (  
                                <ErrorMsg>{errors.soDt.message}</ErrorMsg>
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
                        <FormItem>
                            <label htmlFor="maNhom">Mã nhóm:</label>
                            <SelectStyled id="maNhom" {...register("maNhom")}>
                                <option value="GP00">GP00</option>
                                <option value="GP01">GP01</option>
                                <option value="GP02">GP02</option>
                                <option value="GP03">GP03</option>
                                <option value="GP04">GP04</option>
                            </SelectStyled>
                            {errors.maNhom && (
                                <ErrorMsg>{errors.maNhom.message}</ErrorMsg>
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
