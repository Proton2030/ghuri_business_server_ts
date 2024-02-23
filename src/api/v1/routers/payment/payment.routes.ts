import express from "express";
import { createPaymentRequest, deletePaymentRequest, editPaymentRequest, getAllPaymentRequests } from "../../controllers/paymentRequest";

const router = express.Router();

router.route("/reqpayment").post(createPaymentRequest);
router.route("/editpayment/:user_id").patch(editPaymentRequest);
router.route("/delpayment/:hash_id").delete(deletePaymentRequest);
router.route("/getAllPaymentRequests").get(getAllPaymentRequests);

module.exports = router;
