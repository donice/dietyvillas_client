"use client";
import React from 'react';
import { PureComponent } from 'react';
import { PieChart, Pie, ResponsiveContainer, Cell, Label, Legend } from 'recharts';

const data = [
  { name: 'Current Earnings', value: 400 },
  { name: 'Possible Earning', value: 300 },
];

const COLORS = ['rgb(234 179 8)', 'oklch(0.87 0 0)'];

export default class Example extends PureComponent {
  render() {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={400} height={400}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={65}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`${entry} cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
            <Label
              content={({ viewBox }: any) => {
                const { cx, cy } = viewBox;
                return (
                  <>
                    <text x={cx} y={cy - 10} textAnchor="middle" className='text-sm text-gray-400'>
                      February
                    </text>
                    <text x={cx} y={cy + 10} textAnchor="middle" className='text-sm text-gray-400'>
                      2025
                    </text>
                  </>
                );
              }}
              position="center"
            />
          </Pie>
          <Legend
            wrapperStyle={{ fontSize: '12px' }}
            iconSize={10}
            layout="vertical"
            margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
            iconType="circle"
          />
        </PieChart>
      </ResponsiveContainer>
    );
  }
}
