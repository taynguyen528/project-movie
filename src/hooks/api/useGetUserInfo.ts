import { useQuery } from "@tanstack/react-query";
import React from "react";
import { qlNguoiDungServices } from "services";

export const useGetUserInfo = () => {
    //call api
    const q = useQuery({
        queryKey: ["UserInfo"],
        queryFn: () => qlNguoiDungServices.getUserInfo(),
    });

    return {
        ...q,
        data: q?.data?.data?.content,
    };
};
