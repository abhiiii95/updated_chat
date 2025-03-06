import React from 'react'
import ChatHeader from '../ChatHeader';
import ChatMessageArea from '../ChatMessageArea';
import ChatMessageBox from '../ChatMessageBox';

const ChatArea = () => {
    return (
      <div className="chat-area">
        {/* <h2 className="title">Chat Area</h2> */}
        <ChatHeader />
        <ChatMessageArea />
        <ChatMessageBox />
      </div>
    );
  };

  export default ChatArea