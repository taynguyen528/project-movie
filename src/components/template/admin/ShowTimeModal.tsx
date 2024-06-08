import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Select, DatePicker, InputNumber } from "antd";
import styled from "styled-components";
import { Controller, useForm, SubmitHandler } from "react-hook-form";
import moment from "moment";
import { toast } from "react-toastify";
import { useGetRapPhim } from "hooks/apiHooks";
import { LayThongTinCumRapTheoHeThong } from "apis/movieApi";
import { createShowTime } from "apis/ticketApi";

interface Props {
    visible: boolean;
    onClose: () => void;
    fetchData: () => void;
    onOk: () => void;
    IdMovieSelect?: number;
}

interface ShowTimeFormData {
    heThongRap: string;
    cumRap: string;
    ngayChieuGioChieu: string;
    giaVe: number;
}

export interface FormDataShowTime {
    maPhim?: number;
    ngayChieuGioChieu: string;
    maRap: string;
    giaVe: number;
}

export const ShowTimeModal: React.FC<Props> = ({
    visible,
    onClose,
    IdMovieSelect = undefined,
}) => {
    const { handleSubmit, control, reset, watch } = useForm<ShowTimeFormData>();
    const { data: rapPhimData, isLoading } = useGetRapPhim();

    const [heThongRapOptions, setHeThongRapOptions] = useState<
        { value: string; label: string }[]
    >([]);
    const [cumRapOptions, setCumRapOptions] = useState<
        { value: string; label: string }[]
    >([]);

    const selectedHeThongRap = watch("heThongRap");

    useEffect(() => {
        if (rapPhimData && rapPhimData.length > 0) {
            const options = rapPhimData.map((rapPhim: any) => ({
                value: rapPhim.maHeThongRap,
                label: rapPhim.tenHeThongRap,
            }));
            setHeThongRapOptions(options);
        }
    }, [rapPhimData]);

    useEffect(() => {
        const fetchCumRap = async (maHeThongRap: string) => {
            try {
                const res = await LayThongTinCumRapTheoHeThong(maHeThongRap);
                const options = res.map(
                    (cumRap: { maCumRap: string; tenCumRap: string }) => ({
                        value: cumRap.maCumRap,
                        label: cumRap.tenCumRap,
                    })
                );
                setCumRapOptions(options);
            } catch (error: any) {
                toast.error(error);
            }
        };

        if (selectedHeThongRap) {
            fetchCumRap(selectedHeThongRap);
        } else {
            setCumRapOptions([]);
        }
    }, [selectedHeThongRap]);

    const onSubmit: SubmitHandler<ShowTimeFormData> = async (data) => {
        const formData: FormDataShowTime = {
            maPhim: IdMovieSelect,
            ngayChieuGioChieu: data.ngayChieuGioChieu,
            maRap: data.cumRap,
            giaVe: data.giaVe,
        };

        try {
            const res = await createShowTime(formData);
            if (res && res.statusCode === 200) {
                toast.success(res.message);
                onClose();
            }
        } catch (error: any) {
            toast.error(error.response.data.content);
        }
    };

    useEffect(() => {
        if (!visible) {
            reset();
        }
    }, [visible, reset]);

    return (
        <>
            <Modal
                title={<Title>Tạo lịch chiếu</Title>}
                open={visible}
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
                        Tạo lịch chiếu
                    </Button>,
                ]}
            >
                <StyledForm layout="vertical">
                    <Form.Item label="Hệ thống rạp">
                        <Controller
                            name="heThongRap"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    options={heThongRapOptions}
                                    placeholder="Chọn hệ thống rạp"
                                    loading={isLoading}
                                />
                            )}
                        />
                    </Form.Item>
                    <Form.Item label="Cụm rạp">
                        <Controller
                            name="cumRap"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    options={cumRapOptions}
                                    placeholder="Chọn cụm rạp"
                                    disabled={!selectedHeThongRap}
                                />
                            )}
                        />
                    </Form.Item>
                    <Form.Item label="Ngày chiếu giờ chiếu">
                        <Controller
                            name="ngayChieuGioChieu"
                            control={control}
                            defaultValue=""
                            rules={{
                                required: "Ngày chiếu giờ chiếu là bắt buộc",
                                validate: (value) => {
                                    return (
                                        moment(
                                            value,
                                            "DD/MM/YYYY HH:mm:ss",
                                            true
                                        ).isValid() ||
                                        "Định dạng ngày chiếu giờ chiếu không hợp lệ (dd/MM/yyyy hh:mm:ss)"
                                    );
                                },
                            }}
                            render={({ field, fieldState }) => (
                                <>
                                    <DatePicker
                                        {...field}
                                        showTime
                                        format="DD/MM/YYYY HH:mm:ss"
                                        value={
                                            field.value
                                                ? moment(
                                                      field.value,
                                                      "DD/MM/YYYY HH:mm:ss"
                                                  )
                                                : null
                                        }
                                        onChange={(_, dateString) =>
                                            field.onChange(dateString)
                                        }
                                    />
                                    {fieldState.error && (
                                        <p style={{ color: "red" }}>
                                            {fieldState.error.message}
                                        </p>
                                    )}
                                </>
                            )}
                        />
                    </Form.Item>
                    <Form.Item label="Giá vé">
                        <Controller
                            name="giaVe"
                            control={control}
                            defaultValue={0}
                            rules={{
                                required: "Giá vé là bắt buộc",
                                min: {
                                    value: 75000,
                                    message:
                                        "Giá vé phải lớn hơn hoặc bằng 75,000",
                                },
                                max: {
                                    value: 200000,
                                    message:
                                        "Giá vé phải nhỏ hơn hoặc bằng 200,000",
                                },
                            }}
                            render={({ field, fieldState }) => (
                                <>
                                    <InputNumber
                                        {...field}
                                        min={75000}
                                        max={200000}
                                        formatter={(value) =>
                                            `${value}`.replace(
                                                /\B(?=(\d{3})+(?!\d))/g,
                                                ","
                                            )
                                        }
                                        parser={(value) =>
                                            value
                                                ? parseInt(
                                                      value.replace(
                                                          /\$\s?|(,*)/g,
                                                          ""
                                                      )
                                                  )
                                                : 0
                                        }
                                        placeholder="Nhập giá vé"
                                        style={{ width: "100%" }}
                                    />
                                    {fieldState.error && (
                                        <p style={{ color: "red" }}>
                                            {fieldState.error.message}
                                        </p>
                                    )}
                                </>
                            )}
                        />
                    </Form.Item>
                </StyledForm>
            </Modal>
        </>
    );
};

const StyledForm = styled(Form)`
    .ant-form-item {
        margin-bottom: 16px;
    }
`;

const Title = styled.h1`
    font-size: 30px;
    text-align: center;
    font-weight: 600;
`;
