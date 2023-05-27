import React, { useState } from "react";
import image1 from "../assets/282-2822006_registration-hospital-management-system-hd-png-download-removebg-preview.png";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import { useLocation ,useNavigate } from "react-router-dom";


// const schema = z.object({
//   email: z.string().email({ message: "Email is required" }),
//   firstName: z.string().min(4),
//   lastName: z.string().min(4),
//   password: z.string().min(8),
//   type: z.string(),
// });

function Otp () {
//   const [errorMessage, setErrorMessage] = useState("");
const {state} = useLocation();
const { email } = state;
const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    ...form
  } = useForm({
    // resolver: zodResolver(schema),
  });

  const onSubmits = async (data) => {  
    
      try {
          data = {...data, email:email}
          console.log(data);
          console.log("GJHGJFJGFJGFJGFGJFFJGDHTDHD",data)
          debugger
      const response = await axios.post( 
        
        "https://healthcare-api.sofyrus.com/api/auth/token/verifyUser",
        data
      );
    
      console.log(response.data);
      
      if ( 
        
        response.data &&
        (response.status === 201 || response.status === 200) ) {
        toast.success("OTP successfully verify ");
        localStorage.setItem("tokenData", JSON.stringify(response.data));
        navigate("/home");

      } 
     
    } catch (error) {
    console.log(error)
      }
    
  };

  return (
    <main>
      <section class="section-login">
        <div class="section-main">
          <div class="section-login-1">
            <div class="section-login-1-main">
           
            </div>
          </div>
          <div class="section-login-2">
            <div class="section-login-2-main">
              <h1 class="section-login-2-title">Otp</h1>
              <form
                class="section-login-2-form"
                onSubmit={handleSubmit(onSubmits)}
              > 
            
                <div class="login-form-2">
                  <label for="input-name">OTP</label>
                  <input
                    {...register("token")}
                    type="text"
                    id="input-name"
                    placeholder="John Doe"
                  />
                  
                </div>
               
               
                <div class="login-form-4">
                  <input type="checkbox" id="input-checkbox" />
                  <p>
                    By creating an account, you agree to the{" "}
                    <a href="#">Terms & Conditions.</a>
                  </p>
                </div>
                <div class="login-form-submit-btn">
                  <button>Verify OTP</button>
                </div>
                
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Otp;
