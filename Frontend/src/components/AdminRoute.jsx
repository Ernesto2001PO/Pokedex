import React from "react";


import { useAuth } from "../../hook/useAuth";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();
    const es_admin = localStorage.getItem("es_admin") === "true";

    if (!isAuthenticated) return <Navigate to="/" />;
    if (!es_admin) return <Navigate to="/home" />;

    return children;
};

export default AdminRoute;