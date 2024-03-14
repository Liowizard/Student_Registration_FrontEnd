// OtpVerification.js
import React, { useState } from 'react';

var data = ""

const OtpVerification = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [isOtpCorrect, setIsOtpCorrect] = useState(null);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSendEmail = async () => {
    // Make API request to send email and get OTP
    try {
      const response = await fetch('http://127.0.0.1:5000/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      data = await response.json();
      console.log('OTP:', data); // Log the OTP in the console
      setShowOtpInput(true); // Show OTP input field after sending email
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  const handleOtpChange = (e) => {
    const enteredOtp = e.target.value;
    console.log("enteredOtp",typeof enteredOtp,typeof data);

    // Check if entered OTP is correct (you should replace this with your actual logic)
    const isCorrect = enteredOtp == data; // Replace '123456' with the actual correct OTP

    setOtp(enteredOtp);
    setIsOtpCorrect(isCorrect);
  };

  return (
    <div>
      <label>
        Email:
        <input type="email" value={email} onChange={handleEmailChange} />
      </label>
      <br />
      {showOtpInput && (
        <>
          <label>
            OTP:
            <input type="text" value={otp} onChange={handleOtpChange} />
          </label>
          <br />
          {isOtpCorrect !== null && (
            <span style={{ color: isOtpCorrect ? 'green' : 'red' }}>
              {isOtpCorrect ? '✔ Correct OTP' : '✘ Incorrect OTP'}
            </span>
          )}
          <br />
        </>
      )}
      <button onClick={handleSendEmail}>Send Email</button>
    </div>
  );
};

export default OtpVerification;
