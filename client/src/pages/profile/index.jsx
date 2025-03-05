import React, { useEffect, useState, useCallback, useRef } from "react";
import "../../assets/style/profile.css";
import { useAppStore } from "../../store";
import { apiClient } from "../../lib/api-client";
import { UPDATE_USER_ROUTES } from "../../utils/constant";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const CreateProfile = React.memo(() => {
  const { userInfo } = useAppStore();
  const navigate = useNavigate();
  const fileInputRef = useRef(null); // Use ref for file input

  // Single state object for better performance
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    image: null,
  });

  // Populate form only when userInfo is available
  useEffect(() => {
    if (userInfo) {
      setFormData((prev) => ({
        ...prev,
        firstName: userInfo.firstName || "",
        lastName: userInfo.lastName || "",
      }));
    }
  }, [userInfo]);

  // Generic function to handle all input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
    }
  };

  // Validation function
  const isValidate = () => {
    if (!formData.firstName.trim()) {
      toast.error("Please provide First Name");
      return false;
    }
    if (!formData.lastName.trim()) {
      toast.error("Please provide Last Name");
      return false;
    }
    return true;
  };

  // Handle Form Submission
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (!isValidate()) return;

    const submissionData = new FormData();
    submissionData.append("firstName", formData.firstName);
    submissionData.append("lastName", formData.lastName);
    if (formData.image) submissionData.append("image", formData.image);

    try {
      const response = await apiClient.post(UPDATE_USER_ROUTES, submissionData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data?.user?.profileSetup) {
        toast.success("Profile created successfully");
        navigate("/chat");
      }
    } catch (error) {
      toast.error("Failed to update profile");
    }
  }, [formData, navigate]);

  return (
    <div className="form-container">
      <h2 className="form-title">Create Your Profile</h2>
      <form className="form-fields" onSubmit={handleSubmit}>
        <label className="input-label">Email <span className="required">*</span></label>
        <input
          type="email"
          name="email"
          className="input-field"
          required
          value={userInfo.email}
          readOnly
        />

        <label className="input-label">First Name <span className="required">*</span></label>
        <input
          type="text"
          name="firstName"
          placeholder="Enter your first name"
          className="input-field"
          required
          value={formData.firstName}
          onChange={handleChange}
        />

        <label className="input-label">Last Name <span className="required">*</span></label>
        <input
          type="text"
          name="lastName"
          placeholder="Enter your last name"
          className="input-field"
          required
          value={formData.lastName}
          onChange={handleChange}
        />

        <label className="input-label">Upload Profile Image</label>
        <input
          type="file"
          name="image"
          className="input-field file-upload"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
        />

        <button type="submit" className="submit-button">Create Profile</button>
      </form>
    </div>
  );
});

export default CreateProfile;
