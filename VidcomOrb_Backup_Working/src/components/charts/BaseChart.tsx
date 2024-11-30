import React from 'react';
import { LineChart as RechartsLineChart, BarChart as RechartsBarChart, PieChart as RechartsPieChart,
  Line, Bar, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell } from 'recharts';

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    color?: string;
  }[];
}

interface BaseChartProps {
  type: 'line' | 'bar' | 'pie';
  data: ChartData;
  height?: number;
}

export default function BaseChart({ type, data, height = 200 }: BaseChartProps) {
  const formattedData = data.labels.map((label, index) => ({
    name: label,
    ...data.datasets.reduce((acc, dataset) => ({
      ...acc,
      [dataset.label]: dataset.data[index]
    }), {})
  }));

  const COLORS = ['#3B82F6', '#10B981', '#6366F1', '#F59E0B'];

  if (type === 'line') {
    return (
      <RechartsLineChart width={500} height={height} data={formattedData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        {data.datasets.map((dataset, index) => (
          <Line
            key={dataset.label}
            type="monotone"
            dataKey={dataset.label}
            stroke={dataset.color || COLORS[index % COLORS.length]}
          />
        ))}
      </RechartsLineChart>
    );
  }

  if (type === 'bar') {
    return (
      <RechartsBarChart width={500} height={height} data={formattedData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        {data.datasets.map((dataset, index) => (
          <Bar
            key={dataset.label}
            dataKey={dataset.label}
            fill={dataset.color || COLORS[index % COLORS.length]}
          />
        ))}
      </RechartsBarChart>
    );
  }

  if (type === 'pie') {
    const pieData = data.datasets[0].data.map((value, index) => ({
      name: data.labels[index],
      value
    }));

    return (
      <RechartsPieChart width={500} height={height}>
        <Pie
          data={pieData}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {pieData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </RechartsPieChart>
    );
  }

  return null;
}