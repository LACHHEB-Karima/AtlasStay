import React, { useState, useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useNavigate } from "react-router-dom";
import { confirmBookingPayment, cancelBooking, createPaymentIntent } from "../../services/bookingService";

const stripePromise = loadStripe("pk_test_51RMYI0IbgimaQOgcEiHEA0pLI6d4PuRlSCJBSu6nEdG9pVBKs2YNAHNjqitZLilxRSPt88uk35KLslgWDUF5F8RJ00VR2bYbD3");

const BookingStep2 = ({ bookingInfo, onNext }) => {

  const [clientSecret, setClientSecret] = useState(null);
  const [paymentError, setPaymentError] = useState(false);
  const navigate = useNavigate();

  const amount = Math.round(bookingInfo.totalPrice * 100);
  console.log(bookingInfo.bookingId)
  const handlePaymentSuccess = async (paymentIntent) => {
    const paymentIntentId = paymentIntent.id;
    const bookingId = bookingInfo.bookingId;

    try {
      await confirmBookingPayment(bookingId, paymentIntentId);
      onNext();
    } catch (error) {
      console.error("Payment succeeded, but booking confirmation failed.", error);
      setPaymentError(true);
    }
  };

  const handleCancelBooking = async () => {
    try {
      await cancelBooking(bookingInfo.bookingId);
      navigate(`/room/${bookingInfo.roomId}`);
    } catch (err) {
      console.error("Failed to cancel booking:", err);
    }
  };

  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        const data = await createPaymentIntent(amount);
        setClientSecret(data.clientSecret);
      } catch (error) {
        console.error("Failed to create PaymentIntent", error);
        setPaymentError(true);
      }
    };

    fetchClientSecret();
  }, [amount]);


  const handlePaymentFailure = () => {
    setPaymentError(true);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-white p-4">
      {/* Branding */}
      <div className="w-full text-center py-6">
        <h4 className='text-teal-500'><strong className='text-teal-600 text-[30px]'>Atlas</strong><span className='text-[25px]'>Stay</span></h4>
      </div>

      {/* Step indicators */}
      <div className="flex justify-center w-full mb-8 gap-4">
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-teal-600 text-white">✓</div>
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-200 border border-teal-600 text-gray-600">2</div>
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-200 text-gray-600">3</div>
      </div>

      {/* Payment Heading */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Payment</h2>
        <p className="text-gray-500">{bookingInfo.days} Days at {bookingInfo.roomTitle}</p>
        <p className="font-semibold text-gray-800 mt-8 mb-8">
          Total: <span className="text-black font-bold">{bookingInfo.totalPrice}$</span>
        </p>
      </div>

      {/* Payment Form */}
      {clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm
            amount={amount}
            onSuccess={handlePaymentSuccess}
            onFailure={handlePaymentFailure}
          />
        </Elements>
      )}

      {/* Retry / Cancel options */}
      {paymentError && (
        <div className="mt-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded w-full max-w-md text-center">
          <p className="mb-4">Payment failed. Would you like to retry or cancel the booking?</p>
          <div className="flex justify-center gap-4">
            <button
              className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
              onClick={() => setPaymentError(false)}
            >
              Retry
            </button>
            <button
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
              onClick={handleCancelBooking}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingStep2;
