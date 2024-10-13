import React from 'react';
import PropTypes from 'prop-types';

function DistribucionTexto({ distribucion, estado, id, numBolas }) {
    // Si numBolas es null o no está definido, lo manejamos con un valor por defecto
    if (!numBolas) {
        return <p>Número de bolas no especificado para el Galton Board {id}.</p>;
    }

    if (!distribucion || Object.keys(distribucion).length === 0) {
        return <p>No hay datos de distribución disponibles para el Galton Board {id}.</p>;
    }

    // Filtrar contenedores con bolas > 0
    const distribucionFiltrada = Object.entries(distribucion)
        .filter(([contenedor, bolas]) => bolas > 0);

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

            {distribucionFiltrada.map(([contenedor, bolas]) => {
                const longitudBarra = Math.round((bolas / maxBolas) * 50); // Escalar barras
                const barra = '█'.repeat(longitudBarra); // Crear barra con caracteres
                return (
                    <div key={contenedor}>
                        {`Contenedor ${contenedor.padEnd(15)}: ${barra.padEnd(50)} (${bolas})`}
                    </div>
                );
            })}

            <p>Total de bolas procesadas: {distribucionFiltrada.reduce((sum, [_, bolas]) => sum + bolas, 0)} / {numBolas}</p>
        </div>
    );
}

DistribucionTexto.propTypes = {
    distribucion: PropTypes.object.isRequired,
    estado: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    numBolas: PropTypes.number,
};

export default DistribucionTexto;
