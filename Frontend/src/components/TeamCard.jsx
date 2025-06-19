import React, { useState, useEffect } from "react";
import Menu from "../components/Menu"; 
import { Link, useNavigate } from "react-router-dom"; 

const TeamCard = ({ team, onDelete }) => {

    return (
        <div className="card team-card mb-3" style={{ maxWidth: '300px' }}>
            <div className="card-body">
                <h5 className="card-title">{team.name}</h5>
                <div className="d-flex flex-wrap justify-content-center mb-2">
                    {team.pokemons && team.pokemons.length > 0 ? (
                        team.pokemons.map((pokemon, index) => (
                            <img
                                key={index}
                                src={pokemon.img_url || 'https://via.placeholder.com/50'} 
                                alt={pokemon.name || 'Pokémon'}
                                className="img-fluid rounded-circle m-1"
                                style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                title={pokemon.name}
                            />
                        ))
                    ) : (
                        <p className="text-muted">No Pokémon in this team yet.</p>
                    )}
                </div>
                <div className="d-grid gap-2">
                    <Link to={`/team/edit/${team.id}`} className="btn btn-primary btn-sm">
                        Editar Equipo
                    </Link>
                    <button
                        className="btn btn-danger btn-sm"
                        onClick={() => onDelete(team.id, team.name)}
                    >
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default TeamCard;