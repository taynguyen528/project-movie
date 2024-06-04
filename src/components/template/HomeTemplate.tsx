import { BannerTemplate } from "./BannerTemplate";
import ListMovie from "../ui/ListMovie";
import { ListTheaters } from "components/ui/ListTheaters";

export const HomeTemplate = () => {
    return (
        <>
            <BannerTemplate />
            <ListMovie />
            <ListTheaters />
        </>
    );
};
