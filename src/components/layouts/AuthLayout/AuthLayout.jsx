import AuthHeader from "./AuthHeader";
import { MdOutlinePersonOutline } from "react-icons/md";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import Link from "next/link";
const AuthLayout = ({ children }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative w-screen min-h-screen">
      <img
        src="/images/bg.svg"
        alt="Background Image"
        className="absolute top-0 z-0 w-full"
      />
      <main className="relative z-10 min-h-screen">
        <AuthHeader />
        <div className="flex lg:px-20 px-5 gap-10">
          <div className="md:flex pt-20 pl-10 w-5/12 items-center justify-center hidden">
            <img src="/images/office.svg" alt="office logo" />
          </div>
          <div class="w-full md:w-7/12 flex justify-center">
            <div className="bg-black bg-opacity-5 shadow-md shadow-gray-800 w-full lg:w-2/3 flex flex-col gap-8 px-5 py-8 rounded-2xl">
              <h2 className="text-3xl font-semibold text-center">Login</h2>
              <div className="flex flex-col gap-6">
                {/* email input */}
                <div className="bg-white group flex rounded-3xl gap-2 hover:ring-2 active:ring-2 ring-blue-300">
                  <MdOutlinePersonOutline className="w-10 text-gray-600 pl-2 h-auto" />
                  <input
                    type="email"
                    className="bg-white text-gray-600 w-full rounded-3xl py-4 px-2 outline-none"
                    placeholder="Enter your email"
                    size="lg"
                  />
                </div>

                {/*password input */}
                <div className="bg-white group flex rounded-3xl gap-2 hover:ring-2 active:ring-2 ring-blue-300">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="bg-white text-gray-600 w-full rounded-3xl py-4 px-[52px] outline-none"
                    placeholder="Enter your password"
                    size="lg"
                  />
                  {showPassword ? (
                    <AiOutlineEyeInvisible
                      className="cursor-pointer w-10 text-gray-600 pr-3 h-auto"
                      onClick={() => setShowPassword(false)}
                    />
                  ) : (
                    <AiOutlineEye
                      className="cursor-pointer w-10 text-gray-600 pr-3 h-auto"
                      onClick={() => setShowPassword(true)}
                    />
                  )}
                </div>
                <Link
                  href="auth/forget"
                  className="self-end pr-3 hover:underline text-gray-700"
                >
                  Forget Password?
                </Link>
              </div>
              <div className="flex flex-col gap-4">
                <button className="w-full text-lg font-semibold flex items-center justify-center bg-primary py-4 rounded-full shadow-sm shadow-black hover:brightness-95">
                  Sign in
                </button>
                <fieldset class="border-t border-black">
                  <legend class="mx-auto px-4 text-black text-lg">or</legend>
                </fieldset>
                <button className="w-full text-lg font-semibold flex items-center justify-center bg-primary py-4 rounded-full shadow-sm shadow-black hover:brightness-95">
                  Sign in with &nbsp; <FcGoogle className="h-auto w-6" />
                </button>
              </div>
            </div>

            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AuthLayout;
