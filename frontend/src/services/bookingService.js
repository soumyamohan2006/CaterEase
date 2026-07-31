import { apiRequest } from "./api";

export const createBooking = (data, token) =>
  apiRequest("/bookings", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify(data),
  });

export const getMyBookings = (token) =>
  apiRequest("/bookings/my", {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getBookingById = (id, token) =>
  apiRequest(`/bookings/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
