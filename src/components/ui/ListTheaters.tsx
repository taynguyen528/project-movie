import styled from "styled-components";

export const ListTheaters = () => {
    return (
        <ListTheatersStyled>
            <div className="container mx-auto">
                <Title>Danh sách rạp phim</Title>
            </div>
        </ListTheatersStyled>
    );
};

const ListTheatersStyled = styled.div`
    padding: 20px;
    background: #1f1e24;
`;

const Title = styled.div`
    color: #fff;
    font-size: 30px;
    font-weight: 700;
    margin: 20px 0;
`;
