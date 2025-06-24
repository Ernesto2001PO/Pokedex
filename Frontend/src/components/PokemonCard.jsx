import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { Form, Button } from 'react-bootstrap';
import PokemonRepository from '../../repositories/PokemonRepository';
import ItemRepository from '../../repositories/ItemRepository';
import NaturalezaRepository from '../../repositories/NaturalezaRepository';
import MovimientoRepository from '../../repositories/MovimientoRepository';
import EquipoRepository from '../../repositories/EquipoRepository';
import Menu from './Menu';

const PokemonCard = () => {
    const { id: selectedTeamId } = useParams();

    const [pokemones, setPokemones] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const [selectedMovimientos, setSelectedMovimientos] = useState(['']);



    const [items, setItems] = useState([]);
    const [naturaleza, setNaturaleza] = useState([]);
    const [movimientos, setMovimientos] = useState([]);

    //FORMULARIO
    const [apodo, setApodo] = useState('');
    const [slot, setSlot] = useState(1);
    const [itemId, setItemId] = useState('');
    const [habilidad, setHabilidad] = useState('');
    const [naturalezaId, setNaturalezaId] = useState('');
    const [evHp, setEvHp] = useState(0);
    const [evAtk, setEvAtk] = useState(0);
    const [evDef, setEvDef] = useState(0);
    const [evSpAtk, setEvSpAtk] = useState(0);
    const [evSpDef, setEvSpDef] = useState(0);
    const [evSpeed, setEvSpeed] = useState(0);
    const [ivHp, setIvHp] = useState(0);
    const [ivAtk, setIvAtk] = useState(0);
    const [ivDef, setIvDef] = useState(0);
    const [ivSpAtk, setIvSpAtk] = useState(0);
    const [ivSpDef, setIvSpDef] = useState(0);
    const [ivSpeed, setIvSpeed] = useState(0);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedPokemon) return;
        const data = {
            pokemon_id: selectedPokemon.id_pokemon,
            slot_number: slot,
            apodo: apodo,
            items_id: itemId,
            habilidad: habilidad,
            naturaleza_id: naturalezaId,
            ev_hp: evHp,
            ev_atk: evAtk,
            ev_def: evDef,
            ev_spatk: evSpAtk,
            ev_spdef: evSpDef,
            ev_speed: evSpeed,
            iv_hp: ivHp,
            iv_atk: ivAtk,
            iv_def: ivDef,
            iv_spatk: ivSpAtk,
            iv_spdef: ivSpDef,
            iv_speed: ivSpeed,
            movimiento1_id: selectedMovimientos[0] || null,
            movimiento2_id: selectedMovimientos[1] || null,
            movimiento3_id: selectedMovimientos[2] || null,
            movimiento4_id: selectedMovimientos[3] || null,
        };

        try {
            await EquipoRepository.addPokemonToTeam(selectedTeamId, data);
            alert("Pokémon agregado al equipo exitosamente.");
            setSelectedPokemon(null);
        } catch (error) {
            console.error("Error al agregar Pokémon al equipo:", error);
            alert("Error al agregar Pokémon al equipo.");
        }
    };

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
        const fetchItems = async () => {
            try {
                const data = await ItemRepository.getAllItems();
                if (!data || !Array.isArray(data)) {
                    setError("Error: No se pudieron cargar los items o el formato es incorrecto.");
                    setItems([]);
                    return;
                }
                setItems(data);
            } catch (err) {
                setError("Error al cargar los items desde el servidor.");
                setItems([]);
            } finally {
                setLoading(false);
            }
        };
        const fetchNaturaleza = async () => {
            try {
                const data = await NaturalezaRepository.getAllNaturalezas();
                if (!data || !Array.isArray(data)) {
                    setError("Error: No se pudieron cargar las naturalezas o el formato es incorrecto.");
                    setNaturaleza([]);
                    return;
                }
                setNaturaleza(data);
            } catch (err) {
                setError("Error al cargar las naturalezas desde el servidor.");
                setNaturaleza([]);
            } finally {
                setLoading(false);
            }
        };
        const fetchMovimientos = async () => {
            try {
                const data = await MovimientoRepository.getAllMovimientos();
                if (!data || !Array.isArray(data)) {
                    setError("Error: No se pudieron cargar los movimientos o el formato es incorrecto.");
                    setMovimientos([]);
                    return;
                }
                setMovimientos(data);
            } catch (err) {
                setError("Error al cargar los movimientos desde el servidor.");
                setMovimientos([]);
            } finally {
                setLoading(false);
            }
        };

        fetchPokemones();
        fetchItems();
        fetchNaturaleza();
        fetchMovimientos();
    }, []);

    const filteredPokemones = pokemones.filter(pokemon =>
        pokemon.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleShowDetails = (pokemon) => {
        setSelectedPokemon({ ...pokemon, modalType: 'details' });
    };

    const handleRegisterPokemon = (pokemon) => {
        setSelectedPokemon({ ...pokemon, modalType: 'add' });
    };

    const handleCloseModal = () => {
        setSelectedPokemon(null);
    };

    const handleMovimientoChange = (index, value) => {
        const nuevos = [...selectedMovimientos];
        nuevos[index] = value;
        setSelectedMovimientos(nuevos);
    };

    const handleAddMovimiento = () => {
        if (selectedMovimientos.length < 4) {
            setSelectedMovimientos([...selectedMovimientos, '']);
        }
    };

    const handleRemoveMovimiento = (index) => {
        const nuevos = selectedMovimientos.filter((_, i) => i !== index);
        setSelectedMovimientos(nuevos);
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
                                            onClick={() => handleRegisterPokemon(pokemon)}
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

                {/* Modal de detalles */}
                {selectedPokemon && selectedPokemon.modalType === 'details' && (
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
                        <div className="modal-dialog modal-dialog-centered" role="document" id='pokemon_modal'>
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

                {/* Modal de agregar */}
                {selectedPokemon && selectedPokemon.modalType === 'add' && (
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
                        <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
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
                                    <Form onSubmit={handleSubmit}>
                                        <Form.Group controlId="formBasicApodo">
                                            <Form.Label>Apodo</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Ingrese el apodo"
                                                value={apodo}
                                                onChange={e => setApodo(e.target.value)}
                                            />
                                        </Form.Group>
                                        <Form.Group controlId="formBasicSlot">
                                            <Form.Label>Slot</Form.Label>
                                            <Form.Control
                                                type="number"
                                                min="1"
                                                max="6"
                                                placeholder="Ingrese el número de slot (1-6)"
                                                value={slot}
                                                onChange={e => setSlot(Number(e.target.value))}
                                            />
                                        </Form.Group>
                                        <Form.Group controlId="formBasicItem">
                                            <Form.Label>Items</Form.Label>
                                            <Form.Select
                                                aria-label="Seleccione un item"
                                                value={itemId}
                                                onChange={e => setItemId(e.target.value)}
                                            >
                                                <option value="">Seleccione un item</option>
                                                {items.map(item => (
                                                    <option key={item.id} value={item.id}>{item.nombre}</option>
                                                ))}
                                            </Form.Select>
                                        </Form.Group>
                                        <Form.Group controlId="formBasicHabilidad">
                                            <Form.Label>Habilidad</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Ingrese la habilidad"
                                                value={habilidad}
                                                onChange={e => setHabilidad(e.target.value)}
                                            />
                                        </Form.Group>
                                        <Form.Group controlId="formBasicNaturaleza">
                                            <Form.Label>Naturaleza</Form.Label>
                                            <Form.Select
                                                aria-label="Seleccione una Naturaleza"
                                                value={naturalezaId}
                                                onChange={e => setNaturalezaId(e.target.value)}
                                            >
                                                <option value="">Seleccione una Naturaleza</option>
                                                {naturaleza.map(item => (
                                                    <option key={item.id} value={item.id}>{item.nombre}</option>
                                                ))}
                                            </Form.Select>
                                        </Form.Group>
                                        <Form.Group controlId="formBasicEVPHp">
                                            <Form.Label>EVP HP</Form.Label>
                                            <Form.Control
                                                type="number"
                                                min="0"
                                                max="252"
                                                placeholder="Ingrese EVP de HP"
                                                value={evHp}
                                                onChange={e => setEvHp(Number(e.target.value))}
                                            />
                                        </Form.Group>
                                        <Form.Group controlId="formBasicEVPAtk">
                                            <Form.Label>EVP Ataque</Form.Label>
                                            <Form.Control
                                                type="number"
                                                min="0"
                                                max="252"
                                                placeholder="Ingrese EVP de Ataque"
                                                value={evAtk}
                                                onChange={e => setEvAtk(Number(e.target.value))}
                                            />
                                        </Form.Group>
                                        <Form.Group controlId="formBasicEVPDef">
                                            <Form.Label>EVP Defensa</Form.Label>
                                            <Form.Control
                                                type="number"
                                                min="0"
                                                max="252"
                                                placeholder="Ingrese EVP de Defensa"
                                                value={evDef}
                                                onChange={e => setEvDef(Number(e.target.value))}
                                            />
                                        </Form.Group>
                                        <Form.Group controlId="formBasicEVPSpAtk">
                                            <Form.Label>EVP Sp. Ataque</Form.Label>
                                            <Form.Control
                                                type="number"
                                                min="0"
                                                max="252"
                                                placeholder="Ingrese EVP de Sp. Ataque"
                                                value={evSpAtk}
                                                onChange={e => setEvSpAtk(Number(e.target.value))}
                                            />
                                        </Form.Group>
                                        <Form.Group controlId="formBasicEVPSpDef">
                                            <Form.Label>EVP Sp. Defensa</Form.Label>
                                            <Form.Control
                                                type="number"
                                                min="0"
                                                max="252"
                                                placeholder="Ingrese EVP de Sp. Defensa"
                                                value={evSpDef}
                                                onChange={e => setEvSpDef(Number(e.target.value))}
                                            />
                                        </Form.Group>
                                        <Form.Group controlId="formBasicEVPSpeed">
                                            <Form.Label>EVP Velocidad</Form.Label>
                                            <Form.Control
                                                type="number"
                                                min="0"
                                                max="252"
                                                placeholder="Ingrese EVP de Velocidad"
                                                value={evSpeed}
                                                onChange={e => setEvSpeed(Number(e.target.value))}
                                            />
                                        </Form.Group>
                                        <Form.Group controlId="formBasicIVPHp">
                                            <Form.Label>IVP HP</Form.Label>
                                            <Form.Control
                                                type="number"
                                                min="0"
                                                max="31"
                                                placeholder="Ingrese IVP de HP"
                                                value={ivHp}
                                                onChange={e => setIvHp(Number(e.target.value))}
                                            />
                                        </Form.Group>
                                        <Form.Group controlId="formBasicIVPAtk">
                                            <Form.Label>IVP Ataque</Form.Label>
                                            <Form.Control
                                                type="number"
                                                min="0"
                                                max="31"
                                                placeholder="Ingrese IVP de Ataque"
                                                value={ivAtk}
                                                onChange={e => setIvAtk(Number(e.target.value))}
                                            />
                                        </Form.Group>
                                        <Form.Group controlId="formBasicIVPDef">
                                            <Form.Label>IVP Defensa</Form.Label>
                                            <Form.Control
                                                type="number"
                                                min="0"
                                                max="31"
                                                placeholder="Ingrese IVP de Defensa"
                                                value={ivDef}
                                                onChange={e => setIvDef(Number(e.target.value))}
                                            />
                                        </Form.Group>
                                        <Form.Group controlId="formBasicIVPSpAtk">
                                            <Form.Label>IVP Sp. Ataque</Form.Label>
                                            <Form.Control
                                                type="number"
                                                min="0"
                                                max="31"
                                                placeholder="Ingrese IVP de Sp. Ataque"
                                                value={ivSpAtk}
                                                onChange={e => setIvSpAtk(Number(e.target.value))}
                                            />
                                        </Form.Group>
                                        <Form.Group controlId="formBasicIVPSpDef">
                                            <Form.Label>IVP Sp. Defensa</Form.Label>
                                            <Form.Control
                                                type="number"
                                                min="0"
                                                max="31"
                                                placeholder="Ingrese IVP de Sp. Defensa"
                                                value={ivSpDef}
                                                onChange={e => setIvSpDef(Number(e.target.value))}
                                            />
                                        </Form.Group>
                                        <Form.Group controlId="formBasicIVPSpeed">
                                            <Form.Label>IVP Velocidad</Form.Label>
                                            <Form.Control
                                                type="number"
                                                min="0"
                                                max="31"
                                                placeholder="Ingrese IVP de Velocidad"
                                                value={ivSpeed}
                                                onChange={e => setIvSpeed(Number(e.target.value))}
                                            />
                                        </Form.Group>
                                        <Form.Group controlId="formBasicMovimiento">
                                            <Form.Label>Movimientos</Form.Label>
                                            {selectedMovimientos.map((mov, idx) => (
                                                <div key={idx} className="d-flex align-items-center mb-2">
                                                    <Form.Select
                                                        aria-label={`Seleccione un Movimiento ${idx + 1}`}
                                                        value={mov}
                                                        onChange={e => handleMovimientoChange(idx, e.target.value)}
                                                    >
                                                        <option value="">Seleccione un Movimiento</option>
                                                        {movimientos.map(item => (
                                                            <option key={item.id} value={item.id}>{item.nombre}</option>
                                                        ))}
                                                    </Form.Select>
                                                    {selectedMovimientos.length > 1 && (
                                                        <Button
                                                            variant="danger"
                                                            size="sm"
                                                            className="ms-2"
                                                            onClick={() => handleRemoveMovimiento(idx)}
                                                        >-</Button>
                                                    )}
                                                    {idx === selectedMovimientos.length - 1 && selectedMovimientos.length < 4 && (
                                                        <Button
                                                            variant="success"
                                                            size="sm"
                                                            className="ms-2"
                                                            onClick={handleAddMovimiento}
                                                        >+</Button>
                                                    )}
                                                </div>
                                            ))}
                                        </Form.Group>
                                        <Button variant="primary" type="submit" className="mt-3">
                                            Agregar
                                        </Button>
                                    </Form>
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