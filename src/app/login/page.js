"use client"; // Add this line at the top
import { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import Image from "next/image";
import { UserIcon } from '@heroicons/react/24/outline';
import Swal from 'sweetalert2'; // Import SweetAlert2
import styles from "./page.module.css";

export default function Login() {
  const router = useRouter(); // Initialize useRouter
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [sentOtp, setSentOtp] = useState(null); // State to store the sent OTP
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    alert(otp);
    if (otp == sentOtp) {
      // Redirect to home if OTP matches
     
      router.push('/home');
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'OTP does not match. Please try again.',
      });
    }
  };

  const sendCode = async () => {
    if (!email) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please enter your email address.',
        });
        return; // Exit the function if email is not provided
    }

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
            setSentOtp(data.code); // Store the sent OTP in state
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: data.message || 'Code sent successfully!',
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: data.error || 'An error occurred. Please try again.',
            });
        }
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Error sending code. Please try again.',
        }); // Handle fetch error
    }
};

// This will work only if the variable is prefixed with NEXT_PUBLIC_
console.log("NEXT_PUBLIC_API_KEY:", process.env.NEXT_PUBLIC_TEST_VAR);


  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div className="card border-0 shadow rounded-3 my-5">
            <div className="card-body p-4 p-sm-5">
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
                    type="button" // Send button
                    className="btn btn-primary"
                    style={{ width: '40%' }}
                    onClick={sendCode} // Call sendCode function
                  >
                    Send
                  </button>
                </div>

                <div className="form-floating mb-3">
                  <input
                    type="text" // Change type to text for OTP
                    className="form-control"
                    id="floatingOtp"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                    maxLength={4} // Limit input to 4 characters
                    pattern="[0-9]{4}" // Regex pattern to accept only 4 digits
                  />
                  <label htmlFor="floatingOtp">OTP CODE</label>
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
              {message && <p className="text-center mt-3">{message}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
