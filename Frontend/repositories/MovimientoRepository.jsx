import axiosInstance from "../api/axiosInstance";


const Movimiento = {
    getAllMovimientos: async () => {
        try {
            const response = await axiosInstance.get("/movimientos/obtener");
            return response.data;
        } catch (error) {
            console.error("Error fetching movimientos:", error);
            throw error;
        }
    },
};

export default Movimiento;
