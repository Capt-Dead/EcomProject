import { ProductView } from "../index";
import { Navigate, Outlet } from "react-router-dom";

export const PrivatePage = () => {
    return (
        <>
            <ProductView />
            <Outlet />
        </>
    )
}