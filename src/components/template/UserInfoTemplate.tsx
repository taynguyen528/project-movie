import { Tabs } from "antd";
import styled from "styled-components";
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

    // const { data } = useGetUserInfo();
    // nếu user cập nhập thông tin thành công
    // B1: Lưu thông tin mới vào localstorage
    // B2: Set lại giá trị store redux đang lưu userLogin

    return (
        <UserInfoStyled>
            <div className="container mx-auto">
                <StyledTabs
                    // tabPosition={tabPosition}
                    tabPosition="top"
                    items={tabItems}
                />
            </div>
        </UserInfoStyled>
    );
};

const UserInfoStyled = styled.div`
    background: #111018;
`

const StyledTabs = styled(Tabs)`
    .ant-tabs-tab-btn {
        font-size: 25px;
        font-weight: 600;
        color: white;
    }
`;