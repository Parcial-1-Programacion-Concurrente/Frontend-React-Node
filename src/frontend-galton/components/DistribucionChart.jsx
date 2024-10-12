import React from 'react';
import { Bar } from 'react-chartjs-2';

function DistribucionChart({ data }) {
    const chartData = {
        labels: Object.keys(data),
        datasets: [
            {
                label: 'Cantidad de Bolas',
                data: Object.values(data),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
        ],
    };

    return (
        <div>
            <h3>Distribución de Bolas</h3>
            <Bar data={chartData} />
        </div>
    );
}

export default DistribucionChart;
