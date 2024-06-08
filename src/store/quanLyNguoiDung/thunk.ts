import { createAsyncThunk } from "@reduxjs/toolkit";
import { LoginType, RegisterType } from "schemas";
import { qlNguoiDungServices } from "services";
import { sleep } from "utils";

export const registerThunk = createAsyncThunk(
    "quanLyNguoiDung/register",
    async (payload: RegisterType, { rejectWithValue }) => {
        // data gửi lên từ dispatch chính là payload
        try {
            // console.log("payload", payload);

            // sleep thêm 1s
            await sleep();

            // call API đăng ký tài khoản
            const res = await qlNguoiDungServices.dangKy(payload);
            
            // console.log("payload: ", payload);
            return res;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const loginThunk = createAsyncThunk(
    "quanLyNguoiDung/login",
    async (payload: LoginType, { rejectWithValue }) => {
        try {
            // console.log("payload", payload);

            // sleep thêm 1s
            await sleep();

            // call api login
            const result = await qlNguoiDungServices.dangNhap(payload);

            return result.data.content;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
