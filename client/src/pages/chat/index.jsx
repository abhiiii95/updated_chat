import React, { useEffect } from 'react'
import { useAppStore } from '../../store'
import { useNavigate } from 'react-router';
import ChatPage from '../../components/ChatModule/ChatPage';


const Chat = () => {
  const { userInfo } = useAppStore();
  const navigate = useNavigate();

  console.log("Chat userInfo: ", userInfo)
  useEffect(() => {
    if (!userInfo.profileSetup) {
      console.log("Please complete Your Profile Steup");
      navigate("/profile")
    }
  }, [userInfo, navigate])
  return (
    <div>
    <ChatPage />

    </div>
  )
}

export default Chat
