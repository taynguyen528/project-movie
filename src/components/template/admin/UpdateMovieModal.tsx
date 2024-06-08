import React, { useState, useEffect } from "react";
import {
    Modal,
    Button,
    Form,
    Switch,
    Upload,
    Input,
    DatePicker,
    InputNumber,
} from "antd";
import styled from "styled-components";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { UploadOutlined } from "@ant-design/icons";
import { Phim } from "types";
import moment from "moment";
import { toast } from "react-toastify";
import { updateMovieByAdmin } from "apis/movieApi";

interface Props {
    visible: boolean;
    onOk: () => void;
    onClose: () => void;
    fetchData: () => void;
    movieEdit: Phim;
}

export interface FormDataUpdate {
    maPhim: string;
    tenPhim: string;
    moTa: string;
    ngayKhoiChieu: string;
    sapChieu: boolean;
    dangChieu: boolean;
    hot: boolean;
    danhGia: number;
    hinhAnh: Blob[];
}

export const UpdateMovieModal: React.FC<Props> = ({
    visible,
    fetchData,
    onOk,
    onClose,
    movieEdit,
}) => {
    const {
        handleSubmit,
        reset,
        control,
        formState: { errors },
    } = useForm<FormDataUpdate>();

    // console.log("movieEdit", movieEdit);

    useEffect(() => {
        reset({
            tenPhim: movieEdit ? movieEdit.tenPhim : "",
            moTa: movieEdit ? movieEdit.moTa : "",
            ngayKhoiChieu: movieEdit ? movieEdit.ngayKhoiChieu : null,
            danhGia: movieEdit ? movieEdit.danhGia : 1,
            dangChieu: movieEdit ? movieEdit.dangChieu : false,
            sapChieu: movieEdit ? movieEdit.sapChieu : false,
            hot: movieEdit ? movieEdit.hot : false,
            hinhAnh: movieEdit ? movieEdit.hinhAnh : [],
        });
    }, [movieEdit, reset]);

    const onSubmit: SubmitHandler<FormDataUpdate> = async (
        data: FormDataUpdate
    ) => {
        const formData = new FormData();
        formData.append("tenPhim", data.tenPhim);
        formData.append("moTa", data.moTa);
        formData.append("ngayKhoiChieu", data.ngayKhoiChieu);
        formData.append("sapChieu", data.sapChieu);
        formData.append("dangChieu", data.dangChieu);
        formData.append("hot", data.hot);
        formData.append("danhGia", data.danhGia);
        formData.append("maPhim", movieEdit.maPhim);
        formData.append("File", data.hinhAnh[0].originFileObj);

        try {
            const res = await updateMovieByAdmin(formData);
            if (res && res.statusCode === 200) {
                toast.success(res.message);
                onOk();
                reset();
            }
        } catch (error: any) {
            toast.error(error.response.data.content);
        }
    };

    const beforeUpload = (file: any) => {
        const isJpgOrPng =
            file.type === "image/jpeg" || file.type === "image/png";
        if (!isJpgOrPng) {
            toast.error("Bạn chỉ có thể tải lên tệp JPG/PNG!");
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            toast.error("Hình ảnh phải nhỏ hơn 2MB!");
        }
        return isJpgOrPng && isLt2M;
    };

    return (
        <Modal
            title={<Title>Chỉnh sửa phim</Title>}
            open={visible}
            onCancel={onClose}
            footer={null}
            width={800}
        >
            <StyledForm layout="vertical" onFinish={handleSubmit(onSubmit)}>
                <FormRow>
                    <FormItem
                        label="Tên phim"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập tên phim!",
                            },
                        ]}
                    >
                        <Controller
                            name="tenPhim"
                            control={control}
                            render={({ field }) => <Input {...field} />}
                        />
                    </FormItem>
                </FormRow>
                <FormRow>
                    <FormItem
                        label="Mô tả"
                        rules={[
                            { required: true, message: "Vui lòng nhập mô tả!" },
                        ]}
                    >
                        <Controller
                            name="moTa"
                            control={control}
                            render={({ field }) => (
                                <Input.TextArea {...field} />
                            )}
                        />
                    </FormItem>
                </FormRow>
                <FormRow>
                    <FormItem
                        label="Ngày khởi chiếu"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng chọn ngày khởi chiếu!",
                            },
                        ]}
                    >
                        <Controller
                            name="ngayKhoiChieu"
                            control={control}
                            render={({ field }) => (
                                <DatePicker
                                    {...field}
                                    format="DD/MM/YYYY"
                                    value={
                                        field.value ? moment(field.value) : null
                                    }
                                    onChange={(date) =>
                                        field.onChange(
                                            date
                                                ? date.format("YYYY-MM-DD")
                                                : null
                                        )
                                    }
                                />
                            )}
                        />
                    </FormItem>
                    <FormItem
                        label="Số sao"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập số sao!",
                            },
                        ]}
                    >
                        <Controller
                            name="danhGia"
                            control={control}
                            render={({ field }) => (
                                <InputNumber {...field} min={1} max={10} />
                            )}
                        />
                    </FormItem>
                </FormRow>
                <FormRow>
                    <FormItem label="Đang chiếu" valuePropName="checked">
                        <Controller
                            name="dangChieu"
                            control={control}
                            render={({ field }) => <Switch {...field} />}
                        />
                    </FormItem>
                    <FormItem label="Sắp chiếu" valuePropName="checked">
                        <Controller
                            name="sapChieu"
                            control={control}
                            render={({ field }) => <Switch {...field} />}
                        />
                    </FormItem>
                    <FormItem label="Hot" valuePropName="checked">
                        <Controller
                            name="hot"
                            control={control}
                            render={({ field }) => <Switch {...field} />}
                        />
                    </FormItem>
                </FormRow>

                <FormRow>
                    <FormItem label="Hình ảnh">
                        <Controller
                            name="hinhAnh"
                            control={control}
                            defaultValue={[]}
                            render={({ field }) => (
                                <Upload
                                    name="hinhAnh"
                                    fileList={
                                        Array.isArray(field.value)
                                            ? field.value
                                            : []
                                    }
                                    listType="picture"
                                    beforeUpload={beforeUpload}
                                    onChange={({ fileList }) => {
                                        if (Array.isArray(fileList)) {
                                            field.onChange(fileList);
                                        }
                                    }}
                                >
                                    <Button icon={<UploadOutlined />}>
                                        Chọn file
                                    </Button>
                                </Upload>
                            )}
                        />
                    </FormItem>
                </FormRow>

                <Form.Item>
                    <WrapButton>
                        <Button type="primary" htmlType="submit">
                            Cập nhật
                        </Button>
                    </WrapButton>
                </Form.Item>
            </StyledForm>
        </Modal>
    );
};

const StyledForm = styled(Form)`
    .ant-form-item {
        margin-bottom: 16px;
    }
`;

const FormRow = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 16px;
    @media (max-width: 768px) {
        flex-direction: column;
    }
`;

const FormItem = styled(Form.Item)`
    flex: 1;
    &:first-child {
        margin-right: 8px;
    }
    &:last-child {
        margin-left: 8px;
    }
`;

const Title = styled.h1`
    font-size: 30px;
    text-align: center;
    font-weight: 600;
`;

const WrapButton = styled.div`
    display: flex;
    justify-content: flex-end;
`;
