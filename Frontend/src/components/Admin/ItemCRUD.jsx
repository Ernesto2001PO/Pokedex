import React, { useState, useEffect } from "react";
import { Card, Col, Container, Row, Table, Button, Modal, Form } from "react-bootstrap";
import ItemRepository from "../../../repositories/ItemRepository";

const ItemCRUD = () => {
    const [items, setItems] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [editId, setEditId] = useState(null);
    const [formData, setFormData] = useState({
        nombre: "",
        descripcion: "",
        img_url: "",
    });

    useEffect(() => {
        const fetchItems = async () => {
            const data = await ItemRepository.getAllItems();
            setItems(data);
        };
        fetchItems();
    }, []);

    const handleDelete = async (id) => {
        try {
            await ItemRepository.deleteItem(id);
            setItems(items.filter(item => item.id_item !== id));
        } catch (error) {
            console.error("Error deleting item:", error);
        }
    };



    const handleAdd = () => {
        setFormData({
            nombre: "",
            img_url: "",
            descripcion: ""
        });

        setIsEdit(false);
        setEditId(null);
        setShowModal(true);
    };

    const handleEdit = (item) => {
        setFormData({
            nombre: item.nombre || "",
            img_url: item.img_url || "",
            descripcion: item.descripcion || "",
        });
        setIsEdit(true);
        setEditId(item.id);
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
        setIsEdit(false);
        setEditId(null);
    };

    const handleModalSave = async (newItem) => {
        try {
            if (isEdit && editId) {
                const updated = await ItemRepository.updateItem(editId, newItem);
                setItems(items.map(p => p.id_Item === editId ? updated : p));
                alert("Item actualizado exitosamente");
            } else {
                const createdItem = await ItemRepository.createItem(newItem);
                setItems([...items, createdItem]);
                alert("Item creado exitosamente");
            }
            setShowModal(false);
        } catch (error) {
            console.error("Error guardando Item:", error);
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
            img_url: "",
            descripcion: ""
        });
        setIsEdit(false);
        setEditId(null);
    };

    return (
        <Container>
            <h2>Item CRUD</h2>
            <Button variant="primary" onClick={handleAdd} className="mb-3">Agregar Item</Button>
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Nombre</th>
                                        <th>Imagen</th>
                                        <th>Descripcion</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.map((Item) => (
                                        <tr key={Item.id_Item}>
                                            <td>{Item.id_Item}</td>
                                            <td>{Item.nombre}</td>
                                            <td>
                                                <img
                                                    src={
                                                        Item.img_url && Item.img_url.startsWith("uploads/")
                                                            ? `http://localhost:3000/${Item.img_url}`
                                                            : Item.img_url
                                                    }
                                                    alt={Item.nombre}
                                                    style={{ width: "100px" }}
                                                />
                                            </td>
                                            <td>{Item.descripcion}</td>
                                            <td>
                                                <Button variant="warning" className="me-2" onClick={() => handleEdit(Item)}>Edit</Button>
                                                <Button variant="danger" onClick={() => handleDelete(Item.id_Item)}>Delete</Button>
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
                    <Modal.Title>{isEdit ? "Editar Item" : "Agregar Item"}</Modal.Title>
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
                            <Form.Label>Descripcion </Form.Label>
                            <Form.Control
                                type="text"
                                name="descripcion"
                                value={formData.descripcion}
                                onChange={handleInputChange}
                                required
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

export default ItemCRUD;