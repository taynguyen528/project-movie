import { useState } from "react";
import styled from "styled-components";
import { UserOutlined, VideoCameraOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import type { MenuProps } from "antd";
import { ManageUser } from "./ManageUser";
import { ManageMovie } from "./ManageMovie";
const { Sider, Content } = Layout;

export const DashBoardAdmin = () => {
    const [selectedKey, setSelectedKey] = useState<string>("1");

    const handleMenuClick: MenuProps["onClick"] = ({ key }) => {
        setSelectedKey(key);
    };

    return (
        <DashBoardAdminStyled>
            <div className="container mx-auto">
                <Title>Trang quản trị</Title>
                <Divider />
                <LayoutStyled>
                    <SiderStyled trigger={null}>
                        <Menu
                            theme="dark"
                            mode="inline"
                            defaultSelectedKeys={["1"]}
                            onClick={handleMenuClick}
                            items={[
                                {
                                    key: "1",
                                    icon: <UserOutlined />,
                                    label: "Quản lý người dùng",
                                },
                                {
                                    key: "2",
                                    icon: <VideoCameraOutlined />,
                                    label: "Quản lý phim",
                                },
                            ]}
                        />
                    </SiderStyled>
                    <Layout>
                        <ContentStyled>
                            {selectedKey === "1" && <ManageUser />}
                            {selectedKey === "2" && <ManageMovie />}
                        </ContentStyled>
                    </Layout>
                </LayoutStyled>
            </div>
        </DashBoardAdminStyled>
    );
};

const DashBoardAdminStyled = styled.div`
    background: #111018;
    min-height: 100vh;
`;

const Title = styled.div`
    color: white;
    font-size: 40px;
    font-weight: 700;
    margin-bottom: 20px;
    text-align: center;
`;

const Divider = styled.hr`
    border: 1px solid #444;
    margin-bottom: 50px;
`;

const LayoutStyled = styled(Layout)`
    background: #111018;
    height:70vh; 
`;

const SiderStyled = styled(Sider)`
    background: #111018;
    width: 250px !important;
    .ant-layout-sider-children {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
`;

const ContentStyled = styled(Content)`
    margin: 24px 16px;
    padding: 24px;
    background: #ccc;
    border-radius: 4px;
    overflow: auto;
    height: 100%;
`;