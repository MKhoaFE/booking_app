import React, { useEffect, useState } from "react";
import { Box, Button, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../theme";
import Header from "../components/Header";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import showToast from "./dashboard/gloabal/Toastify";

function User() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users");
        setData(response.data.users);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (userId) => {
    console.log(data);
    toast.warn(
      <div>
        <p>
          Are you sure you want to delete this user <b>{userId}</b>?
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "10px",
          }}
        >
          <button
            style={{
              padding: "5px 10px",
              border: "none",
              background: "#d9534f",
              color: "white",
              cursor: "pointer",
              borderRadius: "5px",
            }}
            onClick={async () => {
              try {
                await axios.delete(
                  `http://localhost:5000/api/users/deleteUser/${userId}`
                );
                showToast("User deleted successfully!", "success");
                setData((prevUsers) => {
                  const updatedUsers = prevUsers.filter(
                    (user) => user.userId !== userId
                  );
                  console.log("Sau khi xóa: ", updatedUsers);
                  return updatedUsers;
                });
              } catch (error) {
                showToast("Failed to delete user!", "error");
              }
              toast.dismiss(); // Đóng popup sau khi xác nhận
            }}
          >
            Yes, Delete
          </button>
          <button
            style={{
              padding: "5px 10px",
              border: "none",
              background: "#5bc0de",
              color: "white",
              cursor: "pointer",
              borderRadius: "5px",
            }}
            onClick={() => toast.dismiss()}
          >
            No
          </button>
        </div>
      </div>,
      {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        closeButton: false,
        hideProgressBar: true,
      }
    );
  };

  const columns = [
    { field: "_id", headerName: "ID", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "phone", headerName: "Phone", flex: 1 },
    { field: "registeredAt", headerName: "Register from", flex: 1 },
    {
      field: "Action",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => (
        <Box display="flex" gap={1}>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={() => handleDelete(params.row.userId)}
          >
            Delete
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <Box m="0.5rem 1rem">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        p={2}
        border="1px solid #ccc"
        borderRadius={2}
        boxShadow={2}
        sx={{
          flexDirection: { xs: "column", sm: "row" },
          textAlign: { xs: "center", sm: "left" },
          gap: { xs: 2, sm: 0 },
        }}
      >
        <h1 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>
          User list
        </h1>
        <Link to="/user-list/addUsers">
          <Button
            variant="contained"
            sx={{
              width: { xs: "100%", sm: "auto" },
              fontSize: { xs: "0.875rem", sm: "1rem" },
            }}
          >
            + Add user
          </Button>
        </Link>
      </Box>
      <Box
        margin="0.5rem 1rem"
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
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={data}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          loading={loading}
          getRowId={(row) => row._id}
        />
      </Box>
    </Box>
  );
}

export default User;
