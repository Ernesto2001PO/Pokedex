import React from "react";
import PokemonCard from "../components/PokemonCard";

import Menu from "../components/Menu";
import TeamCardById from "../components/TeamCardById";

const AgregarPokemones = () => {
    return (
        <>
            <Menu />
            <title>Agregar Pokémon</title>
            <meta name="description" content="Página para agregar Pokémon a tu equipo" />
            <div className="container mt-5">
                <h1 className="text-center mb-4">Agregar Pokémon a tu Equipo</h1>
                <TeamCardById />
                <div className="text-center">
                <PokemonCard />
            </div>

            </div>
        </>
    );
}

export default AgregarPokemones;