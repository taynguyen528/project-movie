import { useState } from "react";
import { Button, Card, Skeleton, Modal } from "antd";
import { PATH } from "constant";
import { useGetPhimList } from "hooks/apiHooks";
import { generatePath, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaPlay } from "react-icons/fa";
import ReactPlayer from "react-player";

const ListMovie = () => {
    const { data: phimList, isFetching: isFetchingPhimList } = useGetPhimList();
    const navigate = useNavigate();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [trailerUrl, setTrailerUrl] = useState("");

    const handlePlayClick = (trailer: string) => {
        setTrailerUrl(trailer);
        setIsModalVisible(true);
    };

    const handleClose = () => {
        setIsModalVisible(false);
        setTrailerUrl("");
    };

    if (isFetchingPhimList) {
        return (
            <MovieList>
                <SkeletonGrid>
                    {[...Array(20)].map((_, index) => (
                        <StyledCard key={index} bordered={false}>
                            <Skeleton active avatar paragraph={{ rows: 4 }} />
                        </StyledCard>
                    ))}
                </SkeletonGrid>
            </MovieList>
        );
    }

    return (
        <MovieList>
            <div className="container mx-auto">
                <Title>Danh Sách Phim</Title>
                <MovieGrid>
                    {phimList?.map((phim) => (
                        <StyledCard key={phim.maPhim} bordered={false}>
                            <CardCoverContainer>
                                <CardCover
                                    src={phim.hinhAnh}
                                    alt={phim.tenPhim}
                                />
                                <Overlay className="overlay">
                                    <PlayButton
                                        onClick={() =>
                                            handlePlayClick(phim.trailer)
                                        }
                                    >
                                        <FaPlay size={24} />
                                    </PlayButton>
                                </Overlay>
                            </CardCoverContainer>
                            <CardContent>
                                <StyledCardMeta title={phim.tenPhim} />
                                <StyledCardDescription>
                                    {phim.moTa}
                                </StyledCardDescription>
                                <StyledButton
                                    type="primary"
                                    className="mt-3"
                                    onClick={() => {
                                        const path = generatePath(
                                            PATH.movieDetail,
                                            {
                                                movieId: phim.maPhim,
                                            }
                                        );
                                        navigate(path);
                                    }}
                                >
                                    Chi tiết
                                </StyledButton>
                            </CardContent>
                        </StyledCard>
                    ))}
                </MovieGrid>

                <Modal
                    open={isModalVisible}
                    onCancel={handleClose}
                    footer={null}
                    width="80%"
                    centered
                    destroyOnClose={true}
                >
                    {trailerUrl && (
                        <ReactPlayer
                            url={trailerUrl}
                            width="100%"
                            height="700px"
                            controls
                        />
                    )}
                </Modal>
            </div>
        </MovieList>
    );
};

export default ListMovie;

const Title = styled.div`
    color: #fff;
    font-size: 30px;
    font-weight: 700;
    margin: 20px 0;
`;

const MovieList = styled.div`
    background: #111018;
    padding: 20px;
`;

const SkeletonGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 20px;
`;

const MovieGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 20px;
`;

const StyledCard = styled(Card)`
    width: 240px;
    border: none !important;
    box-shadow: none !important;
    background-color: #1f1f1f;

    .ant-card-body {
        padding: 0px !important;
    }
    .ant-card-meta-title {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    &:hover .overlay {
        opacity: 1;
    }
`;

const CardCoverContainer = styled.div`
    position: relative;
`;

const CardCover = styled.img`
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 8px 8px 0 0;
`;

const Overlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
`;

const PlayButton = styled.button`
    background: transparent;
    border: none;
    color: #fff;
    font-size: 24px;
    cursor: pointer;
    outline: none;
`;

const CardContent = styled.div`
    background: #111018;
    padding: 12px;
`;

const StyledCardMeta = styled(Card.Meta)`
    && .ant-card-meta-title {
        font-size: 20px;
        color: #fff;
    }
`;

const StyledCardDescription = styled.div`
    font-size: 14px;
    max-height: 40px;
    margin: 10px 0;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #fff;
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
