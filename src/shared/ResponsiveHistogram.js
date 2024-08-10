import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const ResponsiveHistogram = ({ histogramData }) => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        // Destroy previous chart instance if it exists
        if (chartInstance.current !== null) {
            chartInstance.current.destroy();
        }

        // Create new chart instance
        const labels = Object.keys(histogramData);
        const data = Object.values(histogramData);

        const backgroundColors = Object.keys(histogramData).map((key) => {
            if (key === '1') return 'rgb(255, 0, 0)';
            if (key === '2') return 'rgb(255, 0, 0, 0.5)';
            if (key === '3') return 'rgb(0, 168, 255,0.2)';
            if (key === '4') return 'rgb(60, 179, 113, 0.4)';
            if (key === '5') return 'rgb(60, 179, 113)';
            return 'rgba(255, 159, 64, 0.2)'; // Default color
        });

        const ctx = chartRef.current.getContext('2d');
        chartInstance.current = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Star Ratings',
                    data: data,
                    backgroundColor: backgroundColors,
                    borderColor: 'rgb(0, 0, 0)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
        return () => {
            if (chartInstance.current !== null) {
                chartInstance.current.destroy();
            }
        };
    }, [histogramData]);

    return <canvas ref={chartRef} />;
};
export default ResponsiveHistogram;
