import React from "react";
import './Status.css';
import { useLocation } from "react-router-dom";

export default function Status() {
    const location = useLocation();
    const { washingType = "Normal Washing", selectedDate = "Not Selected", timeSlot = "Not Selected" } = location.state || {};

    return (
        <div className="Status">
            <h1>BOOKING SUCCESSFUL!</h1>
            <div className="line"></div>
            <div className="confirmation-details">
                <p>Your slot for <strong>{washingType}</strong> has been successfully booked.</p>
                <p>Date: <strong>{selectedDate}</strong></p>
                <p>Time Slot: <strong>{timeSlot}</strong></p>
            </div>
            <div className="activity-status">
                <h2>CURRENT MACHINE ACTIVITY</h2>
                <div className="line"></div>
                <p>Machine Status: <strong>Idle</strong></p>
                <p>Next Scheduled Cycle: <strong>Calculating...</strong></p>
            </div>
        </div>
    );
}
