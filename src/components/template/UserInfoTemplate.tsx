import { Tabs } from "antd";
import { useGetUserInfo } from "hooks/apiHooks";
import { TabUserInfo, TicketInfo } from "ui";

const tabItems = [
    {
        label: "Thông tin tài khoản",
        key: "thongTinTaiKhoan",
        children: <TabUserInfo />,
    },
    {
        label: "Thông tin đặt vé",
        key: "thongTinDatVe",
        children: <TicketInfo />,
    },
];
export const UserInfoTemplate = () => {
    //call api
    // const { data } = useQuery({
    //     queryKey: ["UserInfo"],
    //     queryFn: () => qlNguoiDungServices.getUserInfo(),
    // });

    const { data } = useGetUserInfo();
    // nếu user cập nhập thông tin thành công
    // B1: Lưu thông tin mới vào localstorage
    // B2: Set lại giá trị store redux đang lưu userLogin

    return (
        <div>
            <Tabs
                // tabPosition={tabPosition}
                tabPosition="left"
                items={tabItems}
            />
        </div>
    );
};
