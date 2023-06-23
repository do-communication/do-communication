import AuthLayout from "@/components/layouts/AuthLayout/AuthLayout";
import { MdOutlineEmail } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";
import Link from "next/link";
import { useAuth } from "../../../../context/AuthContext";
import { useState } from "react";
import Router from "next/router";

const router = Router;

const Forgot = () => {
  const [email, setEmail] = useState("");
  const { user, forgotPassword } = useAuth();

  const handleForgot = async (e) => {
    e.preventDefault();
    try {
      await forgotPassword(email);
      router.push("/auth/forgot/newPassword");
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <AuthLayout title="Forgot Password">
      <div className="flex flex-col gap-9 py-10">
        {/* email input */}
        <div className="group flex gap-2 rounded-3xl bg-white pl-5 ring-blue-300 hover:ring-2 active:ring-2">
          <MdOutlineEmail className="h-auto w-10 pl-2 text-gray-600" />
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            className="w-full rounded-3xl bg-white px-2 py-4 text-gray-600 outline-none"
            placeholder="Enter your email"
            size="lg"
          />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <button
          onClick={handleForgot}
          className="flex w-full items-center justify-center rounded-full bg-primary py-4 text-lg font-semibold shadow-sm shadow-black hover:brightness-95"
        >
          Send
        </button>
        <Link
          href="/auth/login"
          className="flex items-center justify-center gap-4 py-9"
        >
          <div className="flex  h-7 w-7 items-center justify-center rounded-full bg-primary">
            <IoIosArrowBack className="h-auto w-8 text-white" />
          </div>
          <h4 className="vertical-align: bottom translate-x-0 text-lg font-semibold text-gray-400 hover:text-black">
            Back
          </h4>
        </Link>
      </div>
    </AuthLayout>
  );
};

export default Forgot;
