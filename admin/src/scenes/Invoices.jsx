import React, { useState, useEffect } from "react";
import { Box, useTheme, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../theme";
import Header from "../components/Header";
import axios from "axios";

function Invoices() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        // Gọi API để lấy tất cả user và bookings của họ
        const response = await axios.get("http://localhost:5000/api/users");
        const users = response.data.users;

        // Biến đổi dữ liệu bookings thành danh sách giao dịch
        const transactionList = users.flatMap((user) =>
          user.bookings.map((booking, index) => ({
            id: `${user._id}-${index}`, // Tạo ID duy nhất cho mỗi giao dịch
            userId: user.userId,
            name: booking.contactData.name,
            email: booking.contactData.email,
            cost: booking.passengerData.reduce((total, passenger) => total + passenger.price, 0), // Tổng tiền vé
            phone: booking.contactData.phone,
            date: new Date(booking.bookingDate).toLocaleDateString("vi-VN"), // Định dạng ngày
            journeyId: booking.journeyId, // Thêm thông tin hành trình nếu cần
          }))
        );

        setTransactions(transactionList);
      } catch (error) {
        console.error("Lỗi khi lấy lịch sử giao dịch:", error);
      }
    };

    fetchTransactions();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    {
      field: "userId",
      headerName: "User ID",
      flex: 1,
    },
    {
      field: "name",
      headerName: "Tên khách hàng",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "cost",
      headerName: "Tổng tiền (VND)",
      flex: 1,
      renderCell: (params) => (
        <Typography color={colors.greenAccent[500]}>
          {params.row.cost.toLocaleString("vi-VN")} VND
        </Typography>
      ),
    },
    {
      field: "phone",
      headerName: "Số điện thoại",
      flex: 1,
    },
    {
      field: "date",
      headerName: "Ngày đặt",
      flex: 1,
    },
    {
      field: "journeyId",
      headerName: "Mã hành trình",
      flex: 1,
    },
  ];

  return (
    <Box m="0.5rem 1rem">
      <Header title="LỊCH SỬ GIAO DỊCH" subtitle="Danh sách giao dịch của người dùng" />
      <Box
        m="2rem 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": { border: "none" },
          "& .MuiDataGrid-cell": { borderBottom: "none" },
          "& .name-column--cell": { color: colors.greenAccent[300] },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": { backgroundColor: colors.primary[400] },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": { color: `${colors.greenAccent[200]} !important` },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={transactions}
          checkboxSelection
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          loading={!transactions.length} // Hiển thị loading nếu chưa có dữ liệu
        />
      </Box>
    </Box>
  );
}

export default Invoices;