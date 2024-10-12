// src/DistribucionTexto.jsx
import React from 'react';
import PropTypes from 'prop-types';

function DistribucionTexto({ distribucion, estado, id, numBolas }) {
    if (!distribucion || Object.keys(distribucion).length === 0) {
        return <p>No hay datos de distribución disponibles para el Galton Board {id}.</p>;
    }

    // Filtrar contenedores con bolas > 0
    const distribucionFiltrada = Object.entries(distribucion)
        .filter(([contenedor, bolas]) => bolas > 0);

    if (distribucionFiltrada.length === 0) {
        return <p>No hay datos de distribución disponibles para el Galton Board {id}.</p>;
    }

    // Ordenar los contenedores basándose en el número extraído de la clave
    const getNumeroContenedor = (key) => {
        const parts = key.split('_');
        const lastPart = parts[parts.length - 1];
        const numero = parseInt(lastPart, 10);
        return isNaN(numero) ? 0 : numero;
    };

    const distribucionOrdenada = distribucionFiltrada
        .sort(([aKey], [bKey]) => getNumeroContenedor(aKey) - getNumeroContenedor(bKey));

    // Limitar la suma de las bolas a numBolas
    let suma = 0;
    const distribucionLimitada = [];

    for (let [contenedor, bolas] of distribucionOrdenada) {
        if (suma >= numBolas) {
            break;
        }
        if (suma + bolas > numBolas) {
            bolas = numBolas - suma;
        }
        distribucionLimitada.push([contenedor, bolas]);
        suma += bolas;
    }

    // Depuración: Verificar la suma de bolas
    console.log(`Distribución Limitada para GaltonBoard ID ${id}:`, distribucionLimitada);
    console.log(`Total de bolas procesadas: ${suma} / ${numBolas}`);

    // Verificar si la suma excede numBolas
    if (suma > numBolas) {
        console.error(`La suma de bolas (${suma}) excede el número total de bolas (${numBolas}) para GaltonBoard ID: ${id}`);
    }

    // Obtener el máximo de bolas para escalar las barras
    const maxBolas = Math.max(...distribucionLimitada.map(([_, bolas]) => bolas), 1);

    return (
        <div style={{ fontFamily: 'monospace', whiteSpace: 'pre' }}>
            {estado !== 'FINALIZADA' ? (
                <p>Distribución en proceso para GaltonBoard con ID: {id}</p>
            ) : (
                <p>Simulación finalizada para GaltonBoard con ID: {id}</p>
            )}
            {distribucionLimitada.map(([contenedor, bolas]) => {
                const longitudBarra = Math.round((bolas / maxBolas) * 50);
                const barra = '█'.repeat(longitudBarra);
                return (
                    <div key={contenedor}>
                        {`Contenedor ${contenedor.padEnd(25)}: ${barra.padEnd(50)} (${bolas})`}
                    </div>
                );
            })}
            {numBolas && (
                <p>Total de bolas procesadas: {suma} / {numBolas}</p>
            )}
        </div>
    );
}

DistribucionTexto.propTypes = {
    distribucion: PropTypes.object.isRequired,
    estado: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    numBolas: PropTypes.number.isRequired,
};

export default DistribucionTexto;
