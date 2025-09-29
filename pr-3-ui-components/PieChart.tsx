import { Pie } from 'react-chartjs-2';
import React from 'react';

export const PieChart = (props: any) => {
  const { data, title, showLegend = true } = props;
  
  const chartData = {
    labels: data.map(d => d.label),
    datasets: [{
      data: data.map(d => d.value),
      backgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
        '#4BC0C0',
        '#9966FF',
        '#FF9F40'
      ]
    }]
  };

  return (
    <div className="pie-chart-container">
      <h3>{title}</h3>
      <Pie 
        data={chartData} 
        options={{ 
          plugins: { 
            legend: { 
              display: showLegend 
            } 
          } 
        }} 
      />
    </div>
  );
};