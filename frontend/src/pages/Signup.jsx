import React from "react";
import axios from "axios";
import { toast } from "sonner";
import Carousel from "../components/Carousel.jsx";
import { Link, useNavigate } from "react-router-dom";

export const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    username: "",
    email: "",
    password: "",
  });

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    console.log(formData);
    try {
      const res = await axios.post(
        `http://localhost:8000/hive/signup`,
        formData,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        console.log(res.data.message);
        toast.success(res.data.message);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      console.log(error.response.data.message);
      toast.error(error.response.data.message);
    }
  }
  return (
    <div className="signup-container flex flex-col justify-center items-center h-auto w-full bg-[#e6e6e6] gap-10 py-10 overflow-y-auto overflow-x-auto">
      <div className="form-container flex flex-row items-center justify-center h-auto w-auto shadow-2xl">
        <div className="form-img-container hidden xl:block">
          <Carousel />
        </div>
        <form
          onSubmit={handleSubmit}
          className="signup-form flex flex-col items-center justify-center bg-white h-auto w-92 gap-4 p-10"
        >
          <div className="signup-header flex flex-row items-center justify-center h-16 w-full gap-2">
          <img className="h-20 w-20" src="/src/assets/Images/Logo/VibeHive-logo-removebg.png" alt="VibeHive Logo" />
            <p className="signup-title text-3xl font-light">VibeHive</p>
          </div>
          <span
            onClick={() => {
              toast.message("Work in progress", {
                description: "Estimated to be added in the future",
              });
            }}
            className="signup-google-button flex flex-row items-center justify-center gap-4 border border-gray-400 rounded-md h-12 w-full hover:bg-gray-100 cursor-pointer"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 17 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3.94815 7.99999C3.94815 7.48037 4.0344 6.98212 4.18853 6.51487L1.49228 4.45599C0.966776 5.52287 0.670776 6.72512 0.670776 7.99999C0.670776 9.27387 0.966526 10.4752 1.49115 11.5415L4.1859 9.47862C4.03328 9.01349 3.94815 8.51712 3.94815 7.99999Z"
                fill="#FBBC05"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.68218 3.27275C9.81106 3.27275 10.8307 3.67275 11.6318 4.32725L13.9623 2C12.5422 0.763625 10.7214 0 8.68218 0C5.51618 0 2.79518 1.8105 1.49231 4.456L4.18843 6.51487C4.80968 4.62912 6.58056 3.27275 8.68218 3.27275Z"
                fill="#EA4335"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.68219 12.7272C6.58069 12.7272 4.80981 11.3709 4.18856 9.48512L1.49231 11.5436C2.79518 14.1895 5.51619 16 8.68219 16C10.6362 16 12.5018 15.3061 13.9019 14.0061L11.3427 12.0276C10.6206 12.4825 9.71119 12.7272 8.68219 12.7272Z"
                fill="#34A853"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16.3293 8C16.3293 7.52725 16.2564 7.01813 16.1471 6.5455H8.68213V9.63638H12.9791C12.7643 10.6903 12.1795 11.5004 11.3426 12.0276L13.9019 14.0061C15.3726 12.6411 16.3293 10.6076 16.3293 8Z"
                fill="#4285F4"
              />
            </svg>
            <p className="signup-google-button-text text-sm font-semibold">
              Sign up with Google (Coming Soon)
            </p>
          </span>
          <div className="signup-or flex items-center m-2 p-2 w-full gap-2">
            <hr className=" flex-grow border-t border-gray-500" />
            <span className="font-bold text-black">OR</span>
            <hr className="flex-grow border-t border-gray-500" />
          </div>
          <input
            className="signup-input username w-full border border-gray-500 rounded-md p-3"
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
          />
          <input
            className="signup-input email w-full border border-gray-500 rounded-md p-3"
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            className="signup-input password w-full border border-gray-500 rounded-md p-3"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
          />
          <div className="signup-checkbox flex items-center gap-2 w-full">
            <input type="checkbox" className="w-4 h-4" />
            <p className="text-sm">I agree to the Terms and Privacy Policy.</p>
          </div>
          <button
            type="submit"
            className="signup-button w-full bg-black text-white border-2 border-black-500 rounded-md mt-4 p-3 hover:bg-white hover:text-black transition duration-200 cursor-pointer"
          >
            Sign up
          </button>
          <div className="signup-or flex items-center m-2 p-2 w-full gap-2">
            <hr className=" flex-grow border-t border-gray-500" />
          </div>
          <div className="signup-checkbox flex justify-center items-center gap-2 w-full">
            <p className="text-md">Already have an account?</p>
            <Link to="/accounts/signin" className="text-blue-600 text-md">
              Log in
            </Link>
          </div>
        </form>
      </div>

      <div className="download-app-container flex flex-col justify-center items-center gap-2 w-full">
        <p className="text-md">Get the app.</p>
        <div className="app-img-container flex justify-center items-center gap-3">
          <a href="#" className="text-center">
            <img
              className="w-36 h-12"
              src="https://static.cdninstagram.com/rsrc.php/v4/yz/r/c5Rp7Ym-Klz.png"
              alt="Google Play"
            />
            <p>Coming Soon</p>
          </a>
          <a href="#" className="text-center">
            <img
              className="w-32 h-12"
              src="https://static.cdninstagram.com/rsrc.php/v4/yu/r/EHY6QnZYdNX.png"
              alt="Apple Store"
            />
            <p>Coming Soon</p>
          </a>
        </div>
      </div>
      <div className="footer-container flex flex-col justify-center items-center gap-2 w-full">
        <div className="links-container flex flex-wrap justify-center items-center gap-3 text-sm">
          <a href="#">About</a>
          <a href="#">Help</a>
          <a href="#">Blog</a>
          <a href="#">Privacy</a>
          <a href="#">Terms & Conditions</a>
        </div>
        <p className="text-sm">© 2025 VibeHive Inc.</p>
      </div>
    </div>
  );
};
