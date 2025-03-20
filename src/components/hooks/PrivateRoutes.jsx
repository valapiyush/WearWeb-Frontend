/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const useAuth = () => {
    const [authState, setAuthState] = useState({ isLoggedin: false, role: null });
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
        const id = localStorage.getItem("id");
        const role = localStorage.getItem("role");

        if (id) {
            setAuthState({ isLoggedin: true, role });
        }
        setLoading(false);
    }, []);

    return { ...authState, loading };
};

const PrivateRoutes = ({ allowedRoles }) => {
    const auth = useAuth();
    const location = useLocation(); 

    if (auth.loading) {
        return <h1>Loading...</h1>; // Prevents redirection before auth state is set
    }

    // 🚀 If user is not logged in, redirect to login
    if (!auth.isLoggedin) {
        return <Navigate to="/loginsignup" />;
    }

    // 🔥 If user role is not allowed for this route, redirect to home
    if (!allowedRoles.includes(auth.role)) {
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    return <Outlet />;
};

export default PrivateRoutes;
