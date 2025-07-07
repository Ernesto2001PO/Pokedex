import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { Form } from 'react-bootstrap';
import EquipoRepository from "../../repositories/EquipoRepository";

const TeamCard = () => {
    const navigate = useNavigate();
    const [teams, setTeams] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedTeam, setSelectedTeam] = useState(null);

    useEffect(() => {
        const usuarioId = localStorage.getItem("id_usuario");
        if (!usuarioId) {
            navigate("/");
            return;
        }

        const buscarEquipos = async () => {
            try {
                const response = await EquipoRepository.getAllTeamsByUserId(usuarioId);
                if (Array.isArray(response)) {
                    setTeams(response);
                } else {
                    console.error("Formato de respuesta inesperado para equipos:", response);
                    setTeams([]);
                }
            } catch (err) {
                console.error("Error al obtener los equipos:", err);
                setTeams([]);
            }
        };

        buscarEquipos();
    }, [navigate]);

    const handleEditClick = (team) => {
        setSelectedTeam(team);
        setShowEditModal(true);
    };

    const handleCloseModal = () => {
        setShowEditModal(false);
        setSelectedTeam(null);
    };

    
    const handleEditSubmit = async (event) => {
        event.preventDefault();
        if (!selectedTeam || !selectedTeam.nombre_equipo) {
            alert("Por favor, ingresa un nombre válido para el equipo.");
            return;
        }
        try {
            const response = await EquipoRepository.editTeam(selectedTeam.id, { nombre: selectedTeam.nombre_equipo });
            if (response && response.message === "Equipo editado exitosamente") {
                alert("Equipo editado exitosamente");
                setTeams(teams.map(t => (t.id === selectedTeam.id ? selectedTeam : t)));
                handleCloseModal();
            } else {
                alert("Error al editar el equipo: " + (response?.message || "Error desconocido"));
            }
        } catch (error) {
            console.error("Error al editar el equipo:", error);
            alert("Error al editar el equipo. Por favor, intenta de nuevo más tarde.");
        }
    };

    if (teams.length === 0) {
        return <p className="text-center text-muted">No tienes equipos creados. ¡Crea uno nuevo!</p>;
    }

    return (
        <>
            <div className="d-flex flex-wrap justify-content-center">
                {teams.map((team) => (
                    <div key={team.id} className="card team-card m-3" style={{ maxWidth: '300px' }}>
                        <div className="card-body">
                            <h5 className="card-title">{team.nombre_equipo}</h5>
                            <div className="d-flex flex-wrap justify-content-center mb-2">
                                {team.pokemones && team.pokemones.length > 0 ? (
                                    team.pokemones.map((pokemon, index) => (
                                        <div key={index} className="d-flex align-items-center m-1">
                                            {pokemon.img_url && (
                                                <img
                                                    src={pokemon.img_url}
                                                    alt={pokemon.nombre}
                                                    style={{
                                                        width: 32,
                                                        height: 32,
                                                        objectFit: "contain",
                                                        marginRight: 8,
                                                        background: "#fff",
                                                        borderRadius: "50%"
                                                    }}
                                                />
                                            )}
                                            <span className="badge bg-secondary">{pokemon.nombre}</span>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-muted">No Pokémon en este equipo todavía.</p>
                                )}
                            </div>
                            <div className="d-grid gap-2">
                                <Link to={`/team/${team.id}`} className="btn btn-secondary btn-sm">
                                    Agregar Pokemones
                                </Link>
                                <Button
                                    variant="primary"
                                    size="sm"
                                    onClick={() => handleEditClick(team)}
                                >
                                    Editar Equipo
                                </Button>
                                <Button
                                    variant="danger"
                                    onClick={() => {
                                        if (window.confirm("¿Estás seguro de que quieres eliminar este equipo?")) {
                                            EquipoRepository.deleteTeam(team.id)
                                                .then(() => {
                                                    alert("Equipo eliminado");
                                                    setTeams(teams.filter(t => t.id !== team.id));
                                                })
                                                .catch(err => {
                                                    console.error("Error al eliminar el equipo:", err);
                                                    alert("Error al eliminar el equipo");
                                                });
                                        }
                                    }}
                                >
                                    Eliminar
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {/* Modal de edición */}
            {showEditModal && selectedTeam && (
                <div className="modal show d-block" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Editar Equipo</h5>
                                <button type="button" className="btn-close" onClick={handleCloseModal}></button>
                            </div>
                            <div className="modal-body">
                                <p>Nombre actual: {selectedTeam.nombre_equipo}</p>
                                <Form onSubmit={handleEditSubmit}>
                                    <Form.Group controlId="formTeamName">
                                        <Form.Label>Nombre del Equipo</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Ingresa el nuevo nombre del equipo"
                                            value={selectedTeam.nombre_equipo}
                                            onChange={(e) => setSelectedTeam({ ...selectedTeam, nombre_equipo: e.target.value })}
                                        />
                                    </Form.Group>
                                    <Button variant="primary" type="submit">
                                        Guardar Cambios
                                    </Button>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default TeamCard;