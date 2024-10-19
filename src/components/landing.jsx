import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

function Landing() {
    const navigate = useNavigate();

    return (
        <>
            <div id="landing">
                <div id="landing-data">
                    <h1>NOTE~iT</h1>
                    <h2>"Capture Your Ideas Effortlessly","Organize Your Thoughts, Anytime"</h2>
                   <div id="button-section">
                       <button id="loginbutton"  onClick={function(){
                           navigate("/Login")
                       }}>Login</button>
                       <button id=""  onClick={function(){
                           navigate("/Signup")
                       }}>Signup</button>
                   </div>
                </div>
            </div>
        </>
    );
}

export default Landing;
