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
              <h5 className="card-title text-center mb-5 fw-light fs-5">Home</h5>
             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
