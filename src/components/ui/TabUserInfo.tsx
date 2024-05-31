import { useEffect, useState } from "react";
import { getInfoUser } from "apis/userApi";
import styled from "styled-components";

export const TabUserInfo = () => {
    const [userInfo, setUserInfo] = useState("");
    const [infoBookTicket, setInfoBookTicket] = useState("");
    console.log("userInfo", userInfo);
    console.log("infoBookTicket", infoBookTicket);
    const fetchUserInfo = async () => {
        try {
            const res = await getInfoUser();
            // console.log(res.content)
            setUserInfo(res.content);
            setInfoBookTicket(res.content.thongTinDatVe);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchUserInfo();
    }, []);

    return <TabUserInfoStyled>TabUserInfo</TabUserInfoStyled>;
};

const TabUserInfoStyled = styled.div`
    color: white;
`;
