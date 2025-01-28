import React from "react";
import './Types.css';
import { useNavigate } from "react-router-dom";

export default function Types() {
    const navigate = useNavigate();

    const select = (washing) => {
        navigate("/booking", { state: { washingType: washing } });
    };

    return (
        <div className="Types">
            <h1>SELECT WASHING TYPE</h1>
            <div className="line"></div>
            <div className="washing-options">
                <div className="washing-option" onClick={() => select("Normal Washing")}>
                    <h2>Normal Washing</h2>
                    <p>Ideal for everyday laundry with gentle and efficient cleaning.</p>
                </div>
                <div className="washing-option" onClick={() => select("Quick Washing")}>
                    <h2>Quick Washing</h2>
                    <p>Fast and efficient washing for lightly soiled clothes by using steam.</p>
                </div>
                <div className="washing-option" onClick={() => select("Steam Ironing")}>
                    <h2>Steam Ironing</h2>
                    <p>Removes wrinkles and refreshes clothes with steam.</p>
                </div>
            </div>
        </div>
    );
}
