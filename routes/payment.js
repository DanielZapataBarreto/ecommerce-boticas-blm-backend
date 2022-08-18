import express from "express";
import { createPayment, executePayment } from "../controllers/payment.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/create-payment", verifyToken, createPayment);
router.get("/execute-payment", executePayment);

export default router;
