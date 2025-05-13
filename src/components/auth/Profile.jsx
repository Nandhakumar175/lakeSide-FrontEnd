import React, { useEffect, useState } from "react";
import { getUser, getBookingsByUserId } from "../utils/ApiFunctions";
import moment from "moment";
import "./Profile.css";

const Profile = () => {
	const [user, setUser] = useState(null);
	const [bookings, setBookings] = useState([]);
	const [activeTab, setActiveTab] = useState("userInfo"); // "userInfo" or "bookingHistory"

	const userId = localStorage.getItem("userId");
	const token = localStorage.getItem("token");

	// Fetch user profile
	useEffect(() => {
		const fetchUser = async () => {
			try {
				const userData = await getUser(userId, token);
				setUser(userData);
			} catch (error) {
				console.error(error);
			}
		};
		fetchUser();
	}, [userId, token]);

	// Fetch booking history
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
			{/* Buttons for User Info & Booking History */}
			<div className="d-flex justify-content-start mb-3">
				<button
					className={`btn me-2 ${activeTab === "userInfo" ? "btn-primary" : "btn-secondary"}`}
					onClick={() => setActiveTab("userInfo")}
				>
					User Information
				</button>
				<button
					className={`btn ${activeTab === "bookingHistory" ? "btn-primary" : "btn-secondary"}`}
					onClick={() => setActiveTab("bookingHistory")}
				>
					Booking History
				</button>
			</div>

			{/* Show User Information */}
			{activeTab === "userInfo" && (
				<div className="tab-content fade-in">
					<h2 className="text-center">User Information</h2>
					<div className="card shadow p-4">
						<div className="text-center">
							<img
								src="https://themindfulaimanifesto.org/wp-content/uploads/2020/09/male-placeholder-image.jpeg"
								alt="Profile"
								className="rounded-circle"
								style={{ width: "100px", height: "100px", objectFit: "cover" }}
							/>
							<h5 className="mt-2">{user?.firstName} {user?.lastName}</h5>
						</div>
						<hr />
						<p><strong>ID:</strong> {user?.id}</p>
						<p><strong>Email:</strong> {user?.email}</p>
						<p><strong>Roles:</strong> {user?.roles.map((role) => role.name).join(", ")}</p>
					</div>
				</div>
			)}

			{/* Show Booking History */}
			{activeTab === "bookingHistory" && (
				<div className="tab-content fade-in">
					<h2 className="text-center">Booking History</h2>
					<table className="table table-bordered table-hover shadow">
						<thead>
							<tr>
								<th>S.No</th> {/* Serial Number Column */}
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
									<td>{index + 1}</td> {/* Serial Number */}
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
			)}
		</div>
	);
};

export default Profile;
