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
    createItem: async (itemData) => {
        try {
            const response = await axiosInstance.post("/items/crear", itemData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
        } catch (error) {
            console.error("Error creating item:", error);
            throw error;
        }
    },
    updateItem: async (id, itemData) => {
        try {
            const response = await axiosInstance.put(`/items/editar/${id}`, itemData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
        } catch (error) {
            console.error("Error updating item:", error);
            throw error;
        }
    },
    deleteItem: async (id) => {
        try {
            const response = await axiosInstance.delete(`/items/eliminar/${id}`);
            return response.data;
        } catch (error) {
            console.error("Error deleting item:", error);
            throw error;
        }
    }
};

export default Item;
