import React from "react";

import Menu from "../components/Menu";


function Home() {
    return (
        <>
            <Menu />
            <div className="d-flex min-vh-100 align-items-center justify-content-center">
                <h1>Welcome to the Home Page</h1>
            </div>
        </>
    );
}
export default Home;