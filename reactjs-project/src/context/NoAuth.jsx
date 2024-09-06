import { Navigate, Outlet } from "react-router-dom";
import { useCookies } from "react-cookie";

const NoAuth = () => {
    const [cookies] = useCookies(["user"]);
    return cookies?.user?.token ? <Navigate to='/home' replace /> : <Outlet />;
}

export default NoAuth