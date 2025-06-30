import React, { useState, useEffect } from "react";
import { Card, Col, Container, Row, Table, Button, Modal, Form } from "react-bootstrap";
import MovimientoRepository from "../../../repositories/MovimientoRepository";

const MovimientoCRUD = () => {
    const [movimientos, setMovimientos] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [editId, setEditId] = useState(null);
    const [formData, setFormData] = useState({
        nombre: "",
        tipo_id: 1,
        categoria: "",
        poder: 0,
        descripcion: "",
    });

    useEffect(() => {
        const fetchMovimientos = async () => {
            const data = await MovimientoRepository.getAllMovimientos();
            setMovimientos(data);
        };
        fetchMovimientos();
    }, []);

    const handleDelete = async (id) => {
        try {
            if (!window.confirm("¿Estás seguro de que quieres eliminar este movimiento?")) {
                return;
            }
            
            await MovimientoRepository.deleteMovimiento(id);

            setMovimientos(movimientos.filter(movimiento => movimiento.id !== id));
        } catch (error) {
            console.error("Error deleting movimiento:", error);
        }
    };
    const handleAdd = () => {
        setFormData({
            nombre: "",
            tipo_id: 1,
            categoria: "",
            poder: 0,
            descripcion: "",
        });

        setIsEdit(false);
        setEditId(null);
        setShowModal(true);
    };

    const handleEdit = (movimiento) => {
        setFormData({
            nombre: movimiento.nombre || "",
            tipo_id: movimiento.tipo_id || 1,
            categoria: movimiento.categoria || "",
            poder: movimiento.poder || 0,
            descripcion: movimiento.descripcion || "",
        });
        setIsEdit(true);
        setEditId(movimiento.id);
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
        setIsEdit(false);
        setEditId(null);
    };

    const handleModalSave = async (newmovimiento) => {
        try {
            if (isEdit && editId) {
                const updated = await MovimientoRepository.updateMovimiento(editId, newmovimiento);
                setMovimientos(movimientos.map(p => p.id_movimiento === editId ? updated : p));
                alert("Movimiento actualizado exitosamente");
            } else {
                const createdmovimiento = await MovimientoRepository.createMovimiento(newmovimiento);
                setMovimientos([...movimientos, createdmovimiento]);
                alert("Movimiento creado exitosamente");
            }
            setShowModal(false);
        } catch (error) {
            console.error("Error guardando Movimiento:", error);
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
            tipo_id: 1,
            categoria: "",
            poder: 0,
            descripcion: "",
        });
        setIsEdit(false);
        setEditId(null);
    };

    return (
        <Container>
            <h2>Movimiento CRUD</h2>
            <Button variant="primary" onClick={handleAdd} className="mb-3">Agregar Movimiento</Button>
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Nombre</th>
                                        <th>Tipo_id</th>
                                        <th>Categoria</th>
                                        <th>Poder</th>
                                        <th>Descripcion</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {movimientos.map((Movimiento) => (
                                        <tr key={Movimiento.id}>
                                            <td>{Movimiento.id}</td>
                                            <td>{Movimiento.nombre}</td>
                                            <td>{Movimiento.tipo_id}</td>
                                            <td>{Movimiento.categoria}</td>
                                            <td>{Movimiento.poder}</td>
                                            <td>{Movimiento.descripcion}</td>
                                            <td>
                                                <Button variant="warning" className="me-2" onClick={() => handleEdit(Movimiento)}>Edit</Button>
                                                <Button variant="danger" onClick={() => handleDelete(Movimiento.id)}>Delete</Button>
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
                    <Modal.Title>{isEdit ? "Editar Movimiento" : "Agregar Movimiento"}</Modal.Title>
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
                            <Form.Label>Tipo ID</Form.Label>
                            <Form.Control
                                type="number"
                                name="tipo_id"
                                value={formData.tipo_id}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Label>Categoria</Form.Label>
                            <Form.Control
                                type="text"
                                name="categoria"
                                value={formData.categoria}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Label>Poder</Form.Label>
                            <Form.Control
                                type="number"
                                name="poder"
                                value={formData.poder}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-2"></Form.Group>
                        <Form.Label>Descripcion</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="descripcion"
                            value={formData.descripcion}
                            onChange={handleInputChange}
                            required
                        />
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

export default MovimientoCRUD;