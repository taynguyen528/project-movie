import { Avatar, Button, Divider, Popover } from "antd";
import { IconUser } from "assets/icons";
import { PATH } from "constant";
import { useAuth } from "hooks";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "store";
import { quanLyNguoiDungActions } from "store/quanLyNguoiDung/slice";
import styled from "styled-components";

export const Header = () => {
    // const { userLogin } = useSelector(
    //     (state: RootState) => state.quanLyNguoiDung
    // );
    const { userLogin } = useAuth();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    return (
        <Container>
            <div>Cyber Movie</div>
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
                        <Button
                            type="text"
                            onClick={() => {
                                navigate(PATH.userInfo);
                                setOpen(false);
                            }}
                        >
                            Thông tin tài khoản
                        </Button>
                        <Divider className="py-10" />
                        <Button
                            type="primary"
                            danger
                            onClick={() =>
                                dispatch(quanLyNguoiDungActions.logOut())
                            }
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
                            <Avatar icon={<IconUser />} />
                            <p>{userLogin?.hoTen}</p>
                        </>
                    )}
                    {!userLogin && (
                        <div>
                            <Button onClick={() => navigate(PATH.register)}>
                                Đăng ký
                            </Button>
                            <Button
                                className="ml-10"
                                onClick={() => navigate(PATH.login)}
                            >
                                Đăng nhập
                            </Button>
                        </div>
                    )}
                </div>
            </Popover>
        </Container>
    );
};

const Container = styled.div`
    height: var(--header-height);
    background: yellow;
    font-size: 20px;
    text-align: center;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 40px;
`;
