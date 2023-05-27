import React, { useState } from "react";
import image1 from "../assets/282-2822006_registration-hospital-management-system-hd-png-download-removebg-preview.png";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
// import Joi from 'joi';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

const schema = z.object({
  email: z.string().email({ message: "Email is required" }),
  firstName: z.string().min(4),
  lastName: z.string().min(4),
  password: z.string().min(8),
  type: z.string(),
});

function Register() {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    ...form
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "https://healthcare-api.sofyrus.com/api/auth/register",
        data
      );
      console.log(response.data);

      if (
        response.data &&
        (response.status === 201 || response.status === 200)
      ) {
        console.log(response.data);
      
        toast.success("Otp sent successfully please check your email");
        navigate("/otp", { state: { email: data.email}});
      } else {
        setErrorMessage("Invalid data received from the server.");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        form.setError("email", { message: error.response.data.message });
      } else {
        setErrorMessage("An error occurred. Please try again.");
      }
    }
  };

  return (
    <main>
      <section class="section-login">
        <div class="section-main">
          <div class="section-login-1">
            <div class="section-login-1-main">
              {/* <h1 class="section-login-1-title">Gradie</h1> */}
              {/* <p class="section-login-1-text">Beautiful gradients in seconds.</p> */}
              {/* <div class="section-login-1-img">
                        <img src={image1} alt=""/>
                    </div> */}
            </div>
          </div>
          <div class="section-login-2">
            <div class="section-login-2-main">
              <h1 class="section-login-2-title">Create Account</h1>
              <form
                class="section-login-2-form"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div class="login-form-1">
                  <label for="input-email">Type</label>
                  <select
                    id="input-email"
                    className="select-input"
                    {...register("type", { required: true })}
                  >
                    <option value="doctor">Doctor</option>
                    <option value="hospital">Hospital</option>
                  </select>
                  {errors.type && <p className="error">type is required</p>}
                </div>
                <div class="login-form-1">
                  <label>Email</label>
                  <input
                    type="email"
                    id="input-email"
                    placeholder="john@example.com"
                    {...register("email", { required: true })}
                  />
                  {errors.email && (
                    <p className="error">{errors.email.message}</p>
                  )}
                </div>
                <div class="login-form-2">
                  <label for="input-name">Full Name</label>
                  <input
                    {...register("firstName", { required: true })}
                    type="text"
                    id="input-name"
                    placeholder="John Doe"
                  />
                  {errors.firstName && (
                    <p className="error">FirstName is required</p>
                  )}
                </div>
                <div class="login-form-2">
                  <label for="input-name">Last Name</label>
                  <input
                    {...register("lastName", { required: true })}
                    type="text"
                    id="input-name"
                    placeholder="khan"
                  />
                  {errors.lastName && (
                    <p className="error">LastName is required</p>
                  )}
                </div>
                <div class="login-form-3">
                  <label for="input-password">Password</label>
                  <input
                    {...register("password", { required: true })}
                    type="password"
                    id="input-password"
                    placeholder="At least 8 characters"
                  />

                  {errors.password && (
                    <p className="error">Password is required</p>
                  )}

                  {errorMessage && <div className="error-message">{}</div>}
                </div>
                <div class="login-form-4">
                  <input type="checkbox" id="input-checkbox" />
                  <p>
                    By creating an account, you agree to the{" "}
                    <a href="#">Terms & Conditions.</a>
                  </p>
                </div>
                <div class="login-form-submit-btn">
                  <button>Create an Account</button>
                </div>
                {/* <div class="login-form-5">
                  <p>
                    Already have an account? <a href="#">Sign In</a>
                  </p>
                </div> */}
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Register;
