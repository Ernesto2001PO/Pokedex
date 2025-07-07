import React, { useState, useEffect } from "react";
import { Card, Col, Container, Row, Table, Button, Modal, Form } from "react-bootstrap";
import PokemonRepository from "../../../repositories/PokemonRepository";

const PokemonCRUD = () => {
    const [pokemones, setPokemons] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [editId, setEditId] = useState(null);
    const [formData, setFormData] = useState({
        nombre: "",
        base_hp: "",
        base_defense: "",
        base_attack: "",
        base_speed: "",
        base_speedAtk: "",
        base_speedDef: "",
        img_url: "",
        habilidad1: "",
        habilidad2: "",
        habilidad_oculta: ""
    });

    useEffect(() => {
        const fetchPokemons = async () => {
            const data = await PokemonRepository.getAllPokemons();
            setPokemons(data);
        };
        fetchPokemons();
    }, []);

    const handleDelete = async (id) => {
        try {
            await PokemonRepository.deletePokemon(id);
            setPokemons(pokemones.filter(pokemon => pokemon.id_pokemon !== id));
        } catch (error) {
            console.error("Error deleting pokemon:", error);
        }
    };

    const handleAdd = () => {
        setFormData({
            nombre: "",
            base_hp: "",
            base_defense: "",
            base_attack: "",
            base_speed: "",
            base_speedAtk: "",
            base_speedDef: "",
            img_url: "",
            habilidad1: "",
            habilidad2: "",
            habilidad_oculta: ""
        });
        setIsEdit(false);
        setEditId(null);
        setShowModal(true);
    };

    const handleEdit = (pokemon) => {
        setFormData({
            nombre: pokemon.nombre || "",
            base_hp: pokemon.base_hp || "",
            base_defense: pokemon.base_defense || "",
            base_attack: pokemon.base_attack || "",
            base_speed: pokemon.base_speed || "",
            base_speedAtk: pokemon.base_speedAtk || "",
            base_speedDef: pokemon.base_speedDef || "",
            img_url: pokemon.img_url || "",
            habilidad1: pokemon.habilidad1 || "",
            habilidad2: pokemon.habilidad2 || "",
            habilidad_oculta: pokemon.habilidad_oculta || ""
        });
        setIsEdit(true);
        setEditId(pokemon.id_pokemon);
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
        setIsEdit(false);
        setEditId(null);
    };

    const handleModalSave = async (newPokemon) => {
        try {
            if (isEdit && editId) {
                const updated = await PokemonRepository.updatePokemon(editId, newPokemon);
                setPokemons(pokemones.map(p => p.id_pokemon === editId ? updated : p));
                alert("Pokemon actualizado exitosamente");
            } else {
                const createdPokemon = await PokemonRepository.createPokemon(newPokemon);
                setPokemons([...pokemones, createdPokemon]);
                alert("Pokemon creado exitosamente");
            }
            setShowModal(false);
        } catch (error) {
            console.error("Error guardando pokemon:", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const data = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            data.append(key, value);
        });

        handleModalSave(data);
        setFormData({
            nombre: "",
            base_hp: "",
            base_defense: "",
            base_attack: "",
            base_speed: "",
            base_speedAtk: "",
            base_speedDef: "",
            img_url: "",
            habilidad1: "",
            habilidad2: "",
            habilidad_oculta: ""
        });
        setIsEdit(false);
        setEditId(null);
    };

    return (
        <Container>
            <h2>Pokemon CRUD</h2>
            <Button variant="primary" onClick={handleAdd} className="mb-3">Agregar Pokemon</Button>
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Nombre</th>
                                        <th>HP Base</th>
                                        <th>Defensa Base</th>
                                        <th>Ataque Base</th>
                                        <th>Velocidad Base</th>
                                        <th>Velocidad Ataque Base</th>
                                        <th>Velocidad Defensa Base</th>
                                        <th>Imagen</th>
                                        <th>Habilidad 1</th>
                                        <th>Habilidad 2</th>
                                        <th>Habilidad 3</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pokemones.map((pokemon) => (
                                        <tr key={pokemon.id_pokemon}>
                                            <td>{pokemon.id_pokemon}</td>
                                            <td>{pokemon.nombre}</td>
                                            <td>{pokemon.base_hp}</td>
                                            <td>{pokemon.base_defense}</td>
                                            <td>{pokemon.base_attack}</td>
                                            <td>{pokemon.base_speed}</td>
                                            <td>{pokemon.base_speedAtk}</td>
                                            <td>{pokemon.base_speedDef}</td>
                                            <td>
                                                <img
                                                    src={
                                                        pokemon.img_url && pokemon.img_url.startsWith("uploads/")
                                                            ? `http://localhost:3000/${pokemon.img_url}`
                                                            : pokemon.img_url
                                                    }
                                                    alt={pokemon.nombre}
                                                    style={{ width: "100px" }}
                                                />
                                            </td>
                                            <td>{pokemon.habilidad1}</td>
                                            <td>{pokemon.habilidad2}</td>
                                            <td>{pokemon.habilidad_oculta}</td>
                                            


                                            <td>
                                                <Button variant="warning" className="me-2" onClick={() => handleEdit(pokemon)}>Edit</Button>
                                                <Button variant="danger" onClick={() => handleDelete(pokemon.id_pokemon)}>Delete</Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Modal show={showModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{isEdit ? "Editar Pokemon" : "Agregar Pokemon"}</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleFormSubmit}>
                    <Modal.Body>
                        <Form.Group className="mb-2">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                type="text"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Label>HP Base</Form.Label>
                            <Form.Control
                                type="number"
                                name="base_hp"
                                value={formData.base_hp}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Label>Defensa Base</Form.Label>
                            <Form.Control
                                type="number"
                                name="base_defense"
                                value={formData.base_defense}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Label>Ataque Base</Form.Label>
                            <Form.Control
                                type="number"
                                name="base_attack"
                                value={formData.base_attack}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Label>Velocidad Base</Form.Label>
                            <Form.Control
                                type="number"
                                name="base_speed"
                                value={formData.base_speed}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Label>Velocidad Ataque Base</Form.Label>
                            <Form.Control
                                type="number"
                                name="base_speedAtk"
                                value={formData.base_speedAtk}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Label>Velocidad Defensa Base</Form.Label>
                            <Form.Control
                                type="number"
                                name="base_speedDef"
                                value={formData.base_speedDef}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Label>Imagen</Form.Label>
                            <Form.Control
                                type="file"
                                name="img_url"
                                accept="image/*"
                                onChange={e => setFormData({ ...formData, img_url: e.target.files[0] })}
                                required={!isEdit}
                            />
                            {isEdit && formData.img_url && typeof formData.img_url === "string" && (
                                <div className="mt-2">
                                    <img
                                        src={
                                            formData.img_url.startsWith("uploads/")
                                                ? `http://localhost:3000/${formData.img_url}`
                                                : formData.img_url
                                        }
                                        alt="Imagen actual"
                                        style={{ width: 100 }}
                                    />
                                    <div className="text-muted small">Selecciona una nueva imagen para reemplazar la actual.</div>
                                </div>
                            )}
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Label>Habilidad 1</Form.Label>
                            <Form.Control
                                type="text"
                                name="habilidad1"
                                value={formData.habilidad1}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Label>Habilidad 2</Form.Label>
                            <Form.Control
                                type="text"
                                name="habilidad2"
                                value={formData.habilidad2}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Label>Habilidad Oculta</Form.Label>
                            <Form.Control
                                type="text"
                                name="habilidad_oculta"
                                value={formData.habilidad_oculta}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleModalClose}>
                            Cancelar
                        </Button>
                        <Button variant="primary" type="submit">
                            Guardar
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </Container>
    );
};

export default PokemonCRUD;