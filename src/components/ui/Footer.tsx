import { useGetRapPhim } from "hooks/apiHooks/useGetRapPhim";
import styled from "styled-components";
import { FaAppStore } from "react-icons/fa";
import { ImAndroid } from "react-icons/im";
import { FaFacebookF } from "react-icons/fa6";
import { SiZalo } from "react-icons/si";
import { FaInstagram } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa6";

export const Footer = () => {
    const { data } = useGetRapPhim();

    const renderPartner = () => {
        return (
            data &&
            data.length > 0 &&
            data?.map((item, index) => {
                return (
                    <img
                        style={{ width: 60, height: 60, marginBottom: 4 }}
                        src={item.logo}
                        alt={item.biDanh}
                        key={item.biDanh.toString() + index}
                    />
                );
            })
        );
    };
    return (
        <WrapperFooter>
            <footer className="container sm:mx-auto">
                <div className="xl:max-w-screen-xl container mx-auto pt-8 px-2 sm:px-0 grid grid-cols-2 gap-8 md:grid-cols-3">
                    <div>
                        <h2 className="mb-4 text-lg font-semibold text-white uppercase">
                            Điều khoản sử dụng
                        </h2>
                        <ul>
                            <li className="mb-3">
                                <a
                                    href="#"
                                    className="text-[16px] text-white/60 hover:text-white"
                                >
                                    Điều Khoản Chung
                                </a>
                            </li>
                            <li className="mb-3">
                                <a
                                    href="#"
                                    className="text-[16px] text-white/60 hover:text-white"
                                >
                                    Điều Khoản Giao Dịch
                                </a>
                            </li>
                            <li className="mb-3">
                                <a
                                    href="#"
                                    className="text-[16px] text-white/60 hover:text-white"
                                >
                                    Chính Sách Thanh Toán
                                </a>
                            </li>
                            <li className="mb-3">
                                <a
                                    href="#"
                                    className="text-[16px] text-white/60 hover:text-white"
                                >
                                    Chính Sách Bảo Mật
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="mb-4 text-lg font-semibold text-white uppercase">
                            Đối tác
                        </h2>
                        <div className="grid grid-cols-3 gap-4">
                            {renderPartner()}
                        </div>
                    </div>
                    <div>
                        <h2 className="mb-4 text-lg font-semibold text-white uppercase">
                            Mobile App & Social
                        </h2>
                        <ul>
                            <div className="flex gap-[20px]">
                                <li className="text-[30px] text-white/60 hover:text-white cursor-pointer">
                                    <FaAppStore />
                                </li>
                                <li className="text-[30px] text-white/60 hover:text-white cursor-pointer">
                                    <ImAndroid />
                                </li>
                            </div>
                        </ul>
                        <ul>
                            <div className="flex gap-[20px] mt-[10px]">
                                <li className="text-[30px] text-white/60 hover:text-white cursor-pointer">
                                    <FaFacebookF />
                                </li>
                                <li className="text-[30px] text-white/60 hover:text-white cursor-pointer">
                                    <SiZalo />
                                </li>
                            </div>
                        </ul>
                        <ul>
                            <div className="flex gap-[20px] mt-[10px]">
                                <li className="text-[30px] text-white/60 hover:text-white cursor-pointer">
                                    <FaInstagram />
                                </li>
                                <li className="text-[30px] text-white/60 hover:text-white cursor-pointer">
                                    <FaTiktok />
                                </li>
                            </div>
                        </ul>
                    </div>
                </div>
                <hr className="my-[20px]" />
                <div className="container xl:max-w-screen-xl mx-auto flex justify-between items-center">
                    <p className="text-white font-bold">© 2024 CyberMovie.</p>
                    <img src="/images/card_img.png" alt="card...." />
                </div>
            </footer>
        </WrapperFooter>
    );
};

const WrapperFooter = styled.div`
    background: #202229;
    width: 100%;
    padding: 30px 0;
`;
