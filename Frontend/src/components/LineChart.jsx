//Frontend\src\components\LineChart.jsx


import React from "react";
import {
  LineChart as RechartsLineChart,  // Rename the imported component
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./LineChart.css";

const CustomLineChart = ({ data }) => {  // Rename the component here
  // Ensure there's a fallback for data
  const chartData = data || [
    { period: "Week 1", ticketsReleased: 25, ticketsRetrieved: 20 },
    { period: "Week 2", ticketsReleased: 35, ticketsRetrieved: 30 },
    { period: "Week 3", ticketsReleased: 45, ticketsRetrieved: 40 },
    { period: "Week 4", ticketsReleased: 55, ticketsRetrieved: 50 },
    { period: "Week 5", ticketsReleased: 60, ticketsRetrieved: 55 },
    { period: "Week 6", ticketsReleased: 70, ticketsRetrieved: 65 },
  ];

  return (
    <div className="chart-container">
      <h3 className="chart-title">Ticket Release and Retrieval Trends</h3>
      <ResponsiveContainer width="100%" height={230}>
        <RechartsLineChart data={chartData}>  {/* Use the renamed import */}
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="period" />
          <YAxis />
          <Tooltip
            contentStyle={{ backgroundColor: "#f9f9f9" }}
            labelStyle={{ fontWeight: "bold" }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="ticketsReleased"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
            name="Tickets Released"
          />
          <Line
            type="monotone"
            dataKey="ticketsRetrieved"
            stroke="#82ca9d"
            activeDot={{ r: 8 }}
            name="Tickets Retrieved"
          />
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomLineChart;
