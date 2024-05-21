import { LOCALE_USER_LOGIN_KEY } from "constant";
import { UserLogin } from "types";

export const getUserLogin = (): UserLogin | undefined => {
    const userLogin = localStorage.getItem(LOCALE_USER_LOGIN_KEY);

    if (!userLogin) return;

    return JSON.parse(userLogin);
};
