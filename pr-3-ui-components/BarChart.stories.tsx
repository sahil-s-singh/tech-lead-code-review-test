import type { Meta, StoryObj } from '@storybook/react';

import BarChart from './BarChart';

const meta: Meta<typeof BarChart> = {
  title: 'DataVisualization/BarChart',
  component: BarChart,
};

export default meta;
type Story = StoryObj<typeof BarChart>;

export const Default: Story = {
  args: {
    data: [
      { label: 'January', value: 65 },
      { label: 'February', value: 59 },
      { label: 'March', value: 80 },
    ],
    title: 'Monthly Sales'
  },
};