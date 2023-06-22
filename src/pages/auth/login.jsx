import AuthLayout from "@/components/layouts/AuthLayout/AuthLayout";
import { MdLockOutline, MdOutlineEmail } from "react-icons/md";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import Router from "next/router";
import { auth } from "../../../config/firebase";
const router = Router;

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { user, logIn, signInGoogle, provider } = useAuth();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const passwordInput = document.getElementById("passwordInput");
  const emailInput = document.getElementById("emailInput");
  const emaildiv = document.getElementById("emaildiv");
  const passworddiv = document.getElementById("passworddiv");
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const cred = await logIn(data.email, data.password);
      if (
        auth.currentUser.displayName[
          auth.currentUser.displayName.length - 1
        ] === "$"
      ) {
        router.push("/admin");
      } else {
        router.push("/user");
      }
    } catch (err) {
      if (err.message == "Firebase: Error (auth/wrong-password).") {
        passwordInput.value = "";
        passwordInput.placeholder = "The password is incorrect";
        passworddiv.classList.remove("ring-blue-300");
        passworddiv.classList.add("ring-red-600");
        passworddiv.classList.add("ring-2");
      } else {
        emailInput.value = "";
        emailInput.placeholder = "The email you entered is incorrect";
        emaildiv.classList.remove("ring-blue-300");
        emaildiv.classList.add("ring-red-600");
        emaildiv.classList.add("ring-2");
      }
      console.log(err.message);
    }
  };
  const handleEmailChange = (e) => {
    e.preventDefault();

    setData({
      ...data,
      email: e.target.value,
    });

    if (emaildiv && emaildiv.classList.contains("ring-red-600")) {
      emaildiv.classList.remove("ring-red-600");
      emaildiv.classList.remove("ring-2");
      emaildiv.classList.add("ring-blue-300");
      emailInput.placeholder = "Enter your email";
    }
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    setData({
      ...data,
      password: e.target.value,
    });

    if (passworddiv && passworddiv.classList.contains("ring-red-600")) {
      passworddiv.classList.remove("ring-red-600");
      passworddiv.classList.remove("ring-2");
      passworddiv.classList.add("ring-blue-300");
      passwordInput.placeholder = "Enter Your Password";
    }
  };
  const handleLoginGoogle = async (e) => {
    e.preventDefault();
    try {
      const cred = await signInGoogle(auth, provider);
      router.push("/admin");
    } catch (err) {
      if (err.message == "Firebase: Error (auth/wrong-password).") {
        passwordInput.value = "";
        passwordInput.placeholder = "The password is incorrect";
        passworddiv.classList.remove("ring-blue-300");
        passworddiv.classList.add("ring-red-600");
        passworddiv.classList.add("ring-2");
      } else {
        emailInput.value = "";
        emailInput.placeholder = "The email you entered is incorrect";
        emaildiv.classList.remove("ring-blue-300");
        emaildiv.classList.add("ring-red-600");
        emaildiv.classList.add("ring-2");
      }
    }
    console.log(data);
  };

  return (
    <AuthLayout title="Sign In">
      <div className="flex flex-col gap-6">
        {/* email input */}
        <div
          id="emaildiv"
          className="group flex gap-2 rounded-3xl bg-white pl-5 ring-blue-300 hover:ring-2 active:ring-2"
        >
          <MdOutlineEmail className="h-auto w-10 pl-2 text-gray-600" />
          <input
            id="emailInput"
            onChange={handleEmailChange}
            value={data.email}
            type="email"
            className="w-full rounded-3xl bg-white px-2 py-4 text-gray-600 outline-none"
            placeholder="Enter your email"
            size="lg"
          />
        </div>

        {/*password input */}
        <div
          id="passworddiv"
          className="group flex gap-2 rounded-3xl bg-white pl-5 pr-5 ring-blue-300 hover:ring-2 active:ring-2"
        >
          <MdLockOutline className="h-auto w-10 pl-2 text-gray-600" />
          <input
            onChange={handlePasswordChange}
            value={data.password}
            type={showPassword ? "text" : "password"}
            className="w-full rounded-3xl bg-white px-[10px] py-4 text-gray-600 outline-none"
            id="passwordInput"
            placeholder="Enter your password"
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
        <Link
          href="forgot"
          className="self-end pr-3 text-gray-700 hover:underline"
        >
          Forgot Password?
        </Link>
      </div>
      <div className="flex flex-col gap-4">
        <button
          onClick={handleLogin}
          className="flex w-full items-center justify-center rounded-full bg-primary py-4 text-lg font-semibold text-white shadow-sm shadow-black hover:brightness-95"
        >
          Sign in
        </button>
        <h1 className="error-txt text-red-700"></h1>
        <fieldset class="border-t border-black">
          <legend class="mx-auto px-4 text-lg text-black">or</legend>
        </fieldset>
        <button
          onClick={handleLoginGoogle}
          className="flex w-full items-center justify-center rounded-full bg-primary py-4 text-lg font-semibold text-white shadow-sm shadow-black hover:brightness-95"
        >
          Sign in with &nbsp; <FcGoogle className="h-auto w-6" />
        </button>
      </div>
    </AuthLayout>
  );
};

export default Login;
