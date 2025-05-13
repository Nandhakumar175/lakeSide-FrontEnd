import React, { useEffect, useState } from "react";
import { getBookingsByUserId } from "../utils/ApiFunctions";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import "./Profile.css";

const BookingHistory = () => {
	const [bookings, setBookings] = useState([]);
	const userId = localStorage.getItem("userId");
	const token = localStorage.getItem("token");
	const navigate = useNavigate();

	// Fetch bookings
	useEffect(() => {
		const fetchBookings = async () => {
			try {
				const response = await getBookingsByUserId(userId, token);
				setBookings(response);
			} catch (error) {
				console.error("Error fetching bookings:", error.message);
			}
		};
		fetchBookings();
	}, [userId, token]);

	return (
		<div className="container mt-4">
			{/* Buttons at the top left */}
			<div className="d-flex justify-content-start mb-3">
				<button className="btn btn-primary me-2" onClick={() => navigate("/profile")}>
					User Information
				</button>
				<button className="btn btn-secondary" onClick={() => navigate("/booking-history")}>
					Booking History
				</button>
			</div>

			{/* Booking History Table */}
			<h2 className="text-center">Booking History</h2>
			<table className="table table-bordered table-hover shadow">
				<thead>
					<tr>
						<th>Booking ID</th>
						<th>Room ID</th>
						<th>Room Type</th>
						<th>Check In</th>
						<th>Check Out</th>
						<th>Confirmation</th>
						<th>Status</th>
					</tr>
				</thead>
				<tbody>
					{bookings.map((booking, index) => (
						<tr key={index}>
							<td>{booking.id}</td>
							<td>{booking.room.id}</td>
							<td>{booking.room.roomType}</td>
							<td>{moment(booking.checkinDate).format("MMM Do, YYYY")}</td>
							<td>{moment(booking.checlOutDate).format("MMM Do, YYYY")}</td>
							<td>{booking.bookingConfirmationCode}</td>
							<td className="text-success">On-going</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default BookingHistory;
