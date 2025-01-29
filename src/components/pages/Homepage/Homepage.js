import React from "react";
import './Homepage.css'
import { useNavigate } from "react-router-dom"

export default function Homepage() {
    const navigate = useNavigate();

    const goto = () => {
        navigate("/types");
    }
    return(
        <div class="Homepage">
            <div className="bubbles1">
                <img className="bubble1" src="/img/bubble-1.png"/>
                <img className="bubble5" src="/img/bubble-1.png"/>
                <img className="bubble10" src="/img/bubble-3.png"/>
                <img className="bubble9" src="/img/bubble-2.png"/>
                <img className="bubble8" src="/img/bubble-1.png"/>
            </div>
            <div className="bubbles2">
                <img className="bubble2" src="/img/bubble-2.png"/>
                <img className="bubble3" src="/img/bubble-3.png"/>
                <img className="bubble4" src="/img/bubble-3.png"/>
                <img className="bubble6" src="/img/bubble-1.png"/>
                <img className="bubble7" src="/img/bubble-1.png"/>
                <img className="bubble11" src="/img/bubble-3.png"/>
            </div>
            <div className="details">
                <div className="line"></div>
                <span className="title-1">WELCOME</span>
                <div className="title-2-3">
                    <div><span className="title-2">to</span></div>
                    <div><span className="title-3">INNOWASH</span></div>
                </div>
                <div className="line-2"></div>
                <p>The modern, eco-friendly solution to hostel laundry.</p>
                <div class="cta">
                    <div>
                        <button class="primary" onClick={goto}>GET STARTED</button>
                        <div className="button-active"></div>
                    </div>
                    <div>
                        <button class="primary">LEARN MORE</button>
                        <div className="button-active"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}