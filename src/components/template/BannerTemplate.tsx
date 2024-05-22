import { useGetBanner } from "hooks/apiHooks";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import { FaPlay } from "react-icons/fa";
import { useState } from "react";
import { Modal } from "antd";

interface Banner {
    maBanner: number;
    maPhim: number;
    hinhAnh: string;
}

const movieTrailers: { [key: number]: string } = {
    1282: "https://www.youtube.com/embed/uqJ9u7GSaYM",
    1283: "https://www.youtube.com/embed/kBY2k3G6LsM",
    1284: "https://www.youtube.com/embed/QJHY4ggYCk4",
};

export const BannerTemplate = () => {
    const { data } = useGetBanner();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [trailerUrl, setTrailerUrl] = useState("");

    const images = data
        ? data.map((banner: Banner) => ({
              hinhAnh: banner.hinhAnh,
              maPhim: banner.maPhim,
          }))
        : [];

    const handlePlayClick = (maPhim: number) => {
        const url = movieTrailers[maPhim];
        if (url) {
            setTrailerUrl(url);
            setIsModalVisible(true);
        } else {
            alert("Trailer không có sẵn!");
        }
    };

    const handleClose = () => {
        setIsModalVisible(false);
        setTrailerUrl("");
    };

    return (
        <div className="w-screen h-screen relative">
            <Swiper
                modules={[Autoplay]}
                className="w-full h-full"
                autoplay={{ delay: 5000 }}
                loop={true}
            >
                {images.map((image: any, index: number) => (
                    <SwiperSlide key={index} className="relative">
                        <img
                            src={image.hinhAnh}
                            className="w-full h-full object-cover"
                            alt={`Slide ${index + 1}`}
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                            <button
                                className="text-white text-4xl"
                                onClick={() => handlePlayClick(image.maPhim)}
                            >
                                <FaPlay />
                            </button>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            <Modal
                open={isModalVisible}
                onCancel={handleClose}
                footer={null}
                width="80%"
                styles={{ body: { padding: 0, height: "70vh" } }}
                centered
                destroyOnClose={true}
            >
                {trailerUrl && (
                    <iframe
                        width="100%"
                        height="100%"
                        src={trailerUrl}
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                )}
            </Modal>
        </div>
    );
};
