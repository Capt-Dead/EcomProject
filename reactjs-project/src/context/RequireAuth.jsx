import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useCookies } from "react-cookie";

const RequireAuth = () => {
    const location = useLocation();
    const [cookies] = useCookies(["user"]);
    return cookies?.user?.token ? (
        <Outlet />
    ) : (
        <Navigate to="/" state={{ from: location }} replace />
    );
};

export default RequireAuth;
