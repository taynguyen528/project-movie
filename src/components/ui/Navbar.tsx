import { LoginOutlined, LogoutOutlined } from "@ant-design/icons";
import { Avatar, Button, Divider, Popover } from "antd";
import { IconUser } from "assets/icons";
import { PATH } from "constant";
import { useAuth } from "hooks";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "store";
import { quanLyNguoiDungActions } from "store/quanLyNguoiDung/slice";
import styled from "styled-components";

export const Navbar = () => {
    const { userLogin } = useAuth();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);

    const redirectHome = () => {
        navigate("/");
    };

    return (
        <Wrapper>
            <Container className="container mx-auto">
                <LogoContainer>
                    <img
                        src="/images/logo.png"
                        alt="logo"
                        onClick={redirectHome}
                        className="cursor-pointer"
                    />
                    <span
                        className="text-[20px] font-700 text-white cursor-pointer"
                        onClick={redirectHome}
                    >
                        Cyber Movie
                    </span>
                </LogoContainer>

                <Popover
                    trigger="click"
                    open={open}
                    onOpenChange={(open) => {
                        if (open) return;
                        setOpen(false);
                    }}
                    className="cursor-pointer"
                    content={
                        <div>
                            <WrapButton>
                                <Button
                                    type="text"
                                    onClick={() => {
                                        navigate(PATH.userInfo);
                                        setOpen(false);
                                    }}
                                >
                                    Thông tin tài khoản
                                </Button>
                                <Button
                                    type="text"
                                    onClick={() => {
                                        navigate(PATH.admin);
                                        setOpen(false);
                                    }}
                                >
                                    Trang quản trị (ADMIN)
                                </Button>
                            </WrapButton>
                            <Divider className="py-10" />
                            <Button
                                type="primary"
                                danger
                                onClick={() => {
                                    dispatch(quanLyNguoiDungActions.logOut());
                                    navigate("/");
                                    setOpen(false);
                                }}
                            >
                                Đăng xuất
                            </Button>
                        </div>
                    }
                >
                    <div
                        className="flex gap-6 cursor-pointer"
                        onClick={() => {
                            setOpen(true);
                        }}
                    >
                        {!!userLogin && (
                            <>
                                <StyledAvatar icon={<IconUser />} />
                                <p className="text-white">{userLogin?.hoTen}</p>
                            </>
                        )}
                        {!userLogin && (
                            <>
                                <div>
                                    <StyledButton
                                        onClick={() => navigate(PATH.login)}
                                        type="primary"
                                        className="!flex items-center !text-[18px] !p-[20px]"
                                    >
                                        <LoginOutlined className="icon" />
                                        <span className="ml-2">Đăng nhập</span>
                                    </StyledButton>
                                </div>
                                <div>
                                    <StyledButton
                                        className="ml-10 !flex items-center !text-[18px] !p-[20px]"
                                        onClick={() => navigate(PATH.register)}
                                    >
                                        <LogoutOutlined />
                                        Đăng ký
                                    </StyledButton>
                                </div>
                            </>
                        )}
                    </div>
                </Popover>
            </Container>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    background: #181d22;

    width: 100%;
    position: fixed;
    top: 0;
    z-index: 1000;
`;

const Container = styled.div`
    height: var(--navbar-height);
    font-size: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 40px;
`;

const LogoContainer = styled.div`
    display: flex;
    align-items: center;

    img {
        max-height: 100%;
        max-width: 100px;
        object-fit: contain;
        margin-right: 10px;
    }
`;

const StyledButton = styled(Button)`
    && {
        color: #fff;
        background: transparent;
        border: 1px solid yellow;
        padding: 0 30px;
        font-weight: 600;
        transition: ease-in-out 0.5s;

        &:hover {
            background: yellow !important;
            color: #000 !important;
        }
    }
`;

const StyledAvatar = styled(Avatar)`
    && {
        background: #fff;
        border: 2px solid yellow;
        font-size: 24px;
        transition: ease-in-out 0.3s;
    }

    &&:hover {
        background: yellow;
        border-color: #fff;
    }
`;

const WrapButton = styled.div`
    display: flex;
    flex-direction: column;
`;
