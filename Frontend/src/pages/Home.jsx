import React from "react";
import Menu from "../components/Menu";
import TeamCard from "../components/TeamCard";

function Home() {

    








    return (
        <>
            <Menu />
            <div className="container mt-4">
                <div className="row justify-content-center">
                    <div className="col-md-8 text-center"> 
                        <h1 className="mb-3">Bienvenido a tu equipo Pokémon</h1> 
                        <p className="lead mb-4">Aquí puedes ver y gestionar todos tus equipos Pokémon. ¡Crea tu equipo y comienza tu aventura!</p>

                        <button className="btn btn-primary btn-lg mb-5" onClick={() => window.location.href = '/crearEquipo'}>
                            Crear Nuevo Equipo
                        </button>

                        <h2 className="mb-4">Tus equipos:</h2>
                    </div>
                </div>
                <TeamCard />
            </div>
        </>
    );
}

export default Home;