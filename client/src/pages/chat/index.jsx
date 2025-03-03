import React, { useEffect } from 'react'
import { useAppStore } from '../../store'
import { useNavigate } from 'react-router';


const Chat = () => {
  const {userInfo} = useAppStore();
  const navigate = useNavigate();
  useEffect(()=>{
    if(!userInfo.profileSetup){
      console.log("please profile steup");
      navigate("/profile")
    }
  },[userInfo,navigate])
  return (
    <div>
      chat
   
    </div>
  )
}

export default Chat
