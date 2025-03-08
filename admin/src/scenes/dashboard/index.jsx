import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import ProgressCircle from "../../components/ProgressCircle";
import StatBox from "../../components/StatBox";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrainIcon from "@mui/icons-material/Train"; // Icon cho trains và journeys
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn"; // Icon cho income
import BarChart from "../../components/BarChart";
import { tokens } from "../../theme";
import axios from "axios";

function Dashboard() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalTrains: 0,
    totalJourneys: 0,
    totalIncome: 0,
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Gọi API để lấy dữ liệu
        const [usersRes, trainsRes, schedulesRes] = await Promise.all([
          axios.get("http://localhost:5000/api/users"), // API lấy tổng user
          axios.get("http://localhost:5000/api/trains"), // API lấy tổng train
          axios.get("http://localhost:5000/api/trainSchedule"), // API lấy tổng journey và income
        ]);

        // Tổng số user
        const totalUsers = usersRes.data.users.length;

        // Tổng số train
        const totalTrains = trainsRes.data.trains.length;

        // Tổng số journey
        const totalJourneys = schedulesRes.data.trainSchedules.length;

        // Tổng thu nhập từ tất cả hành trình
        const totalIncome = schedulesRes.data.trainSchedules.reduce(
          (acc, schedule) => {
            const regularIncome = schedule.regularTicketBooked * schedule.regularTicketPrice || 0;
            const specialIncome = schedule.specialTicketBooked * schedule.specialTicketPrice || 0;
            return acc + regularIncome + specialIncome;
          },
          0
        );

        setStats({
          totalUsers,
          totalTrains,
          totalJourneys,
          totalIncome,
        });
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu dashboard:", error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <Box margin="0.5rem 1rem">
      <Box display="block" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
      </Box>
      {/* Progress bars */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gap="1rem !important"
        gridAutoRows="minmax(100px, auto)"
        marginTop="1rem"
      >
        {/* First Row - Thống kê */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={stats.totalUsers.toLocaleString()}
            subtitle="Tổng người dùng"
            progress={stats.totalUsers / 10000} // Giả sử max là 10,000, tùy chỉnh nếu cần
            increase={`+${((stats.totalUsers / 10000) * 100).toFixed(1)}%`}
            icon={
              <PersonAddIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={stats.totalTrains.toLocaleString()}
            subtitle="Tổng tuyến tàu"
            progress={stats.totalTrains / 100} // Giả sử max là 100
            increase={`+${((stats.totalTrains / 100) * 100).toFixed(1)}%`}
            icon={
              <TrainIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={stats.totalJourneys.toLocaleString()}
            subtitle="Tổng hành trình"
            progress={stats.totalJourneys / 1000} // Giả sử max là 1,000
            increase={`+${((stats.totalJourneys / 1000) * 100).toFixed(1)}%`}
            icon={
              <TrainIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={`${stats.totalIncome.toLocaleString("vi-VN")} VND`}
            subtitle="Tổng thu nhập"
            progress={stats.totalIncome / 1000000000} // Giả sử max là 1 tỷ VND
            increase={`+${((stats.totalIncome / 1000000000) * 100).toFixed(1)}%`}
            icon={
              <MonetizationOnIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        {/* Second Row */}
        <Box
          gridColumn="span 12"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          height="50vh !important"
          fullwidth
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Thu nhập từ tuyến tàu
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                {`${stats.totalIncome.toLocaleString("vi-VN")} VND`}
              </Typography>
            </Box>
            <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box>
          </Box>
          <Box height="calc(50vh - 80px)">
            <BarChart isDashboard={true} />
          </Box>
        </Box>

        {/* Transactions */}
   

        {/* Third Row */}
        <Box
          gridColumn="span 6"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          <Typography variant="h5" fontWeight="600">
            Chiến dịch
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
            <ProgressCircle size="125" />
            <Typography
              variant="h5"
              color={colors.greenAccent[500]}
              sx={{ mt: "15px" }}
            >
              {`${stats.totalIncome.toLocaleString("vi-VN")} VND doanh thu`}
            </Typography>
            <Typography>Chi phí khác đã được tính vào</Typography>
          </Box>
        </Box>
        <Box
          gridColumn="span 6"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Số lượng vé bán
          </Typography>
          <Box height="250px" mt="-20px">
            <BarChart isDashboard={true} />
          </Box>
        </Box>

      </Box>
    </Box>
  );
}

export default Dashboard;