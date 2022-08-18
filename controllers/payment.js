import request from "request";
import http from "http";

export const createPayment = (req, res) => {
  const auth = { user: process.env.CLIENT, pass: process.env.SECRET };
  const { amount } = req.body;
  const body = {
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: "USD", //https://developer.paypal.com/docs/api/reference/currency-codes/
          value: amount,
        },
      },
    ],
    application_context: {
      brand_name: `Boticas BLM`,
      landing_page: "NO_PREFERENCE",
      user_action: "PAY_NOW",
      return_url: `https://botica-blm-backend.herokuapp.com/api/v1/payment/execute-payment`,
      cancel_url: `https://botica-blm-frontend.web.app/`,
    },
  };

  request.post(
    `${process.env.PAYPAL_API}/v2/checkout/orders`,
    {
      auth,
      body,
      json: true,
    },
    (err, response) => {
      res.json({ data: response.body });
    }
  );
};

export const executePayment = (req, res) => {
  const token = req.query.token;
  const auth = { user: process.env.CLIENT, pass: process.env.SECRET };
  request.post(
    `${process.env.PAYPAL_API}/v2/checkout/orders/${token}/capture`,
    {
      auth,
      body: {},
      json: true,
    },
    (err, response) => {
      res.redirect("https://botica-blm-frontend.web.app/success");
    }
  );
};
