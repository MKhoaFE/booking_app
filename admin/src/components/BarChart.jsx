import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import axios from "axios";
import { tokens } from "../theme";

const BarChart = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [barData, setBarData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Gọi API để lấy tất cả hành trình
        const response = await axios.get("http://localhost:5000/api/trainSchedule");
        const schedules = response.data.trainSchedules;

        // Nhóm dữ liệu theo trainId và tính tổng thu nhập
        const trainIncome = schedules.reduce((acc, schedule) => {
          const trainId = schedule.trainId;
          if (!acc[trainId]) {
            acc[trainId] = { regular: 0, special: 0 };
          }
          acc[trainId].regular += schedule.regularTicketBooked * schedule.regularTicketPrice || 0;
          acc[trainId].special += schedule.specialTicketBooked * schedule.specialTicketPrice || 0;
          return acc;
        }, {});

        // Chuyển đổi thành định dạng cho Bar Chart
        const data = Object.keys(trainIncome).map((trainId) => ({
          train: trainId, // Trục X: Mã tuyến tàu
          regular: trainIncome[trainId].regular, // Thu nhập từ vé regular
          special: trainIncome[trainId].special, // Thu nhập từ vé special
          regularColor: colors.blueAccent[500], // Màu cho regular
          specialColor: colors.greenAccent[500], // Màu cho special
        }));

        setBarData(data);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    };

    fetchData();
  }, []);

  if (!barData.length) {
    return <div>Đang tải dữ liệu...</div>;
  }

  return (
    <ResponsiveBar
      data={barData}
      theme={{
        axis: {
          domain: { line: { stroke: colors.grey[100] } },
          legend: { text: { fill: colors.grey[100] } },
          ticks: { line: { stroke: colors.grey[100], strokeWidth: 1 }, text: { fill: colors.grey[100] } },
        },
        legends: { text: { fill: colors.grey[100] } },
        tooltip: { container: { background: colors.blueAccent[500], fontSize: 12 }, text: { fill: colors.grey[100] } },
      }}
      keys={["regular", "special"]} // Hai cột: regular và special
      indexBy="train" // Trục X: Mã tuyến tàu (trainId)
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={({ id, data }) => (id === "regular" ? data.regularColor : data.specialColor)} // Tùy chỉnh màu
      borderColor={{ from: "color", modifiers: [["darker", "1.6"]] }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "Tuyến tàu",
        legendPosition: "middle",
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legendPosition: "top",
        legendOffset: -40,
        format: (value) => `${value.toLocaleString("vi-VN")}`, // Định dạng số VND trên trục Y
      }}

      enableLabel={true} // Hiển thị nhãn trên cột
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
      labelFormat={(value) => `${value.toLocaleString("vi-VN")} VND`} // Nhãn cột dạng VND
      legends={[
        {
          dataFrom: "keys",
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [{ on: "hover", style: { itemOpacity: 1 } }],
        },
      ]}
      tooltip={({ id, value, indexValue }) => (
        <div style={{ background: colors.blueAccent[500], padding: "5px", color: colors.grey[100] }}>
          {indexValue} - {id}: {value.toLocaleString("vi-VN")} VND
        </div>
      )}
      role="application"
      barAriaLabel={(e) => `${e.id}: ${e.formattedValue} VND in train: ${e.indexValue}`}
    />
  );
};

export default BarChart;