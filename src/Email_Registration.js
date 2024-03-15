import React, { useState} from "react";
import { Link, useNavigate } from 'react-router-dom';




var otp = "";

function Email_Registration({onLoginClick}) {
    const [email, setEmail] = useState("");
    const [userEnteredOTP, setUserEnteredOTP] = useState("");
    const [verificationStatus, setVerificationStatus] = useState("");
    const [showOTPInput, setShowOTPInput] = useState(false); // State to manage showing OTP input
    const [showPasswordInput, setShowPasswordInput] = useState(false); // State to manage showing password input
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordMatchError, setPasswordMatchError] = useState(false);
  
    const handleEmailSubmit = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/verify", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });
        otp = await response.json();
        setEmail(email);
        setShowOTPInput(true); // Show OTP input box after receiving OTP
      } catch (error) {
        console.error("Error:", error);
      }
    };
  
    const handleOTPSubmit = () => {
      if (otp == userEnteredOTP) {
        setVerificationStatus("OTP Verified");
        setShowOTPInput(false); // Hide OTP input box
        setShowPasswordInput(true); // Show password input box
      } else {
        setVerificationStatus("Invalid OTP");
      }
    };
  
      const handlePasswordSubmit = () => {
        if (password === confirmPassword) {
          // Passwords match
          setVerificationStatus("Password Confirmed");
          // Redirect to the next page after password confirmation
          window.location.href = "/nextpage";
        } else {
          // Passwords do not match
          setPasswordMatchError(true);
        }
  
  
    };
  
    return (
      <div className="container">
        <div className="header">
          <h1>Email OTP Verification</h1>
        </div>
        <div className="input-container">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
          <button onClick={handleEmailSubmit}>Submit</button>
      
         <Link to="/">login</Link>
        </div>
  
        {showOTPInput && (
          <div className="input-container">
            <input
              type="text"
              value={userEnteredOTP}
              onChange={(e) => setUserEnteredOTP(e.target.value)}
              placeholder="Enter OTP"
            />
            <button onClick={handleOTPSubmit}>Verify OTP</button>
          </div>
        )}
  
  {showPasswordInput && (
          <div className="input-container">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
            />
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
            />
            {passwordMatchError && (
              <p className="error-message">Passwords do not match!</p>
            )}
            <button onClick={handlePasswordSubmit}>Confirm Password</button>
          </div>
        )}
  
        {verificationStatus && (
          <p className="result-message">{verificationStatus}</p>
        )}
      </div>
    );
  }
  
  export default Email_Registration;  