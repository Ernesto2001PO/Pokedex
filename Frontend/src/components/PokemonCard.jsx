import React, { useEffect, useState } from 'react';
import PokemonRepository from '../../repositories/PokemonRepository';
import Menu from './Menu'
const PokemonCard = () => {
    const [pokemones, setPokemones] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedPokemon, setSelectedPokemon] = useState(null);

    useEffect(() => {
        const fetchPokemones = async () => {
            try {
                const data = await PokemonRepository.getAllPokemons();
                if (!data || !Array.isArray(data)) {
                    setError("Error: No se pudieron cargar los Pokémon o el formato es incorrecto.");
                    setPokemones([]);
                    return;
                }
                setPokemones(data);
            } catch (err) {
                setError("Error al cargar los Pokémon desde el servidor.");
                setPokemones([]);
            } finally {
                setLoading(false);
            }
        };

        fetchPokemones();
    }, []);

    const filteredPokemones = pokemones.filter(pokemon =>
        pokemon.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleShowDetails = (pokemon) => {
        setSelectedPokemon(pokemon);
    };

    const handleCloseModal = () => {
        setSelectedPokemon(null);
    };

    if (loading) {
        return <div className="text-center my-5">Cargando Pokémon...</div>;
    }

    if (error) {
        return <div className="text-center my-5 text-danger">{error}</div>;
    }

    return (
        <>
            <title>Pokémon Card</title> 
        <div className="container my-4">
            <div className="mb-4">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Buscar Pokémon por nombre..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            {!filteredPokemones.length && searchTerm !== '' ? (
                <div className="text-center my-5">No se encontraron Pokémon con ese nombre.</div>
            ) : !pokemones.length && searchTerm === '' ? (
                <div className="text-center my-5">No se encontraron Pokémon.</div>
            ) : (
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
                    {filteredPokemones.map((pokemon) => (
                        <div className="col" key={pokemon.id_pokemon}>
                            <div className="card h-100 shadow-sm text-center">
                                <img
                                    src={pokemon.img_url}
                                    alt={pokemon.nombre}
                                    className="card-img-top mx-auto mt-2"
                                    style={{ width: '80%', height: 'auto', maxHeight: '120px', objectFit: 'contain' }}
                                />
                                <div className="card-body">
                                    <h5 className="card-title text-truncate">{pokemon.nombre}</h5>
                                    <p className="card-text text-muted">
                                        Tipo: {pokemon.tipos && pokemon.tipos.length > 0
                                            ? pokemon.tipos.map(t => t.nombre).join(', ')
                                            : 'Desconocido'}
                                    </p>
                                </div>
                                <div className="card-footer">

                                    <button
                                        className="btn btn-sm btn-success me-2"
                                        onClick={() => handleShowDetails(pokemon)}
                                    >
                                        Agregar Pokemon
                                    </button>

                                    <button
                                        className="btn btn-sm btn-outline-primary"
                                        onClick={() => handleShowDetails(pokemon)}
                                    >
                                        Ver Detalles
                                    </button>

                                </div>
                            </div>
                        </div>
                    ))}
                            </div>
                            
            )}
            {selectedPokemon && (
                <div
                    className="modal fade show"
                    style={{
                        display: 'block',
                        background: 'rgba(0,0,0,0.5)',
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        zIndex: 1050
                    }}
                    tabIndex="-1"
                    role="dialog"
                >
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{selectedPokemon.nombre}</h5>
                                <button type="button" className="btn-close" onClick={handleCloseModal}></button>
                            </div>
                            <div className="modal-body text-center">
                                <img
                                    src={selectedPokemon.img_url}
                                    alt={selectedPokemon.nombre}
                                    style={{ width: '120px', height: '120px', objectFit: 'contain' }}
                                />
                                <p><strong>Tipo:</strong> {selectedPokemon.tipos?.map(t => t.nombre).join(', ')}</p>
                                <p><strong>Ataque:</strong> {selectedPokemon.base_attack}</p>
                                <p><strong>Defensa:</strong> {selectedPokemon.base_defense}</p>
                                <p><strong>HP:</strong> {selectedPokemon.base_hp}</p>
                                <p><strong>Velocidad:</strong> {selectedPokemon.base_speed}</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                                    Cerrar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            </div>
        </>
    );
};

export default PokemonCard;