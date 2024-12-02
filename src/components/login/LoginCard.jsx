import React from "react";
import {assets} from "../../assets/assets.js";
import "./LoginCard.css";

const LoginCard = () => {
  const goOpenAI = () => {
    window.open(
      "https://openai.com/index/gpt-4o-mini-advancing-cost-efficient-intelligence/",
      "_blank"
    );
  };

  const loginWithGoogle = () => {
    window.location.href = "http://localhost:5002/google/";
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <img className="App-logo" src={assets.zolkin_icon} alt=""></img>
        <div className="welcome-text">
          <center>
            <span className="welcometo">Vienvenido a</span> <br />{" "}
            <span className="zolkin">Zolkin</span>
            <p className="login-text">Controla más con menos</p>
          </center>
        </div>
        <button className="login-button" onClick={loginWithGoogle}>
          <img src={assets.google_icon} alt="" className="google-icon"></img>
          Continue with Google
        </button>
      </div>
      <div className="button-container">
        <button className="brutalist-button openai button-1" onClick={goOpenAI}>
          <div className="openai-logo">
            <img className="openai-icon" src={assets.openai_icon} alt=""/>
          </div>
          <div className="button-text">
            <span>Powered By</span>
            <span>GPT-4o mini</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default LoginCard;
