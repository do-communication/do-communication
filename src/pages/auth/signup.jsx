import {MdOutlineEmail} from "react-icons/md"
import { MdOutlinePersonOutline } from "react-icons/md";
import {HiOutlineBuildingOffice2} from "react-icons/hi2"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { useState } from "react";
import AuthLayout from "@/components/layouts/AuthLayout/AuthLayout";
import { useAuth } from "../../../context/AuthContext";
import Router from 'next/router'
const router = Router
const Signup = () => {
  const { user, signUp } = useAuth()
  const [showPassword, setShowPassword] = useState(false);

  const [data, setData] = useState({
    name:'',
    companyName:'',
    email: '',
    password: ''
  })

  const handleSignUp = async (e) =>{
    e.preventDefault()
    try{
      await signUp(data.email, data.password) 
      router.push('/')    
    }catch(err){
      console.log(err)
    }
    console.log(data)
  }

  return <AuthLayout title="Sign up">
      <div className="flex flex-col gap-4">
        {/* name input */}
        <div className="bg-white group flex rounded-3xl gap-2 hover:ring-2 active:ring-2 ring-blue-300 pl-5">
          <MdOutlinePersonOutline className="w-10 text-gray-600 pl-2 h-auto" />
          <input 
            onChange={(e) => setData({
              ...data,
              name: e.target.value
            })}
            value={data.name}
            type="text"
            className="bg-white text-gray-600 w-full rounded-3xl py-4 px-2 outline-none"
            placeholder="Enter your name"
            size="lg"
          />
        </div>
        {/* company name input */}
           <div className="bg-white group flex rounded-3xl gap-2 hover:ring-2 active:ring-2 ring-blue-300 pl-5">
          <HiOutlineBuildingOffice2 className="w-10 text-gray-600 pl-2 h-auto" />
          <input
            onChange={(e) => setData({
              ...data,
              companyName: e.target.value
            })}
            value={data.companyName}
            type="text"
            className="bg-white text-gray-600 w-full rounded-3xl py-4 px-2 outline-none"
            placeholder="Enter your company name"
            size="lg"
          />
        </div>
        {/* email input */}
        <div className="bg-white group flex rounded-3xl gap-2 hover:ring-2 active:ring-2 ring-blue-300 pl-5">
          <MdOutlineEmail className="w-10 text-gray-600 pl-2 h-auto" />
          <input
            onChange={(e) => setData({
              ...data,
              email: e.target.value
            })}
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
            })}
            value={data.password}
            type={showPassword ? "text" : "password"}
            className="bg-white text-gray-600 w-full rounded-3xl py-4 px-[52px] outline-none"
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
      </div>
      <div className="flex flex-col gap-3">
        <button onClick={handleSignUp} className="w-full text-lg font-semibold flex items-center justify-center bg-primary py-3 rounded-full shadow-sm shadow-black hover:brightness-95">
          Sign in
        </button>
        <fieldset class="border-t border-black">
          <legend class="mx-auto px-4 text-black text-lg">or</legend>
        </fieldset>
        <button className="w-full text-lg font-semibold flex items-center justify-center bg-primary py-3 rounded-full shadow-sm shadow-black hover:brightness-95">
          Sign in with &nbsp; <FcGoogle className="h-auto w-6" />
        </button>
      </div>
  </AuthLayout>;
};

export default Signup;
