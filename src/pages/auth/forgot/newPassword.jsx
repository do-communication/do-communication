import AuthLayout from "@/components/layouts/AuthLayout/AuthLayout";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { IoIosArrowBack } from "react-icons/io";
import { useState } from "react";
import Link from "next/link";
import { useAuth } from "../../../../context/AuthContext";
import Router from "next/dist/server/router";
const router = Router;

const NewPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { user, resetPassword } = useAuth();

  const handleNewPassword = async (e) => {
    e.preventDefault();
    try {
      await resetPassword(newPassword);
      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthLayout title="Enter verification code">
      <div className="flex flex-col gap-9 py-10">
        {/*password input */}
        <div className="group flex gap-2 rounded-3xl bg-white pl-5 pr-5 ring-blue-300 hover:ring-2 active:ring-2">
          <input
            onChange={(e) => setNewPassword(e.target.value)}
            value={newPassword}
            type={showPassword ? "text" : "password"}
            className="w-full rounded-3xl bg-white px-[52px] py-4 text-gray-600 outline-none"
            placeholder="Enter new password"
            size="lg"
          />
          {showPassword ? (
            <AiOutlineEye
              className="h-auto w-10 cursor-pointer pr-3 text-gray-600"
              onClick={() => setShowPassword(false)}
            />
          ) : (
            <AiOutlineEyeInvisible
              className="h-auto w-10 cursor-pointer pr-3 text-gray-600"
              onClick={() => setShowPassword(true)}
            />
          )}
        </div>
        {/*password input */}
        <div className="group flex gap-2 rounded-3xl bg-white pl-5 pr-5 ring-blue-300 hover:ring-2 active:ring-2">
          <input
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            type={showPassword ? "text" : "password"}
            className="w-full rounded-3xl bg-white px-[52px] py-4 text-gray-600 outline-none"
            placeholder="Confirm password"
            size="lg"
          />
          {showPassword ? (
            <AiOutlineEye
              className="h-auto w-10 cursor-pointer pr-3 text-gray-600"
              onClick={() => setShowPassword(false)}
            />
          ) : (
            <AiOutlineEyeInvisible
              className="h-auto w-10 cursor-pointer pr-3 text-gray-600"
              onClick={() => setShowPassword(true)}
            />
          )}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <button
          onClick={handleNewPassword}
          className="flex w-full items-center justify-center rounded-full bg-primary py-4 text-lg font-semibold shadow-sm shadow-black hover:brightness-95"
        >
          Send
        </button>
        <Link
          href="/auth/login"
          className="flex items-center justify-center gap-4 py-9"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
            <IoIosArrowBack className="h-auto w-10" />
          </div>
          <h1 className="vertical-align: bottom text-xl font-semibold">Back</h1>
        </Link>
      </div>
    </AuthLayout>
  );
};

export default NewPassword;
