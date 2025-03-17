import React from "react";
import styled from "styled-components";
import { assets } from "../../assets/assets.js";

const InitCard = () => {
  const backend_url = process.env.BACKEND_URL;
  const loginWithGoogle = () => {
    window.location.href = `${backend_url}/google/`;
  };

  return (
    <StyledWrapper>
      <div className="card">
        <img className="App-logo" src={assets.zolkin_icon} alt=""></img>
        <button className="login-button" onClick={loginWithGoogle}>
          <img src={assets.google_icon} alt="" className="google-icon"></img>
          Continuar con Google
        </button>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .card {
    width: 100%;
    height: 254px;
    background: #eeeeee;
    position: relative;
    display: flex;
    flex-direction: column;
    place-content: center;
    place-items: center;
    overflow: hidden;
    border-radius: 20px;
  }

  .card button {
    z-index: 1;
  }

  .card img {
    z-index: 2;
  }

  .App-logo {
    pointer-events: none;
    width: 120px;
    margin-bottom: 1.5rem;
  }

  .card::before {
    content: "";
    position: absolute;
    width: 100px;
    background-image: linear-gradient(180deg, #00f261, #0062ff);
    height: 210%;
    animation: rotBGimg 3s linear infinite;
    transition: all 0.2s linear;
  }

  @keyframes rotBGimg {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(360deg);
    }
  }

  .card::after {
    content: "";
    position: absolute;
    background: #eeeeee;
    inset: 5px;
    border-radius: 15px;
  }

  .login-button {
    max-width: 320px;
    display: flex;
    padding: 0.5rem 1.4rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
    font-weight: 700;
    text-align: center;
    text-transform: uppercase;
    vertical-align: middle;
    align-items: center;
    border-radius: 0.5rem;
    border: 1px solid rgba(0, 0, 0, 0.25);
    gap: 0.75rem;
    color: rgb(65, 63, 63);
    background-color: #fff;
    cursor: pointer;
    transition: all 0.6s ease;
  }

  .google-icon {
    width: 24px;
    height: 24px;
  }

  .login-button svg {
    height: 24px;
  }

  .login-button:hover {
    transform: scale(1.02);
  }
`;

export default InitCard;
