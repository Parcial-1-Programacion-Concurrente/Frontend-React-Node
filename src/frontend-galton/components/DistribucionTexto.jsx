import React from 'react';
import PropTypes from 'prop-types';

function DistribucionTexto({ distribucion, estado, id, numBolas }) {
    // Si no hay numBolas, manejamos un valor por defecto
    if (!numBolas) {
        return <p>Número de bolas no especificado para el Galton Board {id}.</p>;
    }

    // Si la distribución está vacía, mostramos un mensaje
    if (!distribucion || Object.keys(distribucion).length === 0) {
        return <p>No hay datos de distribución disponibles para el Galton Board {id}.</p>;
    }

    // Filtrar contenedores con bolas > 0
    const distribucionFiltrada = Object.entries(distribucion)
        .filter(([contenedor, bolas]) => bolas >= 0);

    if (distribucionFiltrada.length === 0) {
        return <p>No hay datos de distribución disponibles para el Galton Board {id}.</p>;
    }

    // Obtener el máximo de bolas para escalar las barras
    const maxBolas = Math.max(...distribucionFiltrada.map(([_, bolas]) => bolas), 1);

    return (
        <div style={{ fontFamily: 'monospace', whiteSpace: 'pre' }}>
            {estado !== 'FINALIZADA' ? (
                <p>Distribución en proceso para el Galton Board con ID: {id}</p>
            ) : (
                <p>Simulación finalizada para el Galton Board con ID: {id}</p>
            )}
            {/* Mostrar cada contenedor con su barra de distribución */}
            {distribucionFiltrada.map(([contenedor, bolas]) => {
                const longitudBarra = Math.round((bolas / maxBolas) * 50); // Escalar la barra a 50 caracteres
                const barra = '█'.repeat(longitudBarra);
                return (
                    <div key={contenedor}>
                        {`Contenedor ${contenedor.padEnd(15)}: ${barra.padEnd(50)} (${bolas})`}
                    </div>
                );
            })}
            {/* Mostrar el total de bolas procesadas */}
            <p>Total de bolas procesadas: {distribucionFiltrada.reduce((sum, [_, bolas]) => sum + bolas, 0)} / {numBolas}</p>
        </div>
    );
}

DistribucionTexto.propTypes = {
    distribucion: PropTypes.object.isRequired,
    estado: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    numBolas: PropTypes.number,  // numBolas ya no es requerido para evitar errores
};

export default DistribucionTexto;
