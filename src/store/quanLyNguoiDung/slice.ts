import { createSlice } from "@reduxjs/toolkit";
import { quanLyNguoiDungActionsThunks } from ".";
import { LOCALE_USER_LOGIN_KEY } from "constant";
import { getUserLogin } from "utils";

const initialState = {
    isFetchingRegister: false,
    isFetchingLogin: false,
    userLogin: getUserLogin(),
};

export const {
    reducer: quanLyNguoiDungReducer,
    actions: quanLyNguoiDungActions,
} = createSlice({
    name: "quanLyNguoiDung",
    initialState,
    // xử lý các action đồng bộ
    reducers: {
        logOut: (state) => {
            // xóa thông tin user lưu ở redux
            state.userLogin = undefined;

            // xóa thông tin user đã lưu ở localStorage
            localStorage.removeItem(LOCALE_USER_LOGIN_KEY);
        },
    },

    // xử lý các action bất đồng bộ (actionThunk)
    extraReducers: (builder) => {
        // register thunk
        builder
            .addCase(
                quanLyNguoiDungActionsThunks.registerThunk.pending,
                (state) => {
                    console.log("register pending");
                    state.isFetchingRegister = true;
                }
            )
            .addCase(
                quanLyNguoiDungActionsThunks.registerThunk.fulfilled,
                (state, { payload }) => {
                    console.log("payload", payload);
                    state.isFetchingRegister = false;
                }
            )
            .addCase(
                quanLyNguoiDungActionsThunks.registerThunk.rejected,
                (state, action) => {
                    console.log("action", action);
                    state.isFetchingRegister = false;
                }
            )

            // LoginThunk

            .addCase(
                quanLyNguoiDungActionsThunks.loginThunk.pending,
                (state) => {
                    state.isFetchingLogin = true;
                }
            )
            .addCase(
                quanLyNguoiDungActionsThunks.loginThunk.fulfilled,
                (state, { payload }) => {
                    state.isFetchingLogin = false;

                    // lưu thông tin đăng nhập vào local storage
                    localStorage.setItem(
                        LOCALE_USER_LOGIN_KEY,
                        JSON.stringify(payload)
                    );

                    // set lại thông tin user login
                    state.userLogin = payload;
                }
            )
            .addCase(
                quanLyNguoiDungActionsThunks.loginThunk.rejected,
                (state) => {
                    state.isFetchingLogin = false;
                }
            );
    },
});
