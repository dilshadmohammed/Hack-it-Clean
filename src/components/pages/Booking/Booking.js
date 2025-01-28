import React, { useState } from "react";
import './Booking.css';
import { useLocation, useNavigate } from "react-router-dom";

export default function Booking() {
    const location = useLocation();
    const { washingType } = location.state || { washingType: "Normal Washing" };
    const navigate = useNavigate();

    const [selectedDate, setSelectedDate] = useState("");
    const [timeSlot, setTimeSlot] = useState("");

    const toStatus = () => {
        if (selectedDate && timeSlot) {
            navigate("/status", { state: { washingType, selectedDate, timeSlot } });
        } else {
            alert("Please select both a date and a time slot.");
        }
    };

    return (
        <div className="Booking">
            <h1>BOOK A TIME SLOT</h1>
            <div className="line"></div>
            <div>
                <label htmlFor="washing-type">Selected Washing Type:</label>
                <button className="select" onClick={() => navigate("/types")}>{washingType}</button>
            </div>
            <div>
                <label htmlFor="date">Select Date:</label>
                <input
                    type="date"
                    id="date"
                    name="date"
                    required
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="time-slot">Select Time Slot:</label>
                <select
                    id="time-slot"
                    name="time-slot"
                    required
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                >
                    <option value="">Select</option>
                    <option value="8:00 AM - 10:00 AM">8:00 AM - 10:00 AM</option>
                    <option value="10:00 AM - 12:00 PM">10:00 AM - 12:00 PM</option>
                    <option value="12:00 PM - 2:00 PM">12:00 PM - 2:00 PM</option>
                    <option value="2:00 PM - 4:00 PM">2:00 PM - 4:00 PM</option>
                    <option value="4:00 PM - 6:00 PM">4:00 PM - 6:00 PM</option>
                </select>
            </div>
            <div>
                <button className="submit" type="button" onClick={toStatus}>Confirm Booking</button>
                <div className="button-active"></div>
            </div>
        </div>
    );
}
