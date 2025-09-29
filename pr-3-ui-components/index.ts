export { default as BarChart } from './BarChart';
export { PieChart } from './PieChart';
export { LineChart } from './LineChart';

// Helper function
export const formatChartData = (data) => {
  return data.map(item => ({
    label: item.name || item.label,
    value: Number(item.value) || 0
  }));
};