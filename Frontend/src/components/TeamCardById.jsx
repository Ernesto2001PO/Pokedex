import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import EquipoRepository from "../../repositories/EquipoRepository";

const TeamCardById = () => {
    const [teams, setTeams] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        const buscarEquipoById = async () => {
            try {
                const response = await EquipoRepository.getTeamById(id);
                if (Array.isArray(response)) {
                    setTeams(response);
                } else if (response && typeof response === "object") {
                    setTeams([response]);
                } else {
                    console.error("Formato de respuesta inesperado para equipos:", response);
                    setError("Formato de datos de equipos incorrecto.");
                    setTeams([]);
                }
            } catch (err) {
                console.error("Error al obtener los equipos:", err);
                setError("No se pudieron cargar los equipos. Intenta de nuevo más tarde.");
                setTeams([]);
            } 
        };

        buscarEquipoById();
    }, [id]);




    if (teams.length === 0) {
        return <p className="text-center text-muted">No tienes equipos creados. ¡Crea uno nuevo!</p>;
    }

    return (
        <div className="d-flex flex-wrap justify-content-center ">
            {teams.map((team) => (
                <div key={team.id} className="card team-card m-3" style={{ maxWidth: '300px' }}>
                    <div className="card-body">
                        <h5 className="card-title">{team.nombre_equipo}</h5>
                        <div className="d-flex flex-wrap justify-content-center mb-2">
                            {team.pokemones && team.pokemones.length > 0 ? (
                                team.pokemones.map((pokemon, index) => (
                                    <Link
                                        key={pokemon.id || index}
                                        to={`/team/pokemon/${pokemon.id}`}
                                        className="badge bg-secondary m-1 text-decoration-none d-flex align-items-center"
                                        style={{ cursor: "pointer" }}
                                    >
                                        {pokemon.img_url && (
                                            <img
                                                src={pokemon.img_url}
                                                alt={pokemon.nombre}
                                                style={{ width: 32, height: 32, objectFit: "contain", marginRight: 8, background: "#fff", borderRadius: "50%" }}
                                            />
                                        )}
                                        {pokemon.nombre}
                                    </Link>
                                ))
                            ) : (
                                <p className="text-muted">No Pokémon en este equipo todavía.</p>
                            )}
                        </div>
                        <div className="d-grid gap-2">
                            <button
                                className="btn btn-danger btn-sm"
                                onClick={() => {
                                    if (window.confirm(`¿Estás seguro de que quieres eliminar el equipo "${team.nombre_equipo}"?`)) {
                                        console.log(`Eliminando equipo con ID: ${team.id}`);
                                    }
                                }}
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
export default TeamCardById;