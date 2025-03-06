import React, { useState } from "react";
import BookingHeader from "../../components/Booking-header/bookingHeader";
import Stepbar from "../../components/StepBar/stepbar";
import {
  Typography,
  Container,
  Box,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

function ByCounter() {
  const [selected, setSelected] = useState(null);

  const toggle = (option) => {
    setSelected(selected === option ? null : option);
  };

  return (
    <>
<BookingHeader />
      <Stepbar />
      <div className="container" style={{ marginTop: "2.5rem" }}>
        {/* Tiêu đề chính */}
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#2E7D32", fontSize: "2.5rem" }}
        >
          Thanh toán tại quầy
        </Typography>

        {/* Thông báo thành công */}
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography
            variant="h6"
            sx={{ color: "#2E7D32", fontWeight: "medium", fontSize: "2rem" }}
          >
            Đặt vé của quý khách đã thành công. Mã đơn hàng #0410932
          </Typography>
          <Typography variant="body1" sx={{ color: "#555", mt: 1, fontSize: "1.5rem" }}>
            Quý khách vui lòng thanh toán đặt chỗ trước{" "}
            <strong>08:00 giờ, ngày 06/03/2025</strong>
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Thông tin chuyến đi */}
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="h6"
            sx={{ fontWeight: "medium", color: "#2E7D32", fontSize: "2rem" }}
          >
            Chiều đi
          </Typography>
          <Typography variant="body1" sx={{ mt: 1, fontSize: "1.5rem" }}>
            <strong>Tuyến:</strong> TP. Hồ Chí Minh - Vũng Tàu
          </Typography>
          <Typography variant="body1" sx={{ fontSize: "1.5rem" }}>
            <strong>Giờ khởi hành:</strong> 09:00
          </Typography>
          <Typography variant="body1" sx={{ fontSize: "1.5rem" }}>
            <strong>Ngày đi:</strong> 06/03/2025
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Thông tin liên hệ */}
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="h6"
            sx={{ fontWeight: "medium", color: "#2E7D32", fontSize: "2rem" }}
          >
            Thông tin liên hệ
          </Typography>
          <Typography variant="body1" sx={{ mt: 1, fontSize: "1.5rem" }}>
            <strong>Họ tên:</strong> Nguyen Hoang Minh Khoa
          </Typography>
          <Typography variant="body1" sx={{ fontSize: "1.5rem" }}>
            <strong>Địa chỉ:</strong> 61 Ly Nam De, 487/47 Huynh Tan Phat, Quan 7, TPHCM
          </Typography>
          <Typography variant="body1" sx={{ fontSize: "1.5rem" }}>
            <strong>Số điện thoại:</strong> 39281018
          </Typography>
          <Typography variant="body1" sx={{ fontSize: "1.5rem" }}>
            <strong>Email:</strong> khoahocgioi9@gmail.com
          </Typography>
          <Typography variant="body1" sx={{ fontSize: "1.5rem" }}>
            <strong>Công ty:</strong> HCMUS
          </Typography>
          <Typography variant="body1" sx={{ fontSize: "1.5rem" }}>
            <strong>Mã số thuế:</strong> [Chưa cung cấp]
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Thông tin hành khách */}
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="h6"
            sx={{ fontWeight: "medium", color: "#2E7D32", fontSize: "2rem" }}
          >
            Thông tin hành khách
          </Typography>
          <TableContainer component={Paper} sx={{ mt: 2, boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#F5F5F5" }}>
                  <TableCell sx={{ fontSize: "1.5rem" }}><strong>Số ghế</strong></TableCell>
                  <TableCell sx={{ fontSize: "1.5rem" }}><strong>Họ và tên</strong></TableCell>
                  <TableCell sx={{ fontSize: "1.5rem" }}><strong>Số điện thoại</strong></TableCell>
                  <TableCell sx={{ fontSize: "1.5rem" }}><strong>Giới tính</strong></TableCell>
                  <TableCell sx={{ fontSize: "1.5rem" }}><strong>Năm sinh</strong></TableCell>
                  <TableCell sx={{ fontSize: "1.5rem" }}><strong>Đối tượng</strong></TableCell>
                  <TableCell sx={{ fontSize: "1.5rem" }}><strong>Giá vé (Đi/Về)</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell sx={{ fontSize: "1.5rem" }}>G2</TableCell>
                  <TableCell sx={{ fontSize: "1.5rem" }}>Nguyen Hoang Minh Khoa</TableCell>
                  <TableCell sx={{ fontSize: "1.5rem" }}>39281018</TableCell>
                  <TableCell sx={{ fontSize: "1.5rem" }}>Nam</TableCell>
                  <TableCell sx={{ fontSize: "1.5rem" }}>1990</TableCell>
                  <TableCell sx={{ fontSize: "1.5rem" }}>Người lớn</TableCell>
                  <TableCell sx={{ fontSize: "1.5rem" }}>320.000 VND</TableCell>
                </TableRow>
                <TableRow sx={{ backgroundColor: "#FAFAFA" }}>
                  <TableCell colSpan={6} align="right" sx={{ fontSize: "1.5rem" }}>
                    <strong>TỔNG</strong>
                  </TableCell>
                  <TableCell sx={{ fontSize: "1.5rem" }}>
                    <strong>320.000 VND</strong>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Hướng dẫn thanh toán */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="body1" sx={{ mb: 2, fontSize: "1.5rem" }}>
            Sau khi đặt vé tàu tại GreenlinesDP thành công có nghĩa là bạn đã có một vé tàu chính xác như mong muốn và thời hạn giữ vé sẽ được thông báo như trong Email. Bạn nhanh chóng chọn hình thức thanh toán để sở hữu vé tàu mong muốn.
          </Typography>
          <Typography
            variant="h6"
            sx={{ fontWeight: "medium", color: "#2E7D32", fontSize: "2rem" }}
          >
            GreenlinesDP hỗ trợ các phương thức thanh toán sau:
          </Typography>

          {/* Thanh toán tại quầy */}
          <Typography variant="subtitle1" sx={{ mt: 2, fontWeight: "medium", fontSize: "1.8rem" }}>
            1. THANH TOÁN TẠI QUẦY
          </Typography>
          <Typography variant="body2" sx={{ mt: 1, fontSize: "1.5rem" }}>
            Sau khi đặt vé thành công, Quý khách vui lòng đến các phòng vé của GreenlinesDP để thanh toán và nhận vé. Quý khách có thể thanh toán bằng tiền mặt hoặc bằng thẻ ngân hàng, hiện tại chúng tôi đã có máy cà thẻ tại phòng vé để phục vụ tốt hơn.
          </Typography>
          <Typography variant="body2" sx={{ fontStyle: "italic", color: "#777", mt: 1, fontSize: "1.5rem" }}>
            *Lưu ý: Để tránh tình trạng vé tự động hủy, xin quý khách hãy đến phòng vé trước 2 tiếng để lấy vé hoặc gọi điện giữ vé qua số <strong>098.800.9579</strong>.
          </Typography>

          {/* Thanh toán chuyển khoản */}
          <Typography variant="subtitle1" sx={{ mt: 2, fontWeight: "medium", fontSize: "1.8rem" }}>
            2. THANH TOÁN CHUYỂN KHOẢN NGÂN HÀNG
          </Typography>
          <Typography variant="body2" sx={{ mt: 1, fontSize: "1.5rem" }}>
            Quý khách có thể thanh toán bằng hình thức chuyển khoản trực tiếp qua ngân hàng Vietcombank, sau khi thanh toán thành công quý khách hãy gọi điện ngay cho chúng tôi theo số <strong>098.800.9579</strong>. Chúng tôi sẽ kiểm tra và vé điện tử sẽ được gửi đến email mà quý khách đã cung cấp.
          </Typography>
          <Typography variant="body2" sx={{ fontStyle: "italic", color: "#777", mt: 1, fontSize: "1.5rem" }}>
            *Lưu ý: Vui lòng soạn nội dung chuyển tiền theo cú pháp: "THANH TOÁN VÉ TÀU <u style={{color:"red"}}>Mã đặt vé</u>, <u style={{color:"red"}}>Tên người đặt vé</u>"
          </Typography>
          <Typography variant="body2" sx={{ mt: 2, fontSize: "1.5rem" }}>
            <strong>Danh sách các tài khoản Ngân Hàng của GreenlinesDP:</strong>
            <br />
            [Thông tin tài khoản ngân hàng sẽ được cập nhật sau]
          </Typography>
        </Box>
      </div>
    </>
  );
}

export default ByCounter;