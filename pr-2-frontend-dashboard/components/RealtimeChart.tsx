import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import React, { useEffect, useState } from 'react';

interface ChartDataPoint {
  time: string;
  value: number;
}

interface RealtimeChartProps {
  data: ChartDataPoint[];
  title: string;
  color?: string;
}

export function RealtimeChart({ data, title, color = '#8884d8' }: RealtimeChartProps) {
  const [chartData, setChartData] = useState(data);

  useEffect(() => {
    setChartData(data);
  }, [data]);

  return (
    <div>
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <LineChart width={600} height={200} data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="value" stroke={color} />
      </LineChart>
    </div>
  );
}