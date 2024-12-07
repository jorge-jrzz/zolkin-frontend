import React from "react";
import styled from "styled-components";
import { assets } from "../../assets/assets";

const ExampleChat = ({ aimessage, usermessage }) => {
  return (
    <StyledWrapper>
      <div className="card-container">
        <div className="card-header">
          <div className="img-avatar">
            <img src={assets.zolkin_icon} alt="" />
          </div>
          <div className="text-chat">Zolkin</div>
        </div>
        <div className="card-body">
          <div className="messages-container">
            <div className="message-box left">
              <p>{usermessage}</p>
            </div>
            <div className="message-box right">
              <p>{aimessage}</p>
            </div>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .card-container {
    background-color: #fff;
    border-radius: 10px;
    padding: 15px;
    margin: 20px;
    display: flex;
    flex-direction: column;
    width: 280px;
  }

  .card-header {
    display: flex;
    align-items: center;
    padding-bottom: 10px;
    border-bottom: 1px solid #ccc;
  }

  .card-header .img-avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 20px;
    background-color: #141414;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .card-header .img-avatar img {
    width: 40px;
  }

  .card-header .text-chat {
    color: black;
    margin: 0;
    font-size: 20px;
  }

  .card-body {
    flex: 1;
    overflow-y: auto;
  }

  .messages-container {
    padding: 15px;
  }

  .message-box {
    padding: 10px;
    margin-bottom: 5px;
    border-radius: 10px;
  }

  .message-box.left {
    background-color: #f1f1f1;
    color: black;
    font-size: 13px;
    left: 0;
  }

  .message-box.right {
    background-color: #141414;
    color: #fff;
    font-size: 13px;
    right: 0;
  }
`;

export default ExampleChat;
