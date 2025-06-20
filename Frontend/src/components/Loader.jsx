import React, { useState } from "react";

function Loader() {
    const [loading, setLoading] = useState(false);

    const handleClick = async () => {
        setLoading(true);
        await new Promise(res => setTimeout(res, 2000));
        setLoading(false);
    };

    return (
        <div>
            <button onClick={handleClick}>Cargar</button>
            {loading && <div className="loader">Cargando...</div>}
        </div>
    );
}

export default Loader;