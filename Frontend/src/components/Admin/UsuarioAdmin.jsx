import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row, Table, Button, Form, Modal } from "react-bootstrap";
import UserRepository from "../../../repositories/UserRepository";

const UsuarioAdmin = () => {
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [selectedUserId, setSelectedUserId] = useState(null);


    useEffect(() => {
        const getUsers = async () => {
            try {
                const users = await UserRepository.getAllUsers();
                console.log("Usuarios obtenidos:", users);
                setUsers(users);
            } catch (error) {
                console.error("Error al obtener usuarios:", error);
            }
        }
        getUsers();
    }, []);

    const handleCloseModal = () => {
        setShowModal(false);
        setNewPassword("");
    }

    const changePassword = (id_usuario) => {
        setSelectedUserId(id_usuario);
        setShowModal(true);p
        setNewPassword("");
    }

    const handleModalSave = async () => {
        const updated = await UserRepository.changePassword(selectedUserId, newPassword);
        setShowModal(false);
        setNewPassword("");
        if (updated) {
            alert("Contraseña actualizada exitosamente");
        } else {
            alert("Error al actualizar la contraseña");
        }
    }


    const makeAdmin = async (id_usuario) => {
        try {

            await UserRepository.makeAdmin(id_usuario);
        } catch (error) {
            console.error("Error al promover usuario a administrador:", error);
        }
    }

    return (
        <>
            <div>
                <h1>Usuarios</h1>
                <p>Funcionalidad no implementada.</p>
            </div>

            <Container>
                <Row>
                    <Col>
                        <Card>
                            <Card.Body>
                                <h5>Gestión de Usuarios</h5>

                                <Table striped bordered hover responsive>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Nombre</th>
                                            <th>Email</th>
                                            <th>Password</th>
                                            <th>Es_admin</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map((user) => (
                                            <tr key={user.id}>
                                                <td>{user.id}</td>
                                                <td>{user.nombre}</td>
                                                <td>{user.email}</td>
                                                <td>{user.password_hash}</td>
                                                <td>{user.es_admin}</td>
                                                {user.es_admin === true ? (
                                                    <td>
                                                        <Button variant="secondary" size="sm" disabled>
                                                            Ya es administrador
                                                        </Button>
                                                    </td>
                                                ) : (
                                                    <td>
                                                        <Button variant="primary" size="sm" disabled>
                                                            No es administrador
                                                        </Button>
                                                    </td>
                                                )}
                                                <td>
                                                    {!user.es_admin && (
                                                        <Button variant="warning" size="sm" className="me-2" onClick={() => makeAdmin(user.id)}>
                                                            Hacer administrador
                                                        </Button>
                                                    )}
                                                </td>
                                                <td>
                                                    <Button variant="danger" size="sm" onClick={() => changePassword(user.id)}>
                                                        Cambiar contraseña
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td colSpan="4">Total de usuarios: {users.length}</td>
                                        </tr>
                                    </tfoot>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <Modal show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Cambiar contraseña</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Ingrese la nueva contraseña para el usuario seleccionado.</p>
                        <Form onSubmit={e => { e.preventDefault(); handleModalSave(); }}>
                            <Form.Group controlId="formBasicPassword" className="mb-3">
                                <Form.Label>Nueva contraseña</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Ingrese nueva contraseña"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <div className="d-flex justify-content-end">
                                <Button variant="secondary" onClick={handleCloseModal} className="me-2">
                                    Cancelar
                                </Button>
                                <Button variant="primary" type="submit">
                                    Cambiar contraseña
                                </Button>
                            </div>
                        </Form>
                    </Modal.Body>
                </Modal>
            </Container>


        </>


    );
}

export default UsuarioAdmin;
