import React from 'react'
import { useAppStore } from '../../store'

const Profile = () => {
  const { userInfo } = useAppStore();
  // console.log(userInfo,"userInfo")
  return (
    <div>
      Profile
      <p>Email : {userInfo.email}</p>
    </div>
  )
}

export default Profile
