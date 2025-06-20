import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import userRepository from "../../repositories/UserRepository";
import Menu from "../components/Menu";
import { useNavigate } from "react-router-dom"; 

// Import your new CSS Module
import styles from "../public/style/RegistroPokemon.module.css"; 

const Registro = () => {
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await userRepository.registerUser({
                nombre,
                email,
                password_hash: password, // Make sure your backend expects 'password_hash'
            });
            if (response) {
                alert("¡Registro exitoso! ¡Bienvenido, entrenador!");
                navigate('/'); 
            }
        } catch (error) {
            console.error("Error al registrar el usuario:", error);
            alert("Error en el registro. Por favor, inténtalo de nuevo.");
        }
    };

    return (
        <>
            <Menu/>
            <div
                className={`d-flex min-vh-100 align-items-center justify-content-center ${styles.pokemonBackground}`}
            >
                <div className={`container ${styles.pokemonCardContainer}`}>
                    <h1 className={`text-center mb-4 ${styles.pokemonTitle}`}>
                        ¡Conviértete en Entrenador Pokémon!
                    </h1>
                    <Form onSubmit={handleRegister}>
                        <Form.Group className="mb-3" controlId="nombre">
                            <Form.Label className={styles.pokemonLabel}>Nombre Completo</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ash Ketchum"
                                onChange={(e) => setNombre(e.target.value)}
                                className={styles.pokemonInput}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label className={styles.pokemonLabel}>Correo Electrónico</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="tu_nombre@pokemail.com"
                                onChange={(e) => setEmail(e.target.value)}
                                className={styles.pokemonInput}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label className={styles.pokemonLabel}>Contraseña de Entrenador</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Crea tu contraseña secreta"
                                onChange={(e) => setPassword(e.target.value)}
                                className={styles.pokemonInput}
                                required
                            />
                        </Form.Group>
                        <Button
                            variant="primary"
                            type="submit"
                            className={`w-100 mt-3 ${styles.pokemonRegisterButton}`}
                        >
                            ¡Inicia tu Aventura Pokémon! (Registrarse)
                        </Button>
                        <Button
                            variant="secondary"
                            className={`w-100 mt-2 ${styles.pokemonLoginButton}`}
                            onClick={() => navigate('/')}
                        >
                            Ya tengo una cuenta (Iniciar Sesión)
                        </Button>
                    </Form>
                </div>
            </div>
        </>
    );
};

export default Registro;