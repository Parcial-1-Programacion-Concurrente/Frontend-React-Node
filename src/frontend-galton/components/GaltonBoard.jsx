import React from 'react';
import PropTypes from 'prop-types';
import DistribucionTexto from './DistribucionTexto';

function GaltonBoard({ galtonBoard }) {
    if (!galtonBoard) {
        return <p style={styles.noData}>Datos no disponibles.</p>;
    }

    const tipoMaquina = galtonBoard.maquina?.tipo || 'Desconocido';
    const numBolas = galtonBoard.numBolas ?? 800;  // Valor por defecto si numBolas es null o undefined
    const distribucion = galtonBoard.distribucionActual || {};  // Valor por defecto si no hay distribucionActual

    return (
        <div style={styles.card}>
            <h2 style={styles.title}>Galton Board: </h2>
            <p style={styles.maquinaInfo}>Máquina Tipo: <span>{tipoMaquina}</span></p>
            <DistribucionTexto
                distribucion={distribucion}
                estado={galtonBoard.estado}
                id={galtonBoard.id}
                numBolas={numBolas}  // Usar el valor de numBolas con manejo de null
            />
        </div>
    );
}

const styles = {
    card: {
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '20px',
        marginBottom: '20px',
        backgroundColor: '#2c3e50',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.3s ease',
        ':hover': {
            transform: 'translateY(-5px)', // Efecto de levitación al pasar el mouse
        },
    },
    title: {
        fontSize: '24px',
        fontWeight: 'bold',
        color: 'white',
        marginBottom: '10px',
    },
    maquinaInfo: {
        fontSize: '16px',
        marginBottom: '20px',
        color: 'white',
    },
    noData: {
        fontSize: '18px',
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
};

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




