import React from "react";

import PokemonCRUD from "../../components/Admin/PokemonCRUD";
import ItemCRUD from "../../components/Admin/ItemCRUD";
import MovimientoCRUD from "../../components/Admin/MovimientoCRUD";
import { Container, Tab, Tabs } from "react-bootstrap";
import Menu from "../../components/Menu";
import UsuarioAdmin from "../../components/Admin/UsuarioAdmin";

function Admin() {

  const styleContainer = {
    backgroundColor: "#554c5f",
    width: "100%",
    height: "100%",
    padding: "20px",
    color: "white",
  };

  return (
    <>
      <Menu />
      <Container className="mt-4" style={styleContainer}>
        <Tabs defaultActiveKey="equipos" id="admin-tabs" className="mb-3">
          <Tab eventKey="equipos" title="Movimientos">
            <MovimientoCRUD />
          </Tab>
          <Tab eventKey="pokemones" title="Pokemones">
            <PokemonCRUD />
          </Tab>
          <Tab eventKey="items" title="Items">
            <ItemCRUD />
          </Tab>
          <Tab eventKey="usuarios" title="Usuarios">
            <UsuarioAdmin />
            </Tab>
        </Tabs>
      </Container>
    </>
  );
}

export default Admin;
