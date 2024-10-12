import React from 'react';
import { Bar } from 'react-chartjs-2';

function DistribucionChart({ distribucion }) {
    const contenedores = Object.keys(distribucion);
    const valores = Object.values(distribucion);

    const data = {
        labels: contenedores,
        datasets: [
            {
                label: 'Número de Bolas',
                data: valores,
                backgroundColor: 'rgba(75,192,192,0.6)',
            },
        ],
    };

    const options = {
        plugins: {
            title: {
                display: true,
                text: 'Distribución de Bolas en los Contenedores',
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Contenedores',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Número de Bolas',
                },
                beginAtZero: true,
            },
        },
    };

    return <Bar data={data} options={options} />;
}

export default DistribucionChart;
