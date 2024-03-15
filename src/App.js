import React, { useState} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./UserForm.css";

import Email_Registration from "./Email_Registration";

import LoginPage from "./LoginPage";

import UserDetailsForm from "./UserDetailsForm";

const admin=["ajeshrandam@gmail.com"]




  

    function App() {
      const [isLoggedIn, setIsLoggedIn] = useState(false);

      const handleLogin = () => {
        setIsLoggedIn(true);
      };
      return (
        <Router>
          <Routes>
            <Route
              path="/"
              element={isLoggedIn ? <UserDetailsForm /> : <LoginPage onLogin={handleLogin} />}
            />
            <Route path="/register" element={<Email_Registration />} />
            <Route path="/nextpage" element={<UserDetailsForm />} />
          </Routes>
        </Router>
      );
    }
export default App;


