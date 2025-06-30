import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Select from 'react-select';


import EquipoRepository from "../../repositories/EquipoRepository";
import ItemRepository from '../../repositories/ItemRepository';
import TiposRepository from '../../repositories/TiposRepository';
import PokemonRepository from '../../repositories/PokemonRepository';


const EditPokemonEnEquipo = () => {
    const { id } = useParams();
    const [pokemonData, setPokemonData] = useState(null);
    const [pokemonSpeciesData, setPokemonSpeciesData] = useState(null);
    const [form, setForm] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [items, setItems] = useState([]);
    const [tiposPosibles, setTiposPosibles] = useState([]);


    const itemOptions = items.map(item => ({
        value: item.id,
        label: (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src={item.img_url} alt={item.nombre} style={{ width: 24, height: 24, marginRight: 8 }} />
                {item.nombre}
            </div>
        )
    }));




    useEffect(() => {
        const fetchAllData = async () => {
            setLoading(true);
            setError(null);
            try {
                const dataEnEquipo = await EquipoRepository.pokemonInTeam(id);
                setPokemonData(dataEnEquipo);
                const dataPokemonSpecies = await PokemonRepository.getPokemonDetails(dataEnEquipo.pokemon_id);
                setPokemonSpeciesData(dataPokemonSpecies);
                setForm({
                    apodo: dataEnEquipo.apodo || "",
                    items_id: dataEnEquipo.items_id || "",
                    habilidad: dataEnEquipo.habilidad || "",
                    naturaleza_id: dataEnEquipo.naturaleza_id || "",
                    ev_hp: dataEnEquipo.ev_hp || 0,
                    ev_atk: dataEnEquipo.ev_atk || 0,
                    ev_def: dataEnEquipo.ev_def || 0,
                    ev_spatk: dataEnEquipo.ev_spatk || 0,
                    ev_spdef: dataEnEquipo.ev_spdef || 0,
                    ev_speed: dataEnEquipo.ev_speed || 0,
                    iv_hp: dataEnEquipo.iv_hp || 0,
                    iv_atk: dataEnEquipo.iv_atk || 0,
                    iv_def: dataEnEquipo.iv_def || 0,
                    iv_spatk: dataEnEquipo.iv_spatk || 0,
                    iv_spdef: dataEnEquipo.iv_spdef || 0,
                    iv_speed: dataEnEquipo.iv_speed || 0,
                    movimiento1_id: dataEnEquipo.movimiento1_id || null,
                    movimiento2_id: dataEnEquipo.movimiento2_id || null,
                    movimiento3_id: dataEnEquipo.movimiento3_id || null,
                    movimiento4_id: dataEnEquipo.movimiento4_id || null,
                });

                const itemsData = await ItemRepository.getAllItems();
                if (Array.isArray(itemsData)) setItems(itemsData); else setError("Error: Formato de items incorrecto.");

                const tiposData = await TiposRepository.getAllTipos();
                if (Array.isArray(tiposData)) setTiposPosibles(tiposData); else setError("Error: Formato de tipos incorrecto.");


            } catch (err) {
                console.error("Error al cargar datos:", err);
                setError("Error al cargar los datos del Pokémon para edición.");
            } finally {
                setLoading(false);
            }
        };

        fetchAllData();

    }, [id]);

    if (loading || !pokemonData || !pokemonSpeciesData || !form) {
        return <div>Cargando datos del Pokémon...</div>;
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await EquipoRepository.updatePokemonEnEquipo(id, form);
            alert("Cambios guardados correctamente");
            window.history.back();
        } catch (error) {
            console.error("Error al guardar los cambios:", error);
            alert("Error al guardar los cambios. " + (error.response?.data?.message || ""));
        }
    };

    const handleClose = () => {
        window.history.back();
    };

    return (
        <div className="container mt-4">
            <h1>Editar Pokémon en Equipo</h1>
            <img
                src={pokemonData.img_url}
                alt={pokemonData.nombre}
                width={120}
            />
            <h2>{pokemonData.pokemon?.nombre}</h2>
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
                    <Select
                        options={itemOptions}
                        value={itemOptions.find(opt => opt.value === Number(form.items_id)) || null}
                        onChange={option =>
                            setForm({ ...form, items_id: option ? option.value : '' })
                        }
                        placeholder="Seleccione un item"
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="tipos">
                    <Form.Label>Tipo(s)</Form.Label>
                    <Form.Select
                        name="tipos"
                        value={pokemonSpeciesData.tipos && pokemonSpeciesData.tipos.length > 0
                            ? pokemonSpeciesData.tipos[0].nombre
                            : ""}
                        onChange={e => { }}
                        disabled
                    >
                        <option value="">Seleccione un tipo</option>
                        {tiposPosibles.map((tipo) => (
                            <option key={tipo.id_tipo} value={tipo.nombre}>{tipo.nombre}</option>
                        ))}
                    </Form.Select>
                    {pokemonSpeciesData.tipos && (
                        <div className="mt-1 small text-muted">
                            Tipos de {pokemonSpeciesData.nombre}: {pokemonSpeciesData.tipos.map(t => t.nombre).join(', ')}
                        </div>
                    )}
                </Form.Group>

                <Form.Group className="mb-3" controlId="habilidad">
                    <Form.Label>Habilidad</Form.Label>
                    <Form.Select
                        name="habilidad"
                        value={form.habilidad}
                        onChange={handleChange}
                    >
                        <option value="">Seleccione una habilidad</option>
                        {pokemonSpeciesData.habilidad1 && (
                            <option value={pokemonSpeciesData.habilidad1}>{pokemonSpeciesData.habilidad1}</option>
                        )}
                        {pokemonSpeciesData.habilidad2 && (
                            <option value={pokemonSpeciesData.habilidad2}>{pokemonSpeciesData.habilidad2}</option>
                        )}
                        {pokemonSpeciesData.habilidad_oculta && (
                            <option value={pokemonSpeciesData.habilidad_oculta}>{pokemonSpeciesData.habilidad_oculta}</option>
                        )}
                    </Form.Select>
                </Form.Group>
                <Form.Label>EVs</Form.Label>
                <div className="mb-3 d-flex flex-wrap gap-2">
                    <Form.Control type="number" name="ev_hp" value={form.ev_hp} onChange={handleChange} placeholder="HP" min="0" max="252" />
                    <Form.Control type="number" name="ev_atk" value={form.ev_atk} onChange={handleChange} placeholder="Atk" min="0" max="252" />
                    <Form.Control type="number" name="ev_def" value={form.ev_def} onChange={handleChange} placeholder="Def" min="0" max="252" />
                    <Form.Control type="number" name="ev_spatk" value={form.ev_spatk} onChange={handleChange} placeholder="SpAtk" min="0" max="252" />
                    <Form.Control type="number" name="ev_spdef" value={form.ev_spdef} onChange={handleChange} placeholder="SpDef" min="0" max="252" />
                    <Form.Control type="number" name="ev_speed" value={form.ev_speed} onChange={handleChange} placeholder="Speed" min="0" max="252" />
                </div>
                <Form.Label>IVs</Form.Label>
                <div className="mb-3 d-flex flex-wrap gap-2">
                    <Form.Control type="number" name="iv_hp" value={form.iv_hp} onChange={handleChange} placeholder="HP" min="0" max="31" />
                    <Form.Control type="number" name="iv_atk" value={form.iv_atk} onChange={handleChange} placeholder="Atk" min="0" max="31" />
                    <Form.Control type="number" name="iv_def" value={form.iv_def} onChange={handleChange} placeholder="Def" min="0" max="31" />
                    <Form.Control type="number" name="iv_spatk" value={form.iv_spatk} onChange={handleChange} placeholder="SpAtk" min="0" max="31" />
                    <Form.Control type="number" name="iv_spdef" value={form.iv_spdef} onChange={handleChange} placeholder="SpDef" min="0" max="31" />
                    <Form.Control type="number" name="iv_speed" value={form.iv_speed} onChange={handleChange} placeholder="Speed" min="0" max="31" />
                </div>
                {[1, 2, 3, 4].map((index) => (
                    <Form.Group className="mb-3" controlId={`movimiento${index}_id`} key={`movimiento${index}_id`}>
                        <Form.Label>Movimiento {index}</Form.Label>
                        <Form.Select
                            name={`movimiento${index}_id`}
                            value={form[`movimiento${index}_id`]}
                            onChange={handleChange}
                        >
                            <option value="">Seleccione un movimiento</option>
                            {pokemonSpeciesData.movimientosAprendibles && pokemonSpeciesData.movimientosAprendibles.length > 0 ? (
                                pokemonSpeciesData.movimientosAprendibles.map((mov) => (
                                    <option key={mov.id} value={mov.id}>
                                        {mov.nombre} (Poder: {mov.poder || 'N/A'})
                                    </option>
                                ))
                            ) : (
                                <option disabled>Cargando movimientos o no hay disponibles</option>
                            )}
                        </Form.Select>
                    </Form.Group>
                ))}
                <div className="d-flex gap-2 mt-4">
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
                </div>
            </Form>
        </div>
    );
};

export default EditPokemonEnEquipo;