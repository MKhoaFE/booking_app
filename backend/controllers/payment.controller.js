const axios = require("axios");
const crypto = require("crypto");
const dotenv = require("dotenv");
const Ticket = require("../models/ticket.model");
const User = require("../models/user.model");
dotenv.config();

const accessKey = process.env.ACCESS_KEY_MOMO;
const secretKey = process.env.SECRECT_KEY_MOMO;

exports.payment = async (req, res) => {
  const orderInfo = "pay with MoMo";
  const partnerCode = "MOMO";
  const redirectUrl =
    "https://webhook.site/b3088a6a-2d17-4f8d-a383-71389a6c600b";
  const ipnUrl =
    "https://56f6-42-115-217-205.ngrok-free.app/api/paymentmethod/callback";
  const requestType = "payWithMethod";
  const amount = req.body.amount;
  if (!amount) return res.status(400).json({ error: "Missing amount" });
  const orderId = req.body.orderId || partnerCode + new Date().getTime();
  const requestId = orderId;
  const extraData = "";
  const orderGroupId = "";
  const autoCapture = true;
  const lang = "vi";

  const rawSignature =
    "accessKey=" +
    accessKey +
    "&amount=" +
    amount +
    "&extraData=" +
    extraData +
    "&ipnUrl=" +
    ipnUrl +
    "&orderId=" +
    orderId +
    "&orderInfo=" +
    orderInfo +
    "&partnerCode=" +
    partnerCode +
    "&redirectUrl=" +
    redirectUrl +
    "&requestId=" +
    requestId +
    "&requestType=" +
    requestType;

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
          "Content-Type": "application/json",
        },
      }
    );
    return res.status(200).json(response.data);
  } catch (error) {
    console.error("Payment error:", error.response?.data || error.message);
    return res.status(500).json({ error: "Payment failed" });
  }
};

exports.callback = async (req, res) => {
  console.log("callback: ", req.body);

  const { orderId, resultCode } = req.body;
  if (!orderId) return res.status(400).json({ error: "Missing orderId." });

  try {
    const ticket = await Ticket.findOne({
      "paymentInfo.transactionId": orderId,
    });

    if (!ticket) {
      console.error("Không tìm thấy vé với orderId: ", orderId);
      return res.status(404).json({ error: "Ticket not found" });
    }

    if (resultCode === 0) {
      ticket.status = "confirmed";
      ticket.paymentInfo.paymentStatus = "success";
    } else {
      ticket.status = "cancelled";
      ticket.paymentInfo.paymentStatus = "failed";
    }

    await ticket.save();

    await User.updateOne(
      { userId: ticket.userId, "bookings.ticketId": ticket._id },
      { $set: { "bookings.$.paymentStatus": ticket.paymentInfo.paymentStatus } }
    );
    return res.status(200).json({ message: "Payment status updated" });
  } catch (error) {
    console.error("Callback error: ", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

exports.tranStatus = async (req, res) => {
  const { orderId } = req.body;

  const rawSignature = `accessKey=${accessKey}&orderId=${orderId}&partnerCode=MOMO&requestId=${orderId}`;

  const signature = crypto
    .createHmac("sha256", secretKey)
    .update(rawSignature)
    .digest("hex");

  const requestBody = JSON.stringify({
    partnerCode: "MOMO",
    requestId: orderId,
    orderId: orderId,
    signature: signature,
    lang: "vi",
  });

  const options = {
    method: "POST",
    url: "https://test-payment.momo.vn/v2/gateway/api/query",
    headers: {
      "Content-type": "application/json",
    },
    data: requestBody,
  };
  let result = await axios(options);

  return res.status(200).json(result.data);
};
