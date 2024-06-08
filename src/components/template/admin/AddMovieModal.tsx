import React from "react";
import {
    Modal,
    Form,
    Input,
    DatePicker,
    Switch,
    InputNumber,
    Upload,
    Button,
} from "antd";
import { useForm, Controller } from "react-hook-form";
import { UploadOutlined } from "@ant-design/icons";
import moment from "moment";
import styled from "styled-components";
import { addNewMovie } from "apis/movieApi";
import { toast } from "react-toastify";

interface AddMovieModalProps {
    visible: boolean;
    onOk: () => void;
    onCancel: () => void;
}

export interface MovieFormData {
    tenPhim: string;
    moTa: string;
    ngayKhoiChieu: string;
    sapChieu: boolean;
    dangChieu: boolean;
    hot: boolean;
    danhGia: number;
    hinhAnh: File[];
}

export const AddMovieModal: React.FC<AddMovieModalProps> = ({
    visible,
    onOk,
    onCancel,
}) => {
    const { control, handleSubmit, reset } = useForm();

    const onSubmit = async (data: any) => {
        const formData = new FormData();
        formData.append("tenPhim", data.tenPhim);
        formData.append("moTa", data.moTa);
        formData.append(
            "ngayKhoiChieu",
            moment(data.ngayKhoiChieu).format("DD/MM/YYYY")
        );
        formData.append("sapChieu", data.sapChieu.toString());
        formData.append("dangChieu", data.dangChieu.toString());
        formData.append("hot", data.hot.toString());
        formData.append("danhGia", data.danhGia.toString());
        formData.append("File", data.hinhAnh[0].originFileObj);

        try {
            const res = await addNewMovie(formData);
            if (res && res.statusCode === 200) {
                toast.success("Thêm mới phim thành công.");
                onOk();
                reset();
            }
        } catch (error:any) {
            toast.error(error.response.data.content);
        }
    };

    const beforeUpload = (file: File) => {
        const checkTypeFile =
            file.type === "image/jpeg" ||
            file.type === "image/png" ||
            file.type === "image/gif";
        if (!checkTypeFile) {
            console.error("Bạn chỉ có thể tải lên file JPG/PNG/GIF!");
        }
        return checkTypeFile;
    };

    return (
        <Modal
            title={<Title>Thêm mới phim</Title>}
            open={visible}
            onOk={onOk}
            onCancel={onCancel}
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
                            defaultValue=""
                            render={({ field }) => <Input {...field} />}
                        />
                    </FormItem>
                    <FormItem label="Trailer">
                        <Controller
                            name="trailer"
                            control={control}
                            defaultValue=""
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
                            defaultValue=""
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
                            defaultValue={null}
                            render={({ field }) => (
                                <DatePicker
                                    {...field}
                                    format="DD/MM/YYYY"
                                    onChange={(date) => field.onChange(date)}
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
                            defaultValue={1}
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
                            defaultValue={false}
                            render={({ field }) => <Switch {...field} />}
                        />
                    </FormItem>
                    <FormItem label="Sắp chiếu" valuePropName="checked">
                        <Controller
                            name="sapChieu"
                            control={control}
                            defaultValue={false}
                            render={({ field }) => <Switch {...field} />}
                        />
                    </FormItem>
                    <FormItem label="Hot" valuePropName="checked">
                        <Controller
                            name="hot"
                            control={control}
                            defaultValue={false}
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
                                    fileList={field.value}
                                    listType="picture"
                                    beforeUpload={beforeUpload}
                                    onChange={({ fileList }) =>
                                        field.onChange(fileList)
                                    }
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
                            Thêm mới phim
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
