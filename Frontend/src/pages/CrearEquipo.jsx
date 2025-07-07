import React from "react";
import EquipoRepository from "../../repositories/EquipoRepository"; 
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Loader } from "lucide-react";


const CrearEquipo = () => {
    const [teamName, setTeamName] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!teamName.trim()) {
            alert("Porfavor ingresa un nombre de equipo")
        }
        
        const response = await EquipoRepository.createTeam({
            nombre: teamName,
            usuario_id: localStorage.getItem("id_usuario")
        });
        if (response && response.message === "Equipo creado exitosamente") {
            alert("Equipo creado exitosamente");
            <Loader className="animate-spin" />; 
            navigate("/home"); 
            setTeamName(""); 

        } else {
            alert("Error al crear el equipo: " + (response?.message || "Error desconocido"));
        }
    }

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Crear Nuevo Equipo Pokémon</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="teamName" className="form-label">Nombre del Equipo</label>
                    <input type="text" className="form-control" id="teamName" placeholder="Ingresa el nombre de tu equipo" value={teamName} onChange={(e) => setTeamName(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary">Crear Equipo</button>
            </form>
        </div>
    );
}
export default CrearEquipo;