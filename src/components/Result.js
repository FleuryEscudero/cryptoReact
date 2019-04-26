import React from 'react';

const Result = ({ result }) => {

    //Objeto vacio con object.entries

    if (Object.entries(result).length === 0) return null;

    return (


        <div className="resultado">
            <h2>Resultado</h2>
            <p className="precio">El precio es: <span>{result.PRICE}</span></p>
            <p>Ultima Actualización: <span>{result.LASTUPDATE}</span></p>
            <p>Precio mas alto del dia  <span>{result.HIGHDAY}</span></p>
            <p>Precio mas bajo del dia <span>{result.LOWDAY}</span></p>

        </div>
    );
}

export default Result;