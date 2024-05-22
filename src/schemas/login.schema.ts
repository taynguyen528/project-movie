import { z } from "zod";

//tạo ra schema để validate các input ở screen login
export const loginSchema = z.object({
    taiKhoan: z
        .string({ required_error: "Vui lòng nhập tài khoản" })
        .max(16, "Tài khoản tối đa 16 ký tự."),
    matKhau: z
        .string({ required_error: "Vui lòng nhập mật khẩu" })
        .min(5, "Mật khẩu phải từ 5 kí tự."),
});

export type LoginType = z.infer<typeof loginSchema>;
