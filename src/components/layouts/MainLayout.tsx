import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { Footer, Header } from "ui";

export const MainLayout = () => {
    return (
        <main className="main min-h-screen flex flex-col">
            <Header />
            <Spacer>
                <div className="flex-1">
                    <Outlet />
                </div>
            </Spacer>
            <Footer />
        </main>
    );
};

const Spacer = styled.div`
    margin-top: var(--navbar-height);
`;
