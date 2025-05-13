import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

const CheckoutForm = ({ amount, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    setError("");

    try {
      const { clientSecret } = await paymentService.createPaymentIntent(amount);

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        setError(result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        onSuccess(result.paymentIntent);
      }
    } catch (err) {
      console.error("Payment failed:", err);
      setError("Payment failed. Please try again.");
    }

    setProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
      <CardElement />
      {error && <p className="text-red-500">{error}</p>}
      <button
        type="submit"
        disabled={!stripe || processing}
        className="bg-teal-600 text-white py-3 px-4 rounded w-full hover:bg-teal-700"
      >
        {processing ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
};

export default CheckoutForm;
