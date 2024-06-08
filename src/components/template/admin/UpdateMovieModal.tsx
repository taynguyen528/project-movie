import React, { useEffect } from "react";
import {
    Modal,
    Button,
    Form,
    Switch,
    Upload,
    Input,
    DatePicker,
    InputNumber,
    UploadFile,
} from "antd";
import styled from "styled-components";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { UploadOutlined } from "@ant-design/icons";
import moment from "moment";
import { toast } from "react-toastify";
import { updateMovieByAdmin } from "apis/movieApi";
import { Phim } from "types";

interface Props {
    visible: boolean;
    onOk: () => void;
    onClose: () => void;
    fetchData: () => void;
    idMovieEdit: number | undefined;
    movieEdit: Phim | undefined;
}

export interface FormDataUpdate {
    maPhim: number | undefined;
    tenPhim: string;
    moTa: string;
    ngayKhoiChieu: string | moment.Moment | null;
    sapChieu: boolean;
    dangChieu: boolean;
    hot: boolean;
    trailer: string;
    danhGia: number;
    hinhAnh?: UploadFile;
}

export const UpdateMovieModal: React.FC<Props> = ({
    visible,
    onOk,
    onClose,
    fetchData,
    idMovieEdit,
    movieEdit,
}) => {
    const [form] = Form.useForm();

    const {
        handleSubmit,
        control,
        setValue,
        reset,
        formState: { errors },
    } = useForm<FormDataUpdate>({
        defaultValues: {
            maPhim: idMovieEdit,
            tenPhim: "",
            moTa: "",
            ngayKhoiChieu: null,
            sapChieu: false,
            dangChieu: false,
            hot: false,
            trailer: "",
            danhGia: 0,
            hinhAnh: undefined,
        },
    });

    useEffect(() => {
        if (visible) {
            reset({
                maPhim: idMovieEdit,
                tenPhim: movieEdit?.tenPhim || "",
                moTa: movieEdit?.moTa || "",
                ngayKhoiChieu: moment(movieEdit?.ngayKhoiChieu) || null,
                sapChieu: movieEdit?.sapChieu || false,
                dangChieu: movieEdit?.dangChieu || false,
                hot: movieEdit?.hot || false,
                trailer: movieEdit?.trailer || "",
                danhGia: movieEdit?.danhGia || 0,
                hinhAnh: undefined,
            });
        }
    }, [visible, movieEdit, reset]);

    const onSubmit: SubmitHandler<FormDataUpdate> = async (values) => {
        const formData = new FormData();
        formData.append("maPhim", values.maPhim?.toString() || "");
        formData.append("tenPhim", values.tenPhim);
        formData.append("moTa", values.moTa);
        formData.append(
            "ngayKhoiChieu",
            (values.ngayKhoiChieu as moment.Moment).format("DD/MM/YYYY")
        );
        formData.append("sapChieu", values.sapChieu.toString());
        formData.append("dangChieu", values.dangChieu.toString());
        formData.append("hot", values.hot.toString());
        formData.append("trailer", values.trailer);
        formData.append("danhGia", values.danhGia.toString());
        if (values.hinhAnh) {
            formData.append("File", values.hinhAnh as any);
        }

        try {
            const res = await updateMovieByAdmin(formData);
            if (res.statusCode === 200) {
                toast.success("Cập nhật phim thành công");
                fetchData();
                onOk();
                onClose();
            }
        } catch (error: any) {
            toast.error(error.response.data.content);
        }
    };

    return (
        <Modal
            title="Cập nhật phim"
            open={visible}
            onOk={form.submit}
            onCancel={onClose}
            footer={[
                <Button key="back" onClick={onClose}>
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
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit(onSubmit)}
            >
                <Form.Item label="Mã phim">
                    <Controller
                        name="maPhim"
                        control={control}
                        rules={{ required: "Mã phim không được bỏ trống" }}
                        render={({ field }) => (
                            <Input
                                {...field}
                                disabled
                                value={idMovieEdit?.toString() || ""}
                            />
                        )}
                    />
                    {errors.maPhim && (
                        <ErrorText>{errors.maPhim.message}</ErrorText>
                    )}
                </Form.Item>
                <Form.Item label="Tên phim">
                    <Controller
                        name="tenPhim"
                        control={control}
                        rules={{ required: "Tên phim không được bỏ trống" }}
                        render={({ field }) => <Input {...field} />}
                    />
                    {errors.tenPhim && (
                        <ErrorText>{errors.tenPhim.message}</ErrorText>
                    )}
                </Form.Item>
                <Form.Item label="Mô tả">
                    <Controller
                        name="moTa"
                        control={control}
                        rules={{ required: "Mô tả không được bỏ trống" }}
                        render={({ field }) => <Input.TextArea {...field} />}
                    />
                    {errors.moTa && (
                        <ErrorText>{errors.moTa.message}</ErrorText>
                    )}
                </Form.Item>
                <Form.Item label="Ngày khởi chiếu">
                    <Controller
                        name="ngayKhoiChieu"
                        control={control}
                        rules={{
                            required: "Ngày khởi chiếu không được bỏ trống",
                        }}
                        render={({ field }) => (
                            <DatePicker
                                {...field}
                                format="DD/MM/YYYY"
                                value={field.value ? moment(field.value) : null}
                            />
                        )}
                    />
                    {errors.ngayKhoiChieu && (
                        <ErrorText>{errors.ngayKhoiChieu.message}</ErrorText>
                    )}
                </Form.Item>
                <Form.Item label="Sắp chiếu">
                    <Controller
                        name="sapChieu"
                        control={control}
                        render={({ field }) => (
                            <Switch {...field} checked={field.value} />
                        )}
                    />
                </Form.Item>
                <Form.Item label="Đang chiếu">
                    <Controller
                        name="dangChieu"
                        control={control}
                        render={({ field }) => (
                            <Switch {...field} checked={field.value} />
                        )}
                    />
                </Form.Item>
                <Form.Item label="Hot">
                    <Controller
                        name="hot"
                        control={control}
                        render={({ field }) => (
                            <Switch {...field} checked={field.value} />
                        )}
                    />
                </Form.Item>
                <Form.Item label="Trailer">
                    <Controller
                        name="trailer"
                        control={control}
                        rules={{ required: "Trailer không được bỏ trống" }}
                        render={({ field }) => <Input {...field} />}
                    />
                    {errors.trailer && (
                        <ErrorText>{errors.trailer.message}</ErrorText>
                    )}
                </Form.Item>
                <Form.Item label="Đánh giá">
                    <Controller
                        name="danhGia"
                        control={control}
                        rules={{ required: "Đánh giá không được bỏ trống" }}
                        render={({ field }) => (
                            <InputNumber {...field} min={0} max={10} />
                        )}
                    />
                    {errors.danhGia && (
                        <ErrorText>{errors.danhGia.message}</ErrorText>
                    )}
                </Form.Item>
                <Form.Item label="Hình ảnh">
                    <Controller
                        name="hinhAnh"
                        control={control}
                        render={({ field }) => (
                            <Upload
                                {...field}
                                beforeUpload={(file) => {
                                    setValue("hinhAnh", file);
                                    return false;
                                }}
                                onRemove={() => setValue("hinhAnh", undefined)}
                            >
                                <Button icon={<UploadOutlined />}>
                                    Upload
                                </Button>
                            </Upload>
                        )}
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
};

const ErrorText = styled.span`
    color: red;
    font-size: 12px;
`;
