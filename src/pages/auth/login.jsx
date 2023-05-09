import AuthLayout from "@/components/layouts/AuthLayout/AuthLayout";
import { MdOutlineEmail } from "react-icons/md";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import Router from "next/router";
import { auth } from "../../../config/firebase";
const router = Router

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { user, logIn, signInGoogle, provider } = useAuth()
  const [data, setData] = useState({
    email: '',
    password: ''
  })

  const handleLogin = async (e) => {
    e.preventDefault()
    // const form = document.getElementById('loginForm')
    try {
      await logIn(data.email, data.password)
      document.querySelector('.error-txt').innerHtml = ""
      router.push('/')
    } catch (err) {
      // if (err.message == "(auth/wrong-password)."){
      //   setData({
      //     ...data,
      //     password: ''
      //   })
      //   document.getElementById("password").value={};
      //   document.getElementById("password").placeholder="Your Password is incorrect";
      //   // document.getElementById("password").value
      // }else{
      // const form = document.getElementById('loginForm')
      // document.querySelector('.error-txt').innerHtml = err.code
      console.log(err)

      // }
    }
    console.log(data)
  }

  const handleLoginGoogle = async (e) => {
    e.preventDefault()
    // const form = document.getElementById('loginForm')
    try {
      await signInGoogle(auth, provider)
      // form.querySelector('.error-txt').innerHtml = ""
      router.push('/')
      console.log("done successfully");
    } catch (err) {
      // if (err.message == "auth/wrong-password"){
      //   setData({
      //     ...data,
      //     password: ''
      //   })
      //   document.getElementById("password").value={};
      //   document.getElementById("password").placeholder="Your Password is incorrect";
      //   // document.getElementById("password").value
      // }else{
      //   console.log(err)
      // }
      // console.log(err)
      // const form = document.getElementById('loginForm')
      // form.querySelector('.error-txt').innerHtml = err.message
      console.log('in error');
      console.log(err);
    }
    console.log(data)
  }

  return (
    <AuthLayout title="Login">
      <div className="flex flex-col gap-6">
        {/* email input */}
        <div className="bg-white group flex rounded-3xl gap-2 hover:ring-2 active:ring-2 ring-blue-300 pl-5">
          <MdOutlineEmail className="w-10 text-gray-600 pl-2 h-auto" />
          <input
            onChange={(e) => setData({
              ...data,
              email: e.target.value
            })
            }
            value={data.email}
            type="email"
            className="bg-white text-gray-600 w-full rounded-3xl py-4 px-2 outline-none"
            placeholder="Enter your email"
            size="lg"
          />
        </div>

        {/*password input */}
        <div className="bg-white group flex rounded-3xl gap-2 hover:ring-2 active:ring-2 ring-blue-300 pr-5 pl-5">
          <input
            onChange={(e) => setData({
              ...data,
              password: e.target.value
            })
            }
            value={data.password}
            type={showPassword ? "text" : "password"}
            className="bg-white text-gray-600 w-full rounded-3xl py-4 px-[52px] outline-none"
            id="password"
            placeholder="Enter your password"
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
        <Link
          href="forgot"
          className="self-end pr-3 hover:underline text-gray-700"
        >
          Forgot Password?
        </Link>
      </div>
      <div className="flex flex-col gap-4">
        <button onClick={handleLogin} className="w-full text-lg font-semibold flex items-center justify-center bg-primary py-4 rounded-full shadow-sm shadow-black hover:brightness-95">
          Sign in
        </button>
        <h1 className="error-txt text-red-700"></h1>
        <fieldset class="border-t border-black">
          <legend class="mx-auto px-4 text-black text-lg">or</legend>
        </fieldset>
        <button onClick={handleLoginGoogle} className="w-full text-lg font-semibold flex items-center justify-center bg-primary py-4 rounded-full shadow-sm shadow-black hover:brightness-95">
          Sign in with &nbsp; <FcGoogle className="h-auto w-6" />
        </button>
      </div>
    </AuthLayout>
  );
};

export default Login;
