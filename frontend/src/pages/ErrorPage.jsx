import { Link } from "react-router-dom";
import { Footer } from "../components/Footer";

export const ErrorPage = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-[#e6e6e6] pb-3">
      <nav className="flex justify-between items-center h-20 w-full bg-white xl:px-20 lg:px-16 md:px-12 sm:px-8 px-4">
        <div className="logo-container flex justify-center items-center">
          <img
            className="h-20 w-20"
            src="src/assets/Images/Logo/VibeHive-logo-removebg.png"
            alt="VibeHive Logo"
          />
          <p className="text-3xl font-light text-[#000000]">VibeHive</p>
        </div>
        <div className="link-button flex justify-center items-center p-5 h-auto w-auto gap-6">
          <Link
            to="/accounts/signin"
            className="text-md text-white h-10 w-20 flex items-center justify-center bg-black rounded-lg hover:bg-transparent border-2 border-black hover:text-black transition duration-300 ease-in-out"
          >
            Signin
          </Link>
          <Link to="/accounts/signup" className="text-md text-[#000000]">
            Sign up
          </Link>
        </div>
      </nav>
      <div className="error-message-container h-full w-full flex flex-col justify-center items-center bg-[#e6e6e6] gap-6 px-5">
        <h3 className="text-xl text-center font-semibold text-[#000000]">
          Sorry, this page isn&apos;t available.
        </h3>
        <h3 className="text-lg text-center font-normal text-[#000000]">
          The link you followed may be broken, or the page may have been
          removed. <Link to="/" className="text-[#005cb4]">Go back to VibeHive.</Link>
        </h3>
      </div>
      <Footer />
    </div>
  );
};
