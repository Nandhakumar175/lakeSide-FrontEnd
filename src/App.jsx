import { useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import AddRoom from "./components/room/AddRoom"
import ExistingRoom from "./components/room/ExistingRoom"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./components/home/Home"
import EditRoom from "./components/room/EditRoom"
import NavBar from "./components/layout/NavBar"
import Footer from "./components/layout/Footer"
import RoomListing from "./components/room/RoomListing"
import Admin from "./components/admin/Admin"
import CheckOut from "./components/booking/CheckOut"
import BookingSuccess from "./components/booking/BookingSuccess"
import Bookings from "./components/booking/Bookings "
import FindBooking from "./components/booking/FindBooking"
import Login from "./components/auth/Login"
import Registration from "./components/auth/Registration"
import Profile from "./components/auth/Profile"
import { AuthProvider,useAuth } from "./components/auth/AuthProvider"
import BookingHistory from "./components/auth/BrowsingHistory"; // If it’s inside auth/
//import Notifications from "./components/booking/Notifications"



function App() {
  // Get user email from authentication context
  const { user } = useAuth(); // ✅ Get logged-in user info
  const userEmail = user ? user.email : null; // ✅ Get email or null if not logged in

  return (
    <>
      <AuthProvider>
        <main>
          <Router>
            <NavBar />
            {/* ✅ Add Notifications component (Only if user is logged in) */}
            {userEmail && <Notifications userEmail={userEmail} />}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/edit-room/:roomId" element={<EditRoom />} />
              <Route path="/existing-rooms" element={<ExistingRoom />} />
              <Route path="/add-room" element={<AddRoom />} />
              <Route path="/book-room/:roomId" element={<CheckOut />} />
              <Route path="/browse-all-rooms" element={<RoomListing />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/booking-success" element={<BookingSuccess />} />
              <Route path="/existing-bookings" element={<Bookings />} />
              <Route path="/find-booking" element={<FindBooking />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Registration />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/logout" element={<FindBooking />} />
              <Route path="/booking-history" element={<BookingHistory />} />
            </Routes>
          </Router>
          <Footer />
        </main>
      </AuthProvider>
    </>
  );
}

export default App;