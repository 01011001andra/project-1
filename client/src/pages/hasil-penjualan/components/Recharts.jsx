import React from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Minggu 1",
    harga: 4000,
  },
  {
    name: "Minggu 2",
    harga: 3000,
  },
  {
    name: "Minggu 3",
    harga: 2000,
  },
  {
    name: "Minggu 4",
    harga: 2780,
  },
  {
    name: "Minggu 5",
    harga: 1890,
  },
  {
    name: "Minggu 6",
    harga: 2390,
  },
  {
    name: "Minggu 7",
    harga: 3490,
  },
];

const Recharts = () => {
  return (
    <ResponsiveContainer aspect={2.5}>
      <BarChart width={20} height={40} data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Bar dataKey="harga" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Recharts;
