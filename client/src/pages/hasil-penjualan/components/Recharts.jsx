// import React from "react";
// import {
//   BarChart,
//   Bar,
//   Cell,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";

// const data = [
//   {
//     name: "Minggu 1",
//     harga: 4000,
//   },
//   {
//     name: "Minggu 2",
//     harga: 3000,
//   },
//   {
//     name: "Minggu 3",
//     harga: 2000,
//   },
//   {
//     name: "Minggu 4",
//     harga: 2780,
//   },
//   {
//     name: "Minggu 5",
//     harga: 1890,
//   },
//   {
//     name: "Minggu 6",
//     harga: 2390,
//   },
//   {
//     name: "Minggu 7",
//     harga: 3490,
//   },
// ];

// const Recharts = () => {
//   return (
//     <ResponsiveContainer aspect={2.5}>
//       <BarChart width={20} height={40} data={data}>
//         <XAxis dataKey="name" />
//         <YAxis />
//         <CartesianGrid strokeDasharray="3 3" />
//         <Tooltip />
//         <Bar dataKey="harga" fill="#8884d8" />
//       </BarChart>
//     </ResponsiveContainer>
//   );
// };

// export default Recharts;

import React, { useCallback, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { toRupiah } from "../../../utils/helper";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(1)}%`}
    </text>
  );
};
export default function Recharts({ data, colors }) {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className={`custom-tooltip border bg-white rounded-lg p-4`}>
          <p
            className={`label font-bold `}
          >{`Tanggal: ${payload[0]?.payload?.payload?.tanggal}`}</p>
          <p className={`label font-bold `}>{`Total Harga:  ${toRupiah(
            payload[0]?.payload?.payload?.total_harga
          )}`}</p>
        </div>
      );
    }
    return null;
  };
  return (
    <div className="w-full flex flex-col lg:flex-row gap-2">
      <div className="hidden lg:flex">
        <ResponsiveContainer width={600} height={600}>
          <PieChart width={600} height={600}>
            <Tooltip content={<CustomTooltip />} />
            <Pie
              data={data}
              cx={"50%"}
              cy={"50%"}
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={300}
              fill="#8884d8"
              dataKey="total_harga"
            >
              {data?.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="overflow-x-auto flex-1 h-[600px]">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Tanggal</th>
              <th>Hasil Penjualan</th>
              <th className="hidden lg:flex">Warna</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {data?.map((item, index) => {
              return (
                <tr id={index}>
                  <th>{index + 1}</th>
                  <td>{item.tanggal}</td>
                  <td>{toRupiah(item.total_harga)}</td>
                  <td className="hidden lg:flex">
                    <input
                      type="color"
                      defaultValue={colors[index % colors.length]}
                      value={colors[index % colors.length]}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
