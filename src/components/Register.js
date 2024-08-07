import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/users", { email, password });
      alert("Registration successful");
      navigate("/"); // Changed from history.push to navigate
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  // ... rest of the component remains the same
}

export default Register;
