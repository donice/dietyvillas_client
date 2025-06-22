import { PureComponent } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Mar",
    bookings: 900,
  },
  {
    name: "Apr",
    bookings: 1300,
  },
  {
    name: "May",
    bookings: 700,
  },
  {
    name: "Jun",
    bookings: 1600,
  },
  {
    name: "Jul",
    bookings: 400,
  },
  {
    name: "Aug",
    bookings: 900,
  },
  {
    name: "Sep",
    bookings: 400,
  },
  {
    name: "Oct",
    bookings: 1200,
  },
];

export default class DasboardLineGraph extends PureComponent {
  render() {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            bottom: 5,
          }}
        >
          {" "}
          <CartesianGrid
            vertical={true}
            horizontal={false}
            strokeDasharray="3 3"
          />
          <XAxis dataKey="name" axisLine={false} tick={{ fill: 'gray', fontSize: '12px' }} />
          <YAxis axisLine={false} tick={{ fill: 'gray', fontSize: '12px' }} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="bookings"
            stroke="rgb(234 179 8)"
            strokeWidth={2.5}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    );
  }
}
