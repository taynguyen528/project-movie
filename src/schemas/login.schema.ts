import { z } from "zod";

//tạo ra schema để validate các input ở screen login
export const loginSchema = z.object({
    taiKhoan: z.string({ required_error: "Vui lòng nhập tài khoản" }).min(1),
    matKhau: z.string({ required_error: "Vui lòng nhập mật khẩu" }).min(1),
});

export type LoginType = z.infer<typeof loginSchema>;
