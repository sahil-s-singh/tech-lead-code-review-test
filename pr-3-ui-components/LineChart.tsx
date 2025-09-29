import React, { useEffect, useState } from 'react';

import { Line } from 'react-chartjs-2';

interface LineChartProps {
  data: Array<{x: number, y: number}>;
  title?: string;
  color?: string;
  animated?: boolean;
}

export function LineChart({ data, title, color = 'blue', animated }: LineChartProps) {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    // Process data
    const processedData = {
      datasets: [{
        label: title || 'Data',
        data: data,
        borderColor: color,
        backgroundColor: color + '20',
        tension: animated ? 0.4 : 0
      }]
    };
    
    setChartData(processedData);
  }, [data, title, color, animated]);

  if (!chartData) return <div>Loading...</div>;

  return (
    <div>
      <Line 
        data={chartData}
        options={{
          responsive: true,
          animation: {
            duration: animated ? 2000 : 0
          }
        }}
      />
    </div>
  );
}