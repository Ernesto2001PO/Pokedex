import axiosInstance from "../api/axiosInstance";


const Naturaleza = {
    getAllNaturalezas: async () => {
        try {
            const response = await axiosInstance.get("/naturalezas/obtener");
            return response.data;
        } catch (error) {
            console.error("Error fetching naturalezas:", error);
            throw error;
        }
    },
};

export default Naturaleza;
