import { getListBoxOffice } from "apis/ticketApi";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { InfoPhim } from "types";

export const SelectSeatTemplate = () => {
    const { maLichChieu } = useParams<{ maLichChieu: string }>();

    const [infoMovie, setInfoMovie] = useState<InfoPhim>({});

    const fetchData = async (maLichChieu: string) => {
        try {
            const res = await getListBoxOffice(maLichChieu);
            setInfoMovie(res.thongTinPhim);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (maLichChieu) {
            fetchData(maLichChieu);
        }
    }, [maLichChieu]);

    return (
        <SelectSeatStyled>
            <div className="container mx-auto">
                <Title>Chọn ghế ngồi</Title>
                <hr />
                <SelectSeatDetail>SelectSeatDetail</SelectSeatDetail>
            </div>
        </SelectSeatStyled>
    );
};

const SelectSeatStyled = styled.div`
    background: #111018;
`;

const Title = styled.div`
    color: white;
    font-size: 40px;
    font-weight: 700;
`;

const SelectSeatDetail = styled.div`
    padding-top: 20px;
`;
