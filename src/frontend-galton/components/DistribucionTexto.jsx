import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function DistribucionTexto({ distribucion, estado, id, numBolas }) {
    const [bolasMostradas, setBolasMostradas] = useState(0);
    const [distribucionActualizada, setDistribucionActualizada] = useState([]);

    useEffect(() => {
        if (!distribucion || Object.keys(distribucion).length === 0) return;

        setBolasMostradas(0);
        setDistribucionActualizada([]);

        // Iniciar intervalo para la caída de bolas en bloques de 50
        const interval = setInterval(() => {
            setBolasMostradas((prevBolasMostradas) => {
                const nuevasBolasMostradas = prevBolasMostradas + 50;
                if (nuevasBolasMostradas >= numBolas || nuevasBolasMostradas >= 500) {
                    clearInterval(interval);
                    return Math.min(numBolas, 500);
                }
                return nuevasBolasMostradas;
            });
        }, 1000); // Actualizar cada 1 segundo

        return () => clearInterval(interval);
    }, [distribucion, numBolas, id]);

    useEffect(() => {
        const distribucionFiltrada = distribucion ? Object.entries(distribucion).filter(([contenedor, bolas]) => bolas > 0) : [];

        if (bolasMostradas > 0 && distribucionFiltrada.length > 0) {
            const totalBolas = distribucionFiltrada.reduce((sum, [_, bolas]) => sum + bolas, 0);
            const maxBolas = Math.min(totalBolas, 500);

            const nuevaDistribucion = distribucionFiltrada.map(([contenedor, bolas]) => {
                const proporcion = bolas / totalBolas;
                const bolasDistribuidas = Math.round(proporcion * bolasMostradas);
                return [contenedor, bolasDistribuidas];
            });

            setDistribucionActualizada(nuevaDistribucion);
        }
    }, [bolasMostradas, distribucion]);

    if (!numBolas) {
        return <p style={styles.text}>Número de bolas no especificado para el Galton Board {id}.</p>;
    }

    if (!distribucion || Object.keys(distribucion).length === 0) {
        return <p style={styles.text}>No hay datos de distribución disponibles para el Galton Board {id}.</p>;
    }

    // Filtrar contenedores con bolas > 0
    const distribucionFiltrada = distribucionActualizada.filter(([_, bolas]) => bolas > 0);

    return (
        <div style={styles.container}>
            {estado !== 'FINALIZADA' ? (
                <p style={styles.inProgress}>Distribución en proceso para el Galton Board con ID: {id}</p>
            ) : (
                <p style={styles.completed}>Representación de la Campana de Gauss</p>
            )}
            {distribucionFiltrada.map(([contenedor, bolas]) => {
                const longitudBarra = Math.round((bolas / Math.min(numBolas, 500)) * 100); // Escalar la barra al 100%
                return (
                    <div key={contenedor} style={styles.barContainer}>
                        <span style={styles.label}>{contenedor}</span>
                        <div style={styles.barBackground}>
                            <div style={{ ...styles.barFill, width: `${longitudBarra}%` }}></div>
                        </div>
                        <span style={styles.bolas}>{bolas}</span>
                    </div>
                );
            })}
            <p style={styles.totalBolas}>Total de bolas procesadas: {bolasMostradas} / {Math.min(numBolas, 500)}</p>
        </div>
    );
}

const styles = {
    container: {
        backgroundColor: '#f9f9f9',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        marginBottom: '20px',
        fontFamily: 'Arial, sans-serif',
    },
    text: {
        color: '#333',
        fontSize: '16px',
    },
    inProgress: {
        color: '#f39c12',
        fontSize: '18px',
        fontWeight: 'bold',
    },
    completed: {
        color: '#27ae60',
        fontSize: '18px',
        fontWeight: 'bold',
    },
    barContainer: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '10px',
    },
    label: {
        width: '150px',
        textAlign: 'right',
        paddingRight: '10px',
        color: '#34495e',
        fontSize: '14px',
    },
    barBackground: {
        width: '100%',
        height: '20px',
        backgroundColor: '#ecf0f1',
        borderRadius: '10px',
        overflow: 'hidden',
        marginRight: '10px',
    },
    barFill: {
        height: '100%',
        backgroundColor: '#3498db',
        borderRadius: '10px',
        transition: 'width 0.5s ease-in-out',
    },
    bolas: {
        color: '#34495e',
        fontSize: '14px',
        fontWeight: 'bold',
    },
    totalBolas: {
        marginTop: '20px',
        fontSize: '16px',
        fontWeight: 'bold',
        color: '#7f8c8d',
    },
};

DistribucionTexto.propTypes = {
    distribucion: PropTypes.object.isRequired,
    estado: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    numBolas: PropTypes.number,
};

export default DistribucionTexto;

