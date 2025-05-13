import React, { useEffect } from "react";
import MainHeader from "../layout/MainHeader";
import HotelService from "../common/HotelService";
import Parallax from "../common/Parallax";
import RoomCarousel from "../common/RoomCarousel";
import RoomSearch from "../common/RoomSearch";
import { useLocation } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

const Home = () => {
    const location = useLocation();
    const { user } = useAuth();
    const message = location.state?.message;

    useEffect(() => {
        if (location.state?.message) {
            console.log("📢 Home component re-rendered with a message change!");
        }
    }, [location.state?.message]); // ✅ Only re-run when `message` changes

    if (!user) {
        return (
            <section>
                <MainHeader />
                <div className="container text-center">
                    <p>Loading user information...</p>
                </div>
            </section>
        );
    }

    const repeatedComponents = [1, 2, 3];

    return (
        <section>
            {message && <p className="text-warning px-5">{message}</p>}
            <h6 className="text-success text-center"> You are logged in as {user.email}</h6>
            <MainHeader />
            <div className="container">
                <RoomSearch />
                {repeatedComponents.map((_, index) => (
                    <React.Fragment key={index}>
                        <RoomCarousel />
                        {index !== repeatedComponents.length - 1 && <Parallax />}
                    </React.Fragment>
                ))}
                <HotelService />
            </div>
        </section>
    );
};

export default Home;
