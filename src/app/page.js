"use client"; // Add this line at the top
import { useState } from "react";
import Image from "next/image";
import { UserIcon } from '@heroicons/react/24/outline';
import styles from "./page.module.css";

export default function Login() {
  // State for email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); // State for feedback message

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    alert(`Email: ${email}\nPassword: ${password}`); // Show alert with input values
  };

  // Function to send the code
  const sendCode = async () => {
    try {
      const response = await fetch('/api/send-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message); // Update message state with success message
      } else {
        setMessage(data.error); // Update message state with error message
      }
    } catch (error) {
      setMessage("Error sending code. Please try again."); // Handle fetch error
    }
  };
  console.log("JWT_SECRET:", process.env.JWT_SECRET);
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div className="card border-0 shadow rounded-3 my-5">
            <div className="card-body p-4 p-sm-5">
              {/* Add your logo here */}
              <div className="text-center mb-4">
                <Image
                  src="/logo.png"
                  alt="Logo"
                  width={100}
                  height={100}
                />
              </div>
              <h5 className="card-title text-center mb-5 fw-light fs-5">Sign In</h5>
              <form onSubmit={handleSubmit}>
                <div className="d-flex mb-3">
                  <div className="flex-grow-1 me-2">
                    <div className="form-floating">
                      <input
                        type="email"
                        className="form-control"
                        id="floatingInput"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                      <label htmlFor="floatingInput">Email address</label>
                    </div>
                  </div>
                  <button
                    type="button" // Change this to 'submit' if you want it to submit the form
                    className="btn btn-primary"
                    style={{ width: '40%' }}
                    onClick={sendCode} // Call sendCode function
                  >
                    Send
                  </button>
                </div>

                <div className="form-floating mb-3">
                  <input
                    type="password"
                    className="form-control"
                    id="floatingPassword"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <label htmlFor="floatingPassword">Password</label>
                </div>

                <div className="form-check mb-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="rememberPasswordCheck"
                  />
                  <label className="form-check-label" htmlFor="rememberPasswordCheck">
                    Remember password
                  </label>
                </div>
                
                <div className="d-grid">
                  <button
                    className="btn btn-primary btn-login text-uppercase fw-bold d-flex align-items-center justify-content-center"
                    type="submit"
                  >
                    <UserIcon style={{ width: '16px', height: '16px' }} className="me-2" aria-hidden="true" />
                    Sign in
                  </button>
                </div>

                <hr className="my-4" />
              </form>
              {message && <p className="text-center mt-3">{message}</p>} {/* Display feedback message */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
