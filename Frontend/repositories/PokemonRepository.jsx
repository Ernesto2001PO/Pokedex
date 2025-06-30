import axiosInstance from "../api/axiosInstance";



const PokemonRepository = {
    getAllPokemons: async () => {
        try {
            const response = await axiosInstance.get("/pokemon/obtener");
            return response.data;
        } catch (error) {
            console.error("Error fetching pokemons:", error);
            throw error;
        }
    },
    getPokemonDetails: async (id) => {
        try {
            const response = await axiosInstance.get(`/pokemon/obtener/${id}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching pokemon details:", error);
            throw error;
        }
    },
    createPokemon: async (pokemonData) => {
        try {
            const response = await axiosInstance.post("/pokemon/crear", pokemonData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            return response.data;
        } catch (error) {
            console.error("Error creating pokemon:", error);
            throw error;
        }
    },
    updatePokemon: async (id, pokemonData) => {
        try {
            const response = await axiosInstance.put(`/pokemon/editar/${id}`, pokemonData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
        } catch (error) {
            console.error("Error updating pokemon:", error);
            throw error;
        }
    },
    deletePokemon: async (id) => {
        try {
            const response = await axiosInstance.delete(`/pokemon/eliminar/${id}`);
            return response.data;
        } catch (error) {
            console.error("Error deleting pokemon:", error);
            throw error;
        }
    }
}

export default PokemonRepository