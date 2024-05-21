import axios, { CreateAxiosDefaults, InternalAxiosRequestConfig } from "axios";
import { TOKEN } from "./api";
import { getUserLogin } from "utils";

export const apiInstance = {
    create: (configDefault?: CreateAxiosDefaults) => {
        const api = axios.create(configDefault);

        api.interceptors.request.use((config) => {
            return {
                ...config,
                headers: {
                    TokenCybersoft: TOKEN,
                    Authorization: "Bearer " + getUserLogin()?.accessToken || "",
                },
            } as unknown as InternalAxiosRequestConfig;
        });
        return api;
    },
};
