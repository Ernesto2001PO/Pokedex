import axiosInstance from "../api/axiosInstance";


const Equipo = {
    getAllTeamsByUserId: async (userId) => {
        try {
        const response = await axiosInstance.get(`/equipo/obtener/${userId}`);
        return response.data;
        } catch (error) {
        console.error("Error fetching teams:", error);
        throw error;
        }
    },
    getTeamById: async (id) => {
        try {
        const response = await axiosInstance.get(`/equipo/obtenerId/${id}`);
        return response.data;
        } catch (error) {
        console.error("Error fetching team by ID:", error);
        throw error;
        }
    },
    
    createTeam: async (teamData) => {
        try {
        const response = await axiosInstance.post("/equipo/crear", teamData);
        return response.data;
        } catch (error) {
        console.error("Error creating team:", error);
        throw error;
        }
    },
    addPokemonToTeam: async (teamId, pokemonData) => {
        try {
        const response = await axiosInstance.post(`/equipo/${teamId}/agregarPokemon`, pokemonData);
        return response.data;
        } catch (error) {
        console.error("Error adding Pokemon to team:", error);
        throw error;
        }
    }

};

export default Equipo;
