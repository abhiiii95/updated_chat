import { useState } from "react";
import "../assets/style/authComponent.css";
import { toast } from "react-toastify";
import { apiClient } from "../lib/api-client";
import { LOGIN_ROUTES, SIGN_UP_ROUTES } from "../utils/constant";
import { useNavigate } from "react-router";
import { useAppStore } from "../store";

export default function AuthComponent() {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">
          {activeTab === "login" ? "Login" : "Register"}
        </h2>
        <div className="auth-tabs">
          <button
            className={activeTab === "login" ? "active" : ""}
            onClick={() => setActiveTab("login")}
          >
            Login
          </button>
          <button
            className={activeTab === "register" ? "active" : ""}
            onClick={() => setActiveTab("register")}
          >
            Register
          </button>
        </div>
        {activeTab === "login" ? <LoginForm /> : <RegisterForm />}
      </div>
    </div>
  );
}

function LoginForm() {
<<<<<<< HEAD
  const navigate = useNavigate();
  const { setUserInfo } = useAppStore();
=======
  const navigate = useNavigate()
  const {setUserInfo} = useAppStore(); 
>>>>>>> 338f6a3ebdc9088a9abaec55ae598565c18d40f4

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const loginValidate = () => {
    if (!email || !password) {
      setError("All fields are required.");
      return;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loginValidate()) {
      const response = await apiClient.post(
        LOGIN_ROUTES,
        { email, password },
        { withCredentials: true }
      );
      if (response.data.user._id) {
        setUserInfo(response.data.user);
        if (response.data.user.profileSetup) navigate("/chat");
        else navigate("/profile");
      }
      console.log(response, "response");
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      {error && <p className="error-message">{error}</p>}
      <input
        type="email"
        placeholder="Email"
        required
        className="auth-input"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        required
        className="auth-input"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="auth-button" type="submit">
        Login
      </button>
    </form>
  );
}

function RegisterForm() {
<<<<<<< HEAD
  const navigate = useNavigate();

=======
  const navigate = useNavigate()
  const {setUserInfo} = useAppStore();
>>>>>>> 338f6a3ebdc9088a9abaec55ae598565c18d40f4
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const validate = () => {
    if (!email || !password) {
      toast("All fields are required.");
      return;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      const response = await apiClient.post(
        SIGN_UP_ROUTES,
        { email, password },
        { withCredentials: true }
      );
      if (response.status === 201) {
        setUserInfo(response.data.user);

        navigate("/profile");
      }
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
<<<<<<< HEAD
      {/* {error && <p className="error-message">{error}</p>} */}
      {/* <input 
        type="text" 
        placeholder="Username" 
        required 
        className="auth-input" 
        value={username} 
        onChange={(e) => setUsername(e.target.value)}
      /> */}
      <input
        type="email"
        placeholder="Email"
        required
        className="auth-input"
        value={email}
=======

      <input 
        type="email" 
        placeholder="Email" 
        required 
        className="auth-input" 
        value={email} 
>>>>>>> 338f6a3ebdc9088a9abaec55ae598565c18d40f4
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        required
        className="auth-input"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="auth-button" type="submit">
        Register
      </button>
    </form>
  );
}
