import { Box } from "@mui/material";
import Header from "../components/Header";
import PieChart from "../components/PieChart";

const Pie = () => {
  return (
    <Box m="0.5rem 1rem">
      <Header
        title="Thu Nhập Từ Vé"
        subtitle="Biểu đồ thể hiện thu nhập từ vé Regular và Special"
      />
      <Box height="75vh">
        <PieChart />
      </Box>
    </Box>
  );
};

export default Pie;