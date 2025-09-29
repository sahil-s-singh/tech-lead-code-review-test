import { Bar } from 'react-chartjs-2';
import React from 'react';

const BarChart = ({ data, title, height = 300 }) => {
  const chartData = {
    labels: data.map(item => item.label),
    datasets: [{
      label: title,
      data: data.map(item => item.value),
      backgroundColor: '#3B82F6',
      borderColor: '#2563EB',
      borderWidth: 1
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: title
      }
    }
  };

  return (
    <div style={{ height: height }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default BarChart;