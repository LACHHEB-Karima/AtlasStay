// src/services/bookingService.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:4040/api/v1/public/bookings';

export const checkRoomAvailability = async ({ roomId, checkInDate, checkOutDate }) => {
  const response = await axios.post(`${API_BASE_URL}/check-availability`, {
    roomId, checkInDate, checkOutDate
  }, {
    withCredentials: true,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createBooking = async (bookingPayload) => {
  const response = await axios.post(API_BASE_URL, bookingPayload, {
    withCredentials: true,
  });
  return response.data;
};

export const createPaymentIntent = async (amount) => {
  const response = await axios.post(`${API_BASE_URL}/create-payment-intent`, { amount }, {
    withCredentials: true,
  });
  return response.data;
};

export const confirmBookingPayment = async (bookingId, paymentIntentId) => {
  const response = await axios.post(`${API_BASE_URL}/pay-booking`, null, {
    params: { bookingId, paymentIntentId },
    withCredentials: true,
  });
  return response.data;
};

export const cancelBooking = async (bookingId) => {
  const response = await axios.delete(`${API_BASE_URL}/${bookingId}`);
  return response.data;
};

export const getMyBookings = async () => {
  const response = await axios.get(API_BASE_URL, {
    withCredentials: true,
  });
  return response.data;
};
