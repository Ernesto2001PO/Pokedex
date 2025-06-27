import axiosInstance from "../api/axiosInstance";


const TiposRepository = {
    getAllTipos: async () => {
        try {
            const response = await axiosInstance.get("/tipos/obtener");
            return response.data;
        } catch (error) {
            console.error("Error fetching tipos:", error);
            throw error;
        }
    },
};

export default TiposRepository;
