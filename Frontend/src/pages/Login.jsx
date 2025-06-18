import React from "react";

import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { Eye, EyeOff } from "lucide-react";

// Import your CSS Module
import styles from "../public/style/Login.module.css";

function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div
            className={`d-flex min-vh-100 align-items-center justify-content-center ${styles.pokemonBackground}`}
        >
            <div className={`card p-4 shadow-lg ${styles.pokemonCard}`}>
                <h1 className={`text-center mb-4 ${styles.pokemonTitle}`}>
                    Pokémon Login
                </h1>

                <Form>
                    <Form.Group className="mb-3" controlId="formUsername">
                        <Form.Control
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Trainer Name"
                            className={`py-2 ${styles.pokemonInput}`}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPassword">
                        <InputGroup>
                            <Form.Control
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Pokémon Password"
                                className={`py-2 ${styles.pokemonInput}`}
                            />
                            <Button
                                variant="outline-secondary"
                                onClick={togglePasswordVisibility}
                                className={styles.pokemonToggleButton}
                            >
                                {showPassword ? (
                                    <EyeOff className="w-5 h-5" />
                                ) : (
                                    <Eye className="w-5 h-5" />
                                )}
                            </Button>
                        </InputGroup>
                    </Form.Group>

                    <Button
                        type="submit"
                        className={`w-100 mb-3 py-2 ${styles.pokemonLoginButton}`}
                    >
                        Login
                    </Button>

                    <Button
                        type="button"
                        className={`w-100 py-2 ${styles.pokemonRegisterButton}`}
                    >
                        Register
                    </Button>
                </Form>
            </div>
        </div>
    );
}
export default Login;