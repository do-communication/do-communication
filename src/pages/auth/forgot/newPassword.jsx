import AuthLayout from "@/components/layouts/AuthLayout/AuthLayout";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { IoIosArrowBack } from "react-icons/io";
import { useState } from "react";
import Link from "next/link";
import { useAuth } from "../../../../context/AuthContext";
import Router from "next/dist/server/router";
const router = Router

const NewPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { user, resetPassword } = useAuth()

  const handleNewPassword = async (e) =>{
    e.preventDefault()
    try {
      await resetPassword(newPassword)
      router.push("/login")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <AuthLayout title="Enter verification code">
      <div className="flex flex-col gap-9 py-10">
        {/*password input */}
        <div className="bg-white group flex rounded-3xl gap-2 hover:ring-2 active:ring-2 ring-blue-300 pr-5 pl-5">
          <input
            onChange={(e) => setNewPassword(e.target.value)}
            value={newPassword}
            type={showPassword ? "text" : "password"}
            className="bg-white text-gray-600 w-full rounded-3xl py-4 px-[52px] outline-none"
            placeholder="Enter new password"
            size="lg"
          />
          {showPassword ? (
            <AiOutlineEye
              className="cursor-pointer w-10 text-gray-600 pr-3 h-auto"
              onClick={() => setShowPassword(false)}
            />
          ) : (
            <AiOutlineEyeInvisible
              className="cursor-pointer w-10 text-gray-600 pr-3 h-auto"
              onClick={() => setShowPassword(true)}
            />
          )}
        </div>
        {/*password input */}
        <div className="bg-white group flex rounded-3xl gap-2 hover:ring-2 active:ring-2 ring-blue-300 pr-5 pl-5">
          <input
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            type={showPassword ? "text" : "password"}
            className="bg-white text-gray-600 w-full rounded-3xl py-4 px-[52px] outline-none"
            placeholder="Confirm password"
            size="lg"
          />
          {showPassword ? (
            <AiOutlineEye
              className="cursor-pointer w-10 text-gray-600 pr-3 h-auto"
              onClick={() => setShowPassword(false)}
            />
          ) : (
            < AiOutlineEyeInvisible
              className="cursor-pointer w-10 text-gray-600 pr-3 h-auto"
              onClick={() => setShowPassword(true)}
            />
          )}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <button onClick = {handleNewPassword} className="w-full text-lg font-semibold flex items-center justify-center bg-primary py-4 rounded-full shadow-sm shadow-black hover:brightness-95">
          Send
        </button>
        <Link
          href="/auth/login"
          className="flex gap-4 justify-center items-center py-9"
        >
          <div className="rounded-full bg-primary w-10 h-10 flex items-center justify-center">
            <IoIosArrowBack className="w-10 h-auto" />
          </div>
          <h1 className="text-xl font-semibold vertical-align: bottom">Back</h1>
        </Link>
      </div>
    </AuthLayout>
  );
};

export default NewPassword;
