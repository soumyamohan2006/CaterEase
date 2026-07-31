import { apiRequest } from "./api";

export const getAdminStats = (token) =>
  apiRequest("/admin/dashboard", {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getAdminBookings = (token) =>
  apiRequest("/admin/bookings", {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getAdminUsers = (token) =>
  apiRequest("/admin/users", {
    headers: { Authorization: `Bearer ${token}` },
  });

export const updateBookingStatus = (id, status, token) =>
  apiRequest(`/admin/bookings/${id}/status`, {
    method: "PATCH",
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify({ status }),
  });
