import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/material";
import { ResponsivePie } from "@nivo/pie";
import axios from "axios";
import { tokens } from "../theme";

function PieChart() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [pieData, setPieData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/trainSchedule");
        const schedules = response.data.trainSchedules;

        const regularIncome = schedules.reduce((total, schedule) => {
          return total + (schedule.regularTicketBooked * schedule.regularTicketPrice || 0);
        }, 0);

        const specialIncome = schedules.reduce((total, schedule) => {
          return total + (schedule.specialTicketBooked * schedule.specialTicketPrice || 0);
        }, 0);

        const data = [
          { id: "regular", label: "Vé Regular", value: regularIncome, color: colors.blueAccent[500] },
          { id: "special", label: "Vé Special", value: specialIncome, color: colors.greenAccent[500] },
        ];

        setPieData(data);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    };

    fetchData();
  }, []);

  if (!pieData.length) {
    return <div>Đang tải dữ liệu...</div>;
  }

  return (
    <ResponsivePie
      theme={{
        axis: {
          domain: { line: { stroke: colors.grey[100] } },
          legend: { text: { fill: colors.grey[100] } },
          ticks: { line: { stroke: colors.grey[100], strokeWidth: 1 }, text: { fill: colors.grey[100] } },
        },
        legends: { text: { fill: colors.grey[100] } },
        tooltip: { container: { background: colors.blueAccent[500], fontSize: 12 }, text: { fill: colors.grey[100] } },
      }}
      data={pieData}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderWidth={1}
      borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor={colors.grey[100]}
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      enableArcLabels={true}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{ from: "color", modifiers: [["darker", 2]] }}
      arcLabel={(d) => `${d.value.toLocaleString("vi-VN")} VND`} // Quy đổi sang VND
      legends={[
        {
          anchor: "bottom",
          direction: "row",
          justify: false,
          translateX: 0,
          translateY: 56,
          itemsSpacing: 0,
          itemWidth: 100,
          itemHeight: 18,
          itemTextColor: "#999",
          itemDirection: "left-to-right",
          itemOpacity: 1,
          symbolSize: 18,
          symbolShape: "circle",
          effects: [{ on: "hover", style: { itemTextColor: "#000" } }],
        },
      ]}
    />
  );
}

export default PieChart;