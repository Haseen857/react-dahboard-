import logo from "./logo.svg";
import { BrowserRouter , Route , Routes} from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Register from "./pages/register";
import Login from "./pages/loginpage"
import Otp from "./pages/otp";
import Dashboard from "./dashboard/dashboard";

import Homepage from "./dashboard/homepage";



function App() {
  return (  
    
 <BrowserRouter>
    <Routes>
          <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register/>} />
          <Route path="/otp" element={<Otp />} />
          <Route path="/home" element={<Homepage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        
        </Routes>  




        <ToastContainer
        position="top-right"
        autoClose={500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
        </BrowserRouter> 

    // <div>
    //  {/* <Register/> */}
    // <Otp/>
   
    // </div>
  );
}

export default App;
