import axiosInstance from "../api/axiosInstance";


const Item = {
    getAllItems: async () => {
        try {
            const response = await axiosInstance.get("/items/obtener");
            return response.data;
        } catch (error) {
            console.error("Error fetching items:", error);
            throw error;
        }
    },
};

export default Item;
