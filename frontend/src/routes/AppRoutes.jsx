import { Routes, Route } from "react-router-dom";

import MainLayout from "../components/layout/MainLayout";
import ProtectedRoute from "./ProtectedRoute";

import Home from "../pages/public/Home";
import About from "../pages/public/About";
import Services from "../pages/public/Services";
import Contact from "../pages/public/Contact";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import Events from "../pages/events/Events";
import EventDetails from "../pages/events/EventDetails";

import Catering from "../pages/catering/Catering";
import MenuDetails from "../pages/catering/MenuDetails";

import BookEvent from "../pages/booking/BookEvent";
import MyBookings from "../pages/booking/MyBookings";
import BookingDetails from "../pages/booking/BookingDetails";

import CustomerDashboard from "../pages/customer/CustomerDashboard";

function AppRoutes() {
  return (
    <Routes>

      {/* Public Routes */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<EventDetails />} />

        <Route path="/catering" element={<Catering />} />
        <Route path="/catering/:id" element={<MenuDetails />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/book-event/:id" element={<BookEvent />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/booking/:id" element={<BookingDetails />} />
          <Route path="/dashboard" element={<CustomerDashboard />} />
        </Route>
      </Route>

    </Routes>
  );
}

export default AppRoutes;