import { useState, useEffect } from "react";
import styled from "styled-components";
import { CaretUpOutlined } from "@ant-design/icons";

export const BackToTop = () => {
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.pageYOffset > 200) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleBackToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
    return (
        <div>
            {showButton && (
                <BackToTopButton onClick={handleBackToTop}>
                    <CaretUpOutlined />
                </BackToTopButton>
            )}
        </div>
    );
};

const BackToTopButton = styled.button`
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 1000;
    background: #e2d622;
    color: #000;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    transition: opacity 0.3s;
    border-radius: 50%;

    &:hover {
        opacity: 0.8;
    }
`;
