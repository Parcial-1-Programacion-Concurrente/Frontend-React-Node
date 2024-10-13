// src/GaltonBoard.jsx
import React from 'react';
import PropTypes from 'prop-types';
import DistribucionTexto from './DistribucionTexto';

function GaltonBoard({ galtonBoard }) {
    if (!galtonBoard) {
        return <p>Datos no disponibles.</p>;
    }

    const tipoMaquina = galtonBoard.maquina?.tipo || 'Desconocido';
    const numBolas = galtonBoard.numBolas ?? 0; // Asignar 0 si numBolas es undefined o null

    return (
        <div style={{ border: '1px solid #ccc', padding: '20px', marginBottom: '20px' }}>
            <h2>Galton Board ID: {galtonBoard.id} - Máquina Tipo: {tipoMaquina}</h2>
            <DistribucionTexto
                distribucion={galtonBoard.distribucion?.datos || {}}
                estado={galtonBoard.estado}
                id={galtonBoard.id}
                numBolas={numBolas} // Pasar el valor manejado
            />
        </div>
    );
}

GaltonBoard.propTypes = {
    galtonBoard: PropTypes.shape({
        id: PropTypes.number.isRequired,
        numBolas: PropTypes.number, // No es más required, ya que se maneja undefined
        maquina: PropTypes.shape({
            tipo: PropTypes.string,
        }),
        distribucion: PropTypes.shape({
            datos: PropTypes.object,
        }),
        estado: PropTypes.string.isRequired,
    }).isRequired,
};

export default GaltonBoard;





