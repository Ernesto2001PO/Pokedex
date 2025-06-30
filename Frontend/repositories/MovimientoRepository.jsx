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
    createMovimiento: async (movimientoData) => {
        try {
            const response = await axiosInstance.post("/movimientos/crear", movimientoData)
            return response.data;
        } catch (error) {
            console.error("Error creating movimiento:", error);
            throw error;
        }
    },
    updateMovimiento: async (id, movimientoData) => {
        try {
            const response = await axiosInstance.put(`/movimientos/editar/${id}`, movimientoData);
            return response.data;
        } catch (error) {
            console.error("Error updating movimiento:", error);
            throw error;
        }
    },
    deleteMovimiento: async (id) => {
        try {
            const response = await axiosInstance.delete(`/movimientos/eliminar/${id}`);
            return response.data;
        } catch (error) {
            console.error("Error deleting movimiento:", error);
            throw error;
        }
    },
};

export default Movimiento;
