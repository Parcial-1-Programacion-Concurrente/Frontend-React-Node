// src/GaltonBoard.jsx
import React from 'react';
import PropTypes from 'prop-types';
import DistribucionTexto from './DistribucionTexto';

function GaltonBoard({ galtonBoard }) {
    if (!galtonBoard) {
        return <p>Datos no disponibles.</p>;
    }

    const tipoMaquina = galtonBoard.maquina?.tipo || 'Desconocido';

    return (
        <div style={{ border: '1px solid #ccc', padding: '20px', marginBottom: '20px' }}>
            <h2>Galton Board ID: {galtonBoard.id} - Máquina Tipo: {tipoMaquina}</h2>
            <DistribucionTexto
                distribucion={galtonBoard.distribucion?.datos || {}}
                estado={galtonBoard.estado}
                id={galtonBoard.id}
                numBolas={galtonBoard.numBolas}
            />
        </div>
    );
}

GaltonBoard.propTypes = {
    galtonBoard: PropTypes.shape({
        id: PropTypes.number.isRequired,
        numBolas: PropTypes.number.isRequired,
        maquina: PropTypes.shape({
            tipo: PropTypes.string.isRequired,
        }),
        distribucion: PropTypes.shape({
            datos: PropTypes.object.isRequired,
        }),
        estado: PropTypes.string.isRequired,
    }).isRequired,
};

export default GaltonBoard;




