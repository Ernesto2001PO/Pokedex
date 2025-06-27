import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";


import EquipoRepository from "../../repositories/EquipoRepository";
import ItemRepository from '../../repositories/ItemRepository';
import MovimientoRepository from '../../repositories/MovimientoRepository';
import TiposRepository from '../../repositories/TiposRepository';
import PokemonRepository from '../../repositories/PokemonRepository';


const EditPokemonEnEquipo = () => {
    const { id } = useParams();
    const [pokemonData, setPokemonData] = useState(null);
    const [form, setForm] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    const [items, setItems] = useState([]);
    const [movimientos, setMovimientos] = useState([]);
    const [tiposPosibles, setTiposPosibles] = useState([]);
    const [pokemones, setPokemones] = useState([]);







    useEffect(() => {
        const fetchPokemonData = async () => {
            try {
                const data = await EquipoRepository.pokemonInTeam(id);
                setPokemonData(data);
                setForm({
                    apodo: data.apodo || "",
                    items_id: data.items_id || "",
                    habilidad: data.habilidad || "",
                    naturaleza_id: data.naturaleza_id || "",
                    ev_hp: data.ev_hp || 0,
                    ev_atk: data.ev_atk || 0,
                    ev_def: data.ev_def || 0,
                    ev_spatk: data.ev_spatk || 0,
                    ev_spdef: data.ev_spdef || 0,
                    ev_speed: data.ev_speed || 0,
                    iv_hp: data.iv_hp || 0,
                    iv_atk: data.iv_atk || 0,
                    iv_def: data.iv_def || 0,
                    iv_spatk: data.iv_spatk || 0,
                    iv_spdef: data.iv_spdef || 0,
                    iv_speed: data.iv_speed || 0,
                    movimiento1_id: data.movimiento1_id || null,
                    movimiento2_id: data.movimiento2_id || null,
                    movimiento3_id: data.movimiento3_id || null,
                    movimiento4_id: data.movimiento4_id || null,
                });
            } catch (error) {
                console.error("Error fetching Pokémon data:", error);
            }
        };
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
        const fetchTipos = async () => {
            try {
                const data = await TiposRepository.getAllTipos();
                if (!data || !Array.isArray(data)) {
                    setError("Error: No se pudieron cargar los tipos o el formato es incorrecto.");
                    setTiposPosibles([]);
                    return;
                }
                setTiposPosibles(data);
            } catch (err) {
                setError("Error al cargar los tipos desde el servidor.");
                setTiposPosibles([]);
            } finally {
                setLoading(false);
            }
        };

        fetchPokemonData();
        fetchItems();
        fetchMovimientos();
        fetchTipos();
        fetchPokemones();

    }, [id]);





    if (loading || !pokemonData) {
        return <div>Cargando...</div>;
    }

    const pokemonActual = pokemones.find(
        p => Number(p.id_pokemon) === Number(pokemonData.pokemon_id)
    );


    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Si quieres enviar tipos como array de nombres o ids:
        // Si tu select de tipos es simple (solo uno):
        // form.tipos ya es un array: [tipoSeleccionado]
        // Si quieres permitir varios tipos, deberías usar un select múltiple y ajustar el form.

        try {
            await EquipoRepository.updatePokemonEnEquipo(id, form);
            alert("Cambios guardados correctamente");
        } catch (error) {
            alert("Error al guardar los cambios");
        }
    };
    const handleClose = () => {
        window.history.back(); 
    };



    return (
        <div className="container mt-4">
            <h1>Editar Pokémon en Equipo</h1>
            <img
                src={pokemonData.img_url || pokemonData.pokemon?.img_url}
                alt={pokemonData.nombre || pokemonData.pokemon?.nombre}
                width={120}
            />
            <h2>{pokemonData.nombre}</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="apodo">
                    <Form.Label>Apodo</Form.Label>
                    <Form.Control
                        name="apodo"
                        value={form.apodo}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="items_id">
                    <Form.Label>Ítem</Form.Label>
                    <Form.Select
                        name="items_id"
                        value={form.items_id}
                        onChange={handleChange}
                    >
                        <option value="">Seleccione un ítem</option>
                        {items.map((item) => (
                            <option key={item.id} value={item.id}>
                                {item.nombre}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="tipos">
                    <Form.Label>Tipo(s)</Form.Label>
                    <Form.Select
                        name="tipos"
                        value={form.tipos ? form.tipos[0] : (pokemonData.tipos[0] || "")}
                        onChange={e => setForm({ ...form, tipos: [e.target.value] })}
                    >
                        <option value="">Seleccione un tipo</option>
                        {tiposPosibles.map((tipo, idx) => (
                            <option key={tipo.id_tipo} value={tipo.nombre}>{tipo.nombre}</option>
                        ))}
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="habilidad">
                    <Form.Label>Habilidad</Form.Label>
                    <Form.Select
                        name="habilidad"
                        value={form.habilidad}
                        onChange={handleChange}
                    >
                        <option value="">Seleccione una habilidad</option>
                        {pokemonActual?.habilidad1 && (
                            <option value={pokemonActual.habilidad1}>{pokemonActual.habilidad1}</option>
                        )}
                        {pokemonActual?.habilidad2 && (
                            <option value={pokemonActual.habilidad2}>{pokemonActual.habilidad2}</option>
                        )}
                        {pokemonActual?.habilidad_oculta && (
                            <option value={pokemonActual.habilidad_oculta}>{pokemonActual.habilidad_oculta}</option>
                        )}
                    </Form.Select>
                </Form.Group>

                <Form.Label>EVs</Form.Label>
                <div className="mb-3 d-flex flex-wrap gap-2">
                    <Form.Control type="number" name="ev_hp" value={form.ev_hp} onChange={handleChange} placeholder="HP" />
                    <Form.Control type="number" name="ev_atk" value={form.ev_atk} onChange={handleChange} placeholder="Atk" />
                    <Form.Control type="number" name="ev_def" value={form.ev_def} onChange={handleChange} placeholder="Def" />
                    <Form.Control type="number" name="ev_spatk" value={form.ev_spatk} onChange={handleChange} placeholder="SpAtk" />
                    <Form.Control type="number" name="ev_spdef" value={form.ev_spdef} onChange={handleChange} placeholder="SpDef" />
                    <Form.Control type="number" name="ev_speed" value={form.ev_speed} onChange={handleChange} placeholder="Speed" />
                </div>
                <Form.Label>IVs</Form.Label>
                <div className="mb-3 d-flex flex-wrap gap-2">
                    <Form.Control type="number" name="iv_hp" value={form.iv_hp} onChange={handleChange} placeholder="HP" />
                    <Form.Control type="number" name="iv_atk" value={form.iv_atk} onChange={handleChange} placeholder="Atk" />
                    <Form.Control type="number" name="iv_def" value={form.iv_def} onChange={handleChange} placeholder="Def" />
                    <Form.Control type="number" name="iv_spatk" value={form.iv_spatk} onChange={handleChange} placeholder="SpAtk" />
                    <Form.Control type="number" name="iv_spdef" value={form.iv_spdef} onChange={handleChange} placeholder="SpDef" />
                    <Form.Control type="number" name="iv_speed" value={form.iv_speed} onChange={handleChange} placeholder="Speed" />
                </div>
                <Form.Group className="mb-3" controlId="movimiento1_id">
                    <Form.Label>Movimiento 1</Form.Label>
                    <Form.Select
                        name="movimiento1_id"
                        value={form.movimiento1_id}
                        onChange={handleChange}
                    >
                        <option value="">Seleccione un movimiento</option>
                        {movimientos.map((mov) => (
                            <option key={mov.id} value={mov.id}>
                                {mov.nombre}
                            </option>
                        ))}
                    </Form.Select>
                    {/* Mostrar info del movimiento seleccionado */}
                    {pokemonData.movimientos?.movimiento1 && (
                        <div className="mt-1 small text-muted">
                            Poder: {pokemonData.movimientos.movimiento1.poder} | Tipo: {pokemonData.movimientos.movimiento1.tipo_nombre}
                        </div>
                    )}
                </Form.Group>
                <Form.Group className="mb-3" controlId="movimiento2_id">
                    <Form.Label>Movimiento 2</Form.Label>
                    <Form.Select
                        name="movimiento2_id"
                        value={form.movimiento2_id}
                        onChange={handleChange}
                    >
                        <option value="">Seleccione un movimiento</option>
                        {movimientos.map((mov) => (
                            <option key={mov.id} value={mov.id}>
                                {mov.nombre}
                            </option>
                        ))}
                    </Form.Select>
                    {pokemonData.movimientos?.movimiento2 && (
                        <div className="mt-1 small text-muted">
                            Poder: {pokemonData.movimientos.movimiento2.poder} | Tipo: {pokemonData.movimientos.movimiento2.tipo_nombre}
                        </div>
                    )}

                </Form.Group>
                <Form.Group className="mb-3" controlId="movimiento3_id">
                    <Form.Label>Movimiento 3</Form.Label>
                    <Form.Select
                        name="movimiento3_id"
                        value={form.movimiento3_id}
                        onChange={handleChange}
                    >
                        <option value="">Seleccione un movimiento</option>
                        {movimientos.map((mov) => (
                            <option key={mov.id} value={mov.id}>
                                {mov.nombre}
                            </option>
                        ))}

                    </Form.Select>
                    {pokemonData.movimientos?.movimiento3 && (
                        <div className="mt-1 small text-muted">
                            Poder: {pokemonData.movimientos.movimiento3.poder} | Tipo: {pokemonData.movimientos.movimiento3.tipo_nombre}
                        </div>
                    )}
                </Form.Group>
                <Form.Group className="mb-3" controlId="movimiento4_id">
                    <Form.Label>Movimiento 4</Form.Label>
                    <Form.Select
                        name="movimiento4_id"
                        value={form.movimiento4_id}
                        onChange={handleChange}
                    >
                        <option value="">Seleccione un movimiento</option>
                        {movimientos.map((mov) => (
                            <option key={mov.id} value={mov.id}>
                                {mov.nombre}
                            </option>
                        ))}
                    </Form.Select>
                    {pokemonData.movimientos?.movimiento4 && (
                        <div className="mt-1 small text-muted">
                            Poder: {pokemonData.movimientos.movimiento4.poder} | Tipo: {pokemonData.movimientos.movimiento4.tipo_nombre}
                        </div>
                    )}
                </Form.Group>
                <Button variant="primary" type="submit">
                    Guardar cambios
                </Button>
                <Button variant="secondary" onClick={handleClose}>
                    Cancelar
                </Button>
                <Button variant="danger" onClick={() => {
                    if (window.confirm("¿Estás seguro de que quieres eliminar este Pokémon del equipo?")) {
                        EquipoRepository.deletePokemonEnEquipo(id)
                            .then(() => {
                                alert("Pokémon eliminado del equipo");
                                window.history.back(); 
                            })
                            .catch(err => {
                                console.error("Error al eliminar Pokémon del equipo:", err);
                                alert("Error al eliminar Pokémon del equipo");
                            });
                    }
                }}>
                    Eliminar Pokémon
                </Button>
            </Form>
        </div>
    );
};

export default EditPokemonEnEquipo;