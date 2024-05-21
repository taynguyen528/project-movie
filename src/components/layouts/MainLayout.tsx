import React from "react";
import { Outlet } from "react-router-dom";
import { Footer, Header } from "ui";

export const MainLayout = () => {
    return (
        <main className="main min-h-screen flex flex-col">
            <Header />
            <div className="flex-1">
                <Outlet />
            </div>
            <Footer />
        </main>
    );
};
