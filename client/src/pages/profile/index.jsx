
import React, { useState } from "react";
import "../../assets/style/profile.css";
import { useAppStore } from "../../store";
import { apiClient } from "../../lib/api-client";
import { UPDATE_USER_ROUTES } from "../../utils/constant";
import { useNavigate } from "react-router";

const CreateProfile = () => {

  const { userInfo, setUserInfo } = useAppStore();
  console.log("Profile userInfo: ", userInfo)

  const [email, setEmail] = useState(userInfo.email)
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()


  const isValidate = () => {
    if (!firstName || !lastName) {
      setError("Please provide all the required fields");
      return;
    }
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isValidate()) {

      const response = await apiClient.post(UPDATE_USER_ROUTES,
        { firstName, lastName },
        { withCredentials: true }
      )
      console.log("response: ", response.data.user.profileSetup)
      if (response.data.user.profileSetup) {
        navigate("/chat")
      }
    }
  }


  return (
    <div className="form-container">
      <h2 className="form-title">Create Your Profile</h2>
      <form className="form-fields">

        <label className="input-label">
          Email <span className="required">*</span>
        </label>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          className="input-field"
          required
          value={email}
        />

        <label className="input-label">
          First Name <span className="required">*</span>
        </label>
        <input
          type="text"
          name="firstName"
          placeholder="Enter your first name"
          className="input-field"
          required
          onChange={(e) => setFirstName(e.target.value)}
        />

        <label className="input-label">
          Last Name <span className="required">*</span>
        </label>
        <input
          type="text"
          name="lastName"
          placeholder="Enter your last name"
          className="input-field"
          required
          onChange={(e) => setLastName(e.target.value)}
        />

        <label className="input-label">Upload Profile Image</label>
        <input
          type="file"
          name="image"
          className="input-field file-upload"
          accept="image/*"
        />

        {/* <label className="input-label">Favorite Color (Number)</label>
        <input
          type="number"
          name="color"
          placeholder="Enter your favorite color"
          className="input-field"
        /> */}

        <button type="submit"
          className="submit-button"
          onClick={handleSubmit}
        >
          Create Profile
        </button>

      </form>
    </div>
  );

};


export default CreateProfile;
