import React, { useEffect, useState } from "react";
import './Status.css';
import axiosInstance from "../../../utils/api";
import toast from "react-hot-toast";

export default function Status() {
    const [washingType,setWashingType] = useState('');
    const [selectedDate,setSelectedDate] = useState('');
    const [timeSlot,setTimeSlot] = useState('');
    const [currentStatus,setStatus] = useState('');
    const [bookingId,setBookingId] = useState('');
    useEffect(()=>{
        axiosInstance.get('/api/user/booking/').then((response)=>{
            const data = response.data
            setWashingType(data.mode);
            setSelectedDate(data.date);
            setTimeSlot(data.timeslot);
            setStatus(data.status)
            setBookingId(data.id)
        })
    },[currentStatus])

    const handleCancel = () => {
        toast.promise(
            axiosInstance.patch(`/api/user/booking/${bookingId}/`).then((response)=>{
                setStatus(response.data.status)
            }),
            {
              pending: "Cancelling your booking...",
              success: "Booking cancelled successfully!",
              error: "Failed to cancel the booking. Please try again.",
            }
          );
    }

    return (
        <div className="Status">
            {/* <h1>BOOKING SUCCESSFUL!</h1> */}
            {/* <div className="line"></div> */}
            <div className="confirmation-details">
                <p>Your slot for <strong>{washingType}</strong> has been successfully booked.</p>
                <p>Date: <strong>{selectedDate}</strong></p>
                <p>Time Slot: <strong>{timeSlot}</strong></p>
                <p>Current Status: <strong>{currentStatus}</strong></p>
                {currentStatus==='booked' && 
                <button className="cancel-btn" onClick={handleCancel} >
                    CANCEL
                </button>
                }
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
