import React, { useEffect, useState } from "react";
import home_image from "../../assets/home_image.png";
import "../home/home.css";
import { Box, FormControl, InputLabel } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import SlideComponent from "../../components/Slide/SlideComponent.jsx";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import { Link } from "react-router-dom";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);
  const [slideRightIndex, setRightSlideIndex] = useState(0);

  const times = ["9:00", "12:00", "18:00"];
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const threshold = 100;

      if (scrollTop > threshold) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const nextLeftSlide = () => {
    setSlideIndex((prevIndex) => (prevIndex + 1) % slides_1.length);
  };

  const prevLeftSlide = () => {
    setSlideIndex(
      (prevIndex) => (prevIndex - 1 + slides_1.length) % slides_1.length
    );
  };
  const nextRightSlide = () => {
    setRightSlideIndex((prevIndex) => (prevIndex + 1) % slides_2.length);
  };

  const prevRightSlide = () => {
    setRightSlideIndex(
      (prevIndex) => (prevIndex - 1 + slides_1.length) % slides_2.length
    );
  };

  const slides_1 = [
    {
      title: "VUNG TAU: HO MAY TOURISM AREA PIER",
      address: "01A Tran Phu St., Ward 1, Vung Tau City",
      schedule: "Vung Tau - Ho Chi Minh City / Vung Tau - Ben Tre",
      weekdays: "10:00 12:00 14:00 16:00",
      weekends: "10:00 12:00 13:00 14:00 15:00 16:00",
      duration: "THỜI GIAN HÀNH TRÌNH DỰ KIẾN 120 PHÚT.",
    },
    {
      title: "CAN GIO: BẾN TẮC SUẤT",
      address: "Đường Tắc Xuất, KP. Giồng Ao,TT. Cần Thạnh, H. Cần Giờ",
      schedule: "Ho Chi Minh City - Can Gio - Vung Tau",
      weekdays: "10:00 12:00 14:00 16:00",
      weekends: "08:30 09:30 13:30 14:30",
      duration: "THỜI GIAN HÀNH TRÌNH DỰ KIẾN 90 PHÚT.",
    },
    {
      title: "HCMC: BACH DANG SPEED FERRY TERMINAL",
      address:
        "10B Ton Duc Thang St., Ben Nghe Ward, District 1, Ho Chi Minh City",
      schedule: "Ho Chi Minh City - Vung Tau",
      weekdays: "10:00 12:00 14:00 16:00",
      weekends: "08:00 09:00 10:00 12:00 14:00 16:00",
      duration: "THỜI GIAN HÀNH TRÌNH DỰ KIẾN 120 PHÚT.",
    },
  ];
  const slides_2 = [
    {
      title: "DIA DAO CU CHI:DIA DAO CU CHI - BEN DINH",
      address: "BEN DINH, NHUAN DUC, CU CHI, HO CHI MINH CITY",
      schedule: "DIA DAO CU CHI - BACH DANG",
      weekdays: "14:00 15:00",
      weekends: "14:00 15:00",
      duration: "THỜI GIAN HÀNH TRÌNH DỰ KIẾN 180 PHÚT.",
    },
    {
      title: "BINH DUONG:BEN DU THUYEN TIAMO - GREENLINESDP",
      address: "Bến du thuyền TIAMO Phú Thịnh, Bình Dương",
      schedule: "BACH DANG - DIA DAO CU CHI",
      weekdays: "07:30 08:30",
      weekends: "07:30 08:30",
      duration: "THỜI GIAN HÀNH TRÌNH DỰ KIẾN 90 PHÚT.",
    },
    {
      title: "BACH DANG:BACH DANG SPEED FERRY TERMINAL",
      address:
        "10B Ton Duc Thang St., Ben Nghe Ward, District 1, Ho Chi Minh City",
      schedule: "BACH DANG - DIA DAO CU CHI",
      weekdays: "10:00 12:00 14:00 16:00",
      weekends: "08:00 09:00 10:00 12:00 14:00 16:00",
      duration: "THỜI GIAN HÀNH TRÌNH DỰ KIẾN 180 PHÚT.",
    },
  ];

  return (
    <>
      <div className="main">
        <img src={home_image} alt=""></img>
        <div
          className={`booking-wrap roboto-regular ${
            isScrolled ? "content-fixed roboto-regular" : ""
          }`}
        >
          <div className="booking-wrap-form">
            <Box>
              <FormControl
                sx={{
                  // m: 1,
                  minWidth: "100%",
                  backgroundColor: "#D7D7D7",
                  border: "none",
                }}
              >
                <select
                  className="roboto-medium"
                  id="cars"
                  style={{
                    fontSize: "14px",
                    border: "none",
                    backgroundColor: "#D7D7D7",
                    padding: "1rem",
                  }}
                >
                  <option style={{ backgroundColor: "white" }} value="1">
                    CẦN GIỜ - TP.HỒ CHÍ MINH
                  </option>
                  <option style={{ backgroundColor: "white" }} value="2">
                    CẦN GIỜ - VŨNG TÀU
                  </option>
                  <option style={{ backgroundColor: "white" }} value="3">
                    VŨNG TÀU - CẦN GIỜ
                  </option>
                  <option style={{ backgroundColor: "white" }} value="4">
                    VŨNG TÀU - TP.HỒ CHÍ MINH
                  </option>
                  <option style={{ backgroundColor: "white" }} value="5">
                    TP.HỒ CHÍ MINH - VŨNG TÀU
                  </option>
                  <option style={{ backgroundColor: "white" }} value="6">
                    TP.HỒ CHÍ MINH - CẦN GIỜ
                  </option>
                  <option style={{ backgroundColor: "white" }} value="7">
                    BẠCH ĐẰNG - CỦ CHI
                  </option>
                  <option style={{ backgroundColor: "white" }} value="8">
                    CỦ CHI - BẠCH ĐẰNG
                  </option>
                </select>
              </FormControl>
            </Box>
            <Box
              component="form"
              sx={{
                "& > :not(style)": { minWidth: "100px" },
              }}
              noValidate
              autoComplete="off"
              fontSize="15px"
              padding="1.5rem"
            >
              <FormControl variant="standard">
                <InputLabel
                  className="roboto-medium"
                  style={{ fontSize: "20px", fontWeight: "500" }}
                >
                  NGÀY ĐI
                </InputLabel>
                <Input
                  id="input-with-icon-adornment"
                  type="date"
                  format="YYYY/MM/DD"
                  style={{ fontSize: "15px", fontWeight: 300 }}
                  startAdornment={
                    <InputAdornment position="start"></InputAdornment>
                  }
                />
              </FormControl>
            </Box>
            <Box
              component="form"
              sx={{
                "& > :not(style)": { minWidth: "50px" },
              }}
              noValidate
              autoComplete="off"
              fontSize="15px"
              padding="1.5rem"
            >
              <FormControl variant="standard ">
                <InputLabel style={{ fontSize: "20px", fontWeight: "600" }}>
                  GIỜ
                </InputLabel>
                <Input
                  id="input-with-icon-adornment"
                  type="time"
                  defaultValue="12:00"
                  style={{ fontSize: "15px" }}
                  startAdornment={
                    <InputAdornment position="start"></InputAdornment>
                  }
                />
              </FormControl>
            </Box>

            <div className="divider-header">
              <div className="line"></div>
            </div>
            <Box
              component="form"
              sx={{
                "& > :not(style)": { minWidth: "100px" },
              }}
              noValidate
              autoComplete="off"
              fontSize="15px"
              padding="1.5rem"
            >
              <FormControl variant="standard">
                <InputLabel style={{ fontSize: "20px", fontWeight: "600" }}>
                  NGÀY VỀ
                </InputLabel>
                <Input
                  id="input-with-icon-adornment"
                  type="date"
                  style={{ fontSize: "15px", fontWeight: 300 }}
                  startAdornment={
                    <InputAdornment position="start"></InputAdornment>
                  }
                />
              </FormControl>
            </Box>
            <Box
              component="form"
              sx={{
                "& > :not(style)": { minWidth: "50px" },
              }}
              noValidate
              autoComplete="off"
              fontSize="15px"
              padding="1.5rem"
            >
              <FormControl variant="standard ">
                <InputLabel style={{ fontSize: "20px", fontWeight: "600" }}>
                  GIỜ
                </InputLabel>
                <Input
                  id="input-with-icon-adornment"
                  type="time"
                  defaultValue="12:00"
                  style={{ fontSize: "15px" }}
                  startAdornment={
                    <InputAdornment position="start"></InputAdornment>
                  }
                />
              </FormControl>
            </Box>
            <Link to="/booking">
              <button>ĐẶT VÉ</button>
            </Link>
          </div>
        </div>
      </div>

      <div className="policy">
        <div className="container">
          <div className="welcome-graph">
            <div className="welcome-text">Chào mừng đến với GreenlinesDP</div>
            <div className="safe-time-text">
              Chúng tôi đã thực hiện hơn 9251 giờ an toàn
            </div>
            <div className="welcome-wrap">
              Vào ngày 30/04/2016, Công ty TNHH Công Nghệ Xanh DP đã chính thức
              khai trương chuyến vận tải hành khách đường thủy bằng tàu cao tốc
              hai thân, Tuyến TP. HCM - Vũng Tàu, Vũng Tàu - TP. HCM Ngày
              10/07/2020, GreenlinesDP đã chính thức đưa vào khai thác tuyến tàu
              cao tốc Bạch Đằng (Q1) - Bình Dương - Củ Chi
            </div>
          </div>
          <div className="schedule-slider">
            <div className="slideshow-left roboto-medium">
              <div
                className="wrapper-slide"
                style={{
                  transform: `translateX(-${slideIndex * 100}%)`,
                }}
              >
                {slides_1.map((slide, index) => (
                  <SlideComponent
                    key={index}
                    title={slide.title}
                    address={slide.address}
                    schedule={slide.schedule}
                    weekdays={slide.weekdays}
                    weekends={slide.weekends}
                    duration={slide.duration}
                  />
                ))}
              </div>
              <div className="action-slide">
                <button className="left" onClick={prevLeftSlide}>
                  <ArrowBackIosIcon
                    style={{ fontSize: "40px", color: "white" }}
                  />
                </button>
                <button className="right" onClick={nextLeftSlide}>
                  <ArrowForwardIosIcon
                    style={{ fontSize: "40px", color: "white" }}
                  />
                </button>
              </div>
            </div>
            <div className="slideshow-right roboto-medium">
              <div
                className="wrapper-slide"
                style={{
                  transform: `translateX(-${slideRightIndex * 100}%)`,
                }}
              >
                {slides_2.map((slide, index) => (
                  <SlideComponent
                    key={index}
                    title={slide.title}
                    address={slide.address}
                    schedule={slide.schedule}
                    weekdays={slide.weekdays}
                    weekends={slide.weekends}
                    duration={slide.duration}
                  />
                ))}
              </div>
              <div className="action-slide">
                <button className="left" onClick={prevRightSlide}>
                  <ArrowBackIosIcon
                    style={{ fontSize: "40px", color: "white" }}
                  />
                </button>
                <button className="right" onClick={nextRightSlide}>
                  <ArrowForwardIosIcon
                    style={{ fontSize: "40px", color: "white" }}
                  />
                </button>
              </div>
            </div>
          </div>
          <div className="divider"></div>
          <div className="my-policy">
            <h2>Chính sách giá vé của chúng tôi</h2>
          </div>
          <div className="tabs roboto-regular">
            <button className="button active">Vũng Tàu - TP.Hồ Chí Minh</button>
            <button className="button">TP.Hồ Chí Minh - Vũng Tàu</button>
          </div>
          <div className="tab-content roboto-regular">
            <div className="row">
              <div className="col-md-4 col-xs-12">
                <div className="title">TRẺ EM</div>
                <p>Áp dụng cho Hành khách từ 6 - 11 tuổi</p>
                <p>(Có người lớn đi kèm )</p>
                <div className="price">270,000 VND</div>
              </div>
              <div className="col-md-4 col-xs-12">
                <div className="title">NGƯỜI LỚN</div>
                <p>Áp dụng cho Hành khách từ 12 tuổi trở lên</p>
                <br />
                <div className="price">320,000 VND</div>
              </div>
            </div>
          </div>
          <div className="free-discount roboto-regular">
            <div className="title">
              <img
                src="https://greenlines-dp.com/images/icons/free.png"
                alt=""
              />
              <span>Miễn phí giá vé:</span>
            </div>
            <div className="addition-info roboto-regular">
              <span>- Hành khách là Mẹ Việt Nam Anh Hùng</span>
              <p>
                - Hành khách dưới 6 tuổi được miễn phí vé{" "}
                <i>(đi kèm với người lớn và ngồi cùng ghế với người lớn)</i>
              </p>
              <span>- Hành khách là Thương binh hạng nặng</span>
              <br />
              <span>- Hành khách là Người khuyết tật hạng nặng</span>
              <br />
            </div>
          </div>
          <div className="discount roboto-regular">
            <div className="title">Giảm giá vé</div>
            <span>- Thương binh hạng nhẹ</span>
            <br />
            <span>- Người khuyết tật hạng nhẹ</span>
          </div>
          <div className="price-policy">
            <div className="divider"></div>
            <div className="title">
              <h1>NỘI QUY ĐI TÀU</h1>
            </div>
            <div className="content" style={{ textAlign: "left" }}>
              <span>
                1. Cung cấp họ tên, địa chỉ, số điện thoại để tiện liên lạc khi
                cần thiết.
              </span>
              <br />
              <span>2. Lên tàu trước giờ khởi hành 15 phút.</span>
              <br />
              <span>
                3. Tuân theo hướng dẫn của tiếp viên và thủy thủ đoàn.
              </span>
              <br />
              <span>4. Xin Quý khách vui lòng:</span>
              <br />
              <span>
                - Không mang theo vũ khí, chất độc, chất dễ gây cháy nổ, súc
                vật...
              </span>
              <br />
              <span>- Không mang theo xe đạp và xe gắn máy.</span>
              <br />
              <span>- Không mang hàng hóa không phải hành lý cá nhân.</span>
              <br />
              <span>
                5. Giữ trật tự, vệ sinh chung và ổn định chỗ ngồi trong suốt
                hành trình.
              </span>
              <br />
              <span>6. Không được hút thuốc lá trong khoang tàu.</span>
              <br />
              <span>7. Tự bảo quản hành lý cá nhân.</span>
              <br />
              <span>
                8. Sau khi tàu cập bến hành khách rời tàu theo hướng dẫn của
                tiếp viên và thủy thủ đoàn.
              </span>
              <br />
              <span>
                9. GreenlinesDP được miễn trừ bồi thường khi phải hủy chuyến Tàu
                hoặc chuyến Tàu bị kéo dài vì một trong các nguyên nhân: Điều
                kiện thời tiết bất lợi, điều kiện thủy triều, thiên tai, động
                đất, an toàn kỹ thuật, nguy cơ an ninh …
              </span>
              <br />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
