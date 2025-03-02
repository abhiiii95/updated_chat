import { useState } from "react";
import "../assets/style/authComponent.css";

export default function AuthComponent() {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">{activeTab === "login" ? "Login" : "Register"}</h2>
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("All fields are required.");
      return;
    }
    setError("");
    alert("Login Successful");
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
      <button className="auth-button" type="submit">Login</button>
    </form>
  );
}

function RegisterForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !email || !password) {
      setError("All fields are required.");
      return;
    }
    setError("");
    alert("Registration Successful");
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      {error && <p className="error-message">{error}</p>}
      <input 
        type="text" 
        placeholder="Username" 
        required 
        className="auth-input" 
        value={username} 
        onChange={(e) => setUsername(e.target.value)}
      />
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
      <button className="auth-button" type="submit">Register</button>
    </form>
  );
}
