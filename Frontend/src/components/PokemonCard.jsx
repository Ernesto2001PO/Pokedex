import React, { useEffect, useState } from 'react';
import Select from 'react-select';

import { useParams } from "react-router-dom";
import { Form, Button } from 'react-bootstrap';
import PokemonRepository from '../../repositories/PokemonRepository';
import ItemRepository from '../../repositories/ItemRepository';
import NaturalezaRepository from '../../repositories/NaturalezaRepository';
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


    const itemOptions = items.map(item => ({
        value: item.id,
        label: (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src={item.img_url} alt={item.nombre} style={{ width: 24, height: 24, marginRight: 8 }} />
                {item.nombre}
            </div>
        )
    }));

    // Función auxiliar para validar suma de EVs
    const totalEVs = evHp + evAtk + evDef + evSpAtk + evSpDef + evSpeed;



    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedPokemon) return;

        if (totalEVs > 508) {
            alert("La suma total de EVs no puede superar 508.");
            return;
        }

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
            if (error.response && error.response.data && error.response.data.message) {
                alert(error.response.data.message);
            }
            console.error("Error al agregar Pokémon al equipo:", error);
            alert("Error al agregar Pokémon al equipo.");
        }
    };

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                setLoading(true);
                const [pokemonesData, itemsData, naturalezasData] = await Promise.all([
                    PokemonRepository.getAllPokemons(),
                    ItemRepository.getAllItems(),
                    NaturalezaRepository.getAllNaturalezas()
                ]);

                if (Array.isArray(pokemonesData)) {
                    setPokemones(pokemonesData);
                } else {
                    setError("Error: No se pudieron cargar los Pokémon o el formato es incorrecto.");
                }

                if (Array.isArray(itemsData)) {
                    setItems(itemsData);
                } else {
                    setError("Error: No se pudieron cargar los items o el formato es incorrecto.");
                }

                if (Array.isArray(naturalezasData)) {
                    setNaturaleza(naturalezasData);
                } else {
                    setError("Error: No se pudieron cargar las naturalezas o el formato es incorrecto.");
                }

            } catch (err) {
                setError("Error al cargar datos iniciales desde el servidor: " + err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchInitialData();
    }, []);


    const handleShowDetails = async (pokemon) => {
        setLoading(true);
        try {
            const detailedPokemon = await PokemonRepository.getPokemonDetails(pokemon.id_pokemon);
            setSelectedPokemon({ ...detailedPokemon, modalType: 'details' });
            setLoading(false);
        } catch (err) {
            setError("Error al cargar los detalles del Pokémon para mostrar: " + err.message);
            setLoading(false);
        }
    };

    const handleRegisterPokemon = async (pokemon) => {
        setLoading(true);
        try {
            const detailedPokemon = await PokemonRepository.getPokemonDetails(pokemon.id_pokemon);
            setSelectedPokemon({ ...detailedPokemon, modalType: 'add' });
            setApodo('');
            setSlot(1);
            setItemId('');
            setHabilidad('');
            setNaturalezaId('');
            setEvHp(0); setEvAtk(0); setEvDef(0);
            setEvSpAtk(0); setEvSpDef(0); setEvSpeed(0);
            setIvHp(0); setIvAtk(0); setIvDef(0);
            setIvSpAtk(0); setIvSpDef(0); setIvSpeed(0);
            setSelectedMovimientos(['']);
            setLoading(false);
        } catch (err) {
            setError("Error al cargar los detalles del Pokémon para registrar: " + err.message);
            setLoading(false);
        }
    };

    const handleCloseModal = () => {
        setSelectedPokemon(null);
        setError(null);
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


    const filteredPokemones = pokemones.filter(pokemon =>
        pokemon.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
                                    <p><strong>Movimientos que puede aprender:</strong></p>
                                    <ul>
                                        {selectedPokemon.movimientosAprendibles && selectedPokemon.movimientosAprendibles.length > 0 ? (
                                            selectedPokemon.movimientosAprendibles.map(m => (
                                                <li key={m.id}>{m.nombre} (Poder: {m.poder || 'N/A'}, Categoría: {m.categoria || 'N/A'})</li>
                                            ))
                                        ) : (
                                            <li>No se encontraron movimientos aprendibles.</li>
                                        )}
                                    </ul>
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
                                        <Form.Group className="mb-3" controlId="formBasicApodo">
                                            <Form.Label>Apodo</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Ingrese el apodo"
                                                value={apodo}
                                                onChange={e => setApodo(e.target.value)}
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formBasicSlot">
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
                                        <Form.Group className="mb-3" controlId="formBasicItem">
                                            <Form.Label>Items</Form.Label>
                                            <Select
                                                options={itemOptions}
                                                value={itemOptions.find(opt => opt.value === Number(itemId)) || null}
                                                onChange={option => setItemId(option ? option.value : '')}
                                                placeholder="Seleccione un item"
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formBasicHabilidad">
                                            <Form.Label>Habilidad</Form.Label>
                                            <Form.Select
                                                value={habilidad}
                                                onChange={e => setHabilidad(e.target.value)}
                                            >
                                                <option value="">Seleccione una habilidad</option>
                                                {selectedPokemon.habilidad1 && <option value={selectedPokemon.habilidad1}>{selectedPokemon.habilidad1}</option>}
                                                {selectedPokemon.habilidad2 && <option value={selectedPokemon.habilidad2}>{selectedPokemon.habilidad2}</option>}
                                                {selectedPokemon.habilidad_oculta && <option value={selectedPokemon.habilidad_oculta}>{selectedPokemon.habilidad_oculta}</option>}
                                            </Form.Select>
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formBasicNaturaleza">
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
                                        {/* Sección de EVs */}
                                        <h6 className="mt-4 mb-2">Puntos de Esfuerzo (EVs) - Total disponible: 508</h6>
                                        <p className="text-muted small">Total asignado: {evHp + evAtk + evDef + evSpAtk + evSpDef + evSpeed} / 508</p>
                                        <Form.Group className="mb-2" controlId="formBasicEVPHp">
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
                                        <Form.Group className="mb-2" controlId="formBasicEVPAtk">
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
                                        <Form.Group className="mb-2" controlId="formBasicEVPDef">
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
                                        <Form.Group className="mb-2" controlId="formBasicEVPSpAtk">
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
                                        <Form.Group className="mb-2" controlId="formBasicEVPSpDef">
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
                                        <Form.Group className="mb-2" controlId="formBasicEVPSpeed">
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

                                        {/* Sección de IVs */}
                                        <h6 className="mt-4 mb-2">Valores Individuales (IVs) - Rango: 0-31</h6>
                                        <Form.Group className="mb-2" controlId="formBasicIVPHp">
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
                                        <Form.Group className="mb-2" controlId="formBasicIVPAtk">
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
                                        <Form.Group className="mb-2" controlId="formBasicIVPDef">
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
                                        <Form.Group className="mb-2" controlId="formBasicIVPSpAtk">
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
                                        <Form.Group className="mb-2" controlId="formBasicIVPSpDef">
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
                                        <Form.Group className="mb-2" controlId="formBasicIVPSpeed">
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
                                        <Form.Group className="mb-3" controlId="formBasicMovimiento">
                                            <Form.Label>Movimientos</Form.Label>
                                            {selectedMovimientos.map((movId, idx) => (
                                                <div key={idx} className="d-flex align-items-center mb-2">
                                                    <Form.Select
                                                        aria-label={`Seleccione un Movimiento ${idx + 1}`}
                                                        value={movId}
                                                        onChange={e => handleMovimientoChange(idx, e.target.value)}
                                                    >
                                                        <option value="">Seleccione un Movimiento</option>
                                                        {selectedPokemon.movimientosAprendibles && selectedPokemon.movimientosAprendibles.length > 0 ? (
                                                            selectedPokemon.movimientosAprendibles.map(movimientoAprendible => (
                                                                <option key={movimientoAprendible.id} value={movimientoAprendible.id}>
                                                                    {movimientoAprendible.nombre} (Poder: {movimientoAprendible.poder || 'N/A'})
                                                                </option>
                                                            ))
                                                        ) : (
                                                            <option disabled>Cargando movimientos o no hay disponibles</option>
                                                        )}
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