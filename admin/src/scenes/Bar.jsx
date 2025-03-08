import { Box } from "@mui/material";
import Header from "../components/Header";
import BarChart from "../components/BarChart";

const Bar = () => {
  return (
    <Box m="0.5rem 1rem">
      <Header
        title="Thu Nhập Theo Tuyến Tàu"
        subtitle="Biểu đồ cột thể hiện thu nhập từ vé Regular và Special cho từng tuyến tàu"
      />
      <Box height="75vh">
        <BarChart />
      </Box>
    </Box>
  );
};

export default Bar;