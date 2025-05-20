const axios = require("axios");
const crypto = require("crypto");

exports.payment = async (req, res) => {
  const accessKey = "F8BBA842ECF85";
  const secretKey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
  const orderInfo = "pay with MoMo";
  const partnerCode = "MOMO";
  const redirectUrl = "https://webhook.site/b3088a6a-2d17-4f8d-a383-71389a6c600b";
  const ipnUrl = "https://webhook.site/b3088a6a-2d17-4f8d-a383-71389a6c600b";
  const requestType = "payWithMethod";
  const amount = "50000";
  const orderId = partnerCode + new Date().getTime();
  const requestId = orderId;
  const extraData = "";
  const orderGroupId = "";
  const autoCapture = true;
  const lang = "vi";

  const rawSignature =
    "accessKey=" + accessKey +
    "&amount=" + amount +
    "&extraData=" + extraData +
    "&ipnUrl=" + ipnUrl +
    "&orderId=" + orderId +
    "&orderInfo=" + orderInfo +
    "&partnerCode=" + partnerCode +
    "&redirectUrl=" + redirectUrl +
    "&requestId=" + requestId +
    "&requestType=" + requestType;

  const signature = crypto
    .createHmac("sha256", secretKey)
    .update(rawSignature)
    .digest("hex");

  const requestBody = {
    partnerCode,
    partnerName: "Test",
    storeId: "MomoTestStore",
    requestId,
    amount,
    orderId,
    orderInfo,
    redirectUrl,
    ipnUrl,
    lang,
    requestType,
    autoCapture,
    extraData,
    orderGroupId,
    signature,
  };

  try {
    const response = await axios.post(
      "https://test-payment.momo.vn/v2/gateway/api/create",
      requestBody,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return res.status(200).json(response.data);
  } catch (error) {
    console.error("Payment error:", error.response?.data || error.message);
    return res.status(500).json({ error: "Payment failed" });
  }
};
