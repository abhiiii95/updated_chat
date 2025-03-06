import React from "react";
import "./chatPage.css";
import UserList from "../UserList";
import ChatArea from "../ChatArea";
const ChatPage = () => {
    return (
      <div className="chat-page">
        <UserList />
        <ChatArea />
      </div>
    );
  };
  
  export default ChatPage;