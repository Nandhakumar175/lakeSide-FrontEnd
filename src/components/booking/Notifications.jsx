import { useEffect, useRef } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

const Notifications = ({ userToken }) => {
    const stompClientRef = useRef(null);

    useEffect(() => {
        if (stompClientRef.current) return; // Prevent multiple activations

        console.log("🚀 Initializing WebSocket...");

        const socket = new SockJS("http://localhost:8080/ws"); // ✅ Matches backend WebSocket path
        const stompClient = new Client({
            webSocketFactory: () => socket,
            reconnectDelay: 5000,
            connectHeaders: {
                Authorization: `Bearer ${userToken}` // ✅ Send authentication token
            },
            debug: (msg) => console.log("🔹 WebSocket Debug:", msg),
        });

        stompClient.onConnect = () => {
            console.log("✅ WebSocket Connected!");

            // ✅ Subscribe to private notifications
            stompClient.subscribe("/user/queue/notifications", (message) => {
                console.log("🔹 Notification received!", message);
                alert(`New Notification: ${message.body}`);
            });
        };

        stompClient.onStompError = (frame) => {
            console.error("❌ STOMP Error:", frame);
        };

        stompClient.activate();
        stompClientRef.current = stompClient;

        return () => {
            if (stompClientRef.current) {
                stompClientRef.current.deactivate();
                stompClientRef.current = null;
            }
        };
    }, [userToken]);

    return <div>Listening for notifications...</div>;
};

export default Notifications;
