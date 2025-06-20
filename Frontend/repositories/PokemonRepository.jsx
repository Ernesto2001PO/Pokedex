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
    }
    
}

export default PokemonRepository