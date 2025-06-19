import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";



export const useAuth = (shouldRedirect) => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("token"));
    console.log(isAuthenticated);

    useEffect(() => {
        if (shouldRedirect && !isAuthenticated) {
            navigate("/login");
        }
    }, [isAuthenticated]);

    const login = (token, nombre) => {
        localStorage.setItem("token", token);
        localStorage.setItem("nombre", JSON.stringify(nombre));
        setIsAuthenticated(true);

    
    }
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("nombre");
        localStorage.removeItem("id_usuario");
        localStorage.removeItem("email");
        localStorage.removeItem("es_admin");
        setIsAuthenticated(false);
        navigate("/");
    }
    return {
        isAuthenticated,
        login,
        logout,
        
    }
}
