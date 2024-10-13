import React from 'react';
import PropTypes from 'prop-types';
import DistribucionTexto from './DistribucionTexto';

function GaltonBoard({ galtonBoard }) {
    if (!galtonBoard) {
        return <p>Datos no disponibles.</p>;
    }

    const tipoMaquina = galtonBoard.maquina?.tipo || 'Desconocido';
    const numBolas = galtonBoard.numBolas ?? 100;  // Valor por defecto si numBolas es null o undefined
    const distribucion = galtonBoard.distribucionActual || {};  // Valor por defecto si no hay distribucionActual

    return (
        <div style={{ border: '1px solid #ccc', padding: '20px', marginBottom: '20px' }}>
            <h2>Galton Board ID: {galtonBoard.id} - Máquina Tipo: {tipoMaquina}</h2>
            <DistribucionTexto
                distribucion={distribucion}
                estado={galtonBoard.estado}
                id={galtonBoard.id}
                numBolas={numBolas}  // Usar el valor de numBolas con manejo de null
            />
        </div>
    );
}

GaltonBoard.propTypes = {
    galtonBoard: PropTypes.shape({
        id: PropTypes.number.isRequired,
        numBolas: PropTypes.number,  // numBolas no es requerido
        maquina: PropTypes.shape({
            tipo: PropTypes.string,
        }),
        distribucionActual: PropTypes.object,  // distribucionActual
        estado: PropTypes.string.isRequired,
    }).isRequired,
};

export default GaltonBoard;


