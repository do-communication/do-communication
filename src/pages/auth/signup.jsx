import { MdLockOutline, MdOutlineEmail } from "react-icons/md";
import { MdOutlinePersonOutline } from "react-icons/md";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useState } from "react";
import AuthLayout from "@/components/layouts/AuthLayout/AuthLayout";
import { useAuth } from "../../../context/AuthContext";
import Router from "next/router";
import { db } from "../../../context/DbContext";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import { auth } from "../../../config/firebase";
// import { collection } from "../config/firebase";
const router = Router;
const Signup = () => {
  const { user, signUp } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [data, setData] = useState({
    name: "",
    companyName: "",
    email: "",
    password: "",
  });
  const emailSignUp = document.getElementById("emailSignUp");
  const passwordSignUp = document.getElementById("passwordSignUp");
  const divemail = document.getElementById("divemail");
  const divpassword = document.getElementById("divpassword");
  const companyInput = document.getElementById("companyInput");
  const nameInput = document.getElementById("nameInput");
  const namediv = document.getElementById("namediv");
  const companydiv = document.getElementById("companydiv");

  const handleEmailChange = (e) => {
    e.preventDefault();
    setData({
      ...data,
      email: e.target.value,
    });
    if (divemail && divemail.classList.contains("ring-red-600")) {
      divemail.classList.remove("ring-red-600");
      divemail.classList.remove("ring-2");
      divemail.classList.add("ring-blue-300");
      emailSignUp.placeholder = "Enter your email";
    }
  };
  const handlePasswordChange = (e) => {
    e.preventDefault();

    setData({
      ...data,
      password: e.target.value,
    });

    if (divpassword && divpassword.classList.contains("ring-red-600")) {
      divpassword.classList.remove("ring-red-600");
      divpassword.classList.remove("ring-2");
      divpassword.classList.add("ring-blue-300");
      passwordSignUp.placeholder = "Enter Your Password";
    }
  };
  const handleNameChange = (e) => {
    e.preventDefault();
    setData({
      ...data,
      name: e.target.value,
    });

    if (namediv && namediv.classList.contains("ring-red-600")) {
      namediv.classList.remove("ring-red-600");
      namediv.classList.remove("ring-2");
      namediv.classList.add("ring-blue-300");
      nameInput.placeholder = "Enter Your Name";
    }
  };
  const handleComapnyChange = (e) => {
    e.preventDefault();
    setData({
      ...data,
      companyName: e.target.value,
    });

    if (companydiv && companydiv.classList.contains("ring-red-600")) {
      companydiv.classList.remove("ring-red-600");
      companydiv.classList.remove("ring-2");
      companydiv.classList.add("ring-blue-300");
      companyInput.placeholder = "Enter Your company name";
    }
  };
  const handleSignUp = async (e) => {
    e.preventDefault();
    if (namediv && nameInput.value == "") {
      nameInput.placeholder = "Your name is required";
      namediv.classList.remove("ring-blue-300");
      namediv.classList.add("ring-red-600");
      namediv.classList.add("ring-2");
    }
    if (companydiv && companyInput.value == "") {
      companyInput.placeholder = "Your company name is required";
      companydiv.classList.remove("ring-blue-300");
      companydiv.classList.add("ring-red-600");
      companydiv.classList.add("ring-2");
    }
    if (divemail && emailSignUp.value == "") {
      emailSignUp.placeholder = "Your email is required";
      divemail.classList.remove("ring-blue-300");
      divemail.classList.add("ring-red-600");
      divemail.classList.add("ring-2");
    }
    if (divpassword && passwordSignUp.value == "") {
      passwordSignUp.placeholder = "Password is required";
      divpassword.classList.remove("ring-blue-300");
      divpassword.classList.add("ring-red-600");
      divpassword.classList.add("ring-2");
    }
    if (
      passwordSignUp.value != "" &&
      emailSignUp.value != "" &&
      nameInput.value != "" &&
      companyInput.value != ""
    ) {
      try {
        signUp(data.email, data.password).then(async (cred) => {
          try {
            await setDoc(doc(db, "KalCompany", "Company"), {
              companyName: data.companyName,
              email: data.email,
            });
            await setDoc(
              doc(db, "KalCompany", "Users", "Admin", cred.user.uid),
              {
                Name: data.name,
                CompanyName: data.companyName,
                Email: data.email,
                ProfilePic: "",
                PhoneNumber: "",
              }
            );

            await updateProfile(auth.currentUser, {
              displayName: data.name + "$",
              photoURL: data.password,
            });
            router.push("/admin");
          } catch (errrr) {
            console.log(errrr);
          }
        });
      } catch (err) {
        if (
          err.message ==
          "Firebase: Password should be at least 6 characters (auth/weak-password)."
        ) {
          passwordSignUp.value = "";
          passwordSignUp.placeholder = "Password must be at least 6 characters";
          divpassword.classList.remove("ring-blue-300");
          divpassword.classList.add("ring-red-600");
          divpassword.classList.add("ring-2");
        } else if (
          err.message == "Firebase: Error (auth/email-already-in-use)."
        ) {
          if (emailSignUp) {
            emailSignUp.value = "";
          }
          emailSignUp.placeholder = "Email already in use";
          divemail.classList.remove("ring-blue-300");
          divemail.classList.add("ring-red-600");
          divemail.classList.add("ring-2");
        } else {
          if (emailSignUp) {
            emailSignUp.value = "";
          }
          emailSignUp.placeholder = "The email is invalid";
          divemail.classList.remove("ring-blue-300");
          divemail.classList.add("ring-red-600");
          divemail.classList.add("ring-2");
        }
        console.log(err.message);
      }
      console.log(data);
    }
  };

  return (
    <AuthLayout title="Sign up">
      <div className="flex flex-col gap-4">
        {/* name input */}
        <div
          id="namediv"
          className="group flex gap-2 rounded-3xl bg-white pl-5 ring-blue-300 hover:ring-2 active:ring-2"
        >
          <MdOutlinePersonOutline className="h-auto w-10 pl-2 text-gray-600" />
          <input
            onChange={handleNameChange}
            id="nameInput"
            value={data.name}
            type="text"
            className="w-full rounded-3xl bg-white px-2 py-4 text-gray-600 outline-none"
            placeholder="Enter your name"
            size="lg"
          />
        </div>
        {/* company name input */}
        <div
          id="companydiv"
          className="group flex gap-2 rounded-3xl bg-white pl-5 ring-blue-300 hover:ring-2 active:ring-2"
        >
          <HiOutlineBuildingOffice2 className="h-auto w-10 pl-2 text-gray-600" />
          <input
            onChange={handleComapnyChange}
            value={data.companyName}
            id="companyInput"
            type="text"
            className="w-full rounded-3xl bg-white px-2 py-4 text-gray-600 outline-none"
            placeholder="Enter your company name"
            size="lg"
          />
        </div>
        {/* email input */}
        <div
          id="divemail"
          className="group flex gap-2 rounded-3xl bg-white pl-5 ring-blue-300 hover:ring-2 active:ring-2"
        >
          <MdOutlineEmail className="h-auto w-10 pl-2 text-gray-600" />
          <input
            onChange={handleEmailChange}
            id="emailSignUp"
            value={data.email}
            type="email"
            className="w-full rounded-3xl bg-white px-2 py-4 text-gray-600 outline-none"
            placeholder="Enter your email"
            size="lg"
          />
        </div>

        {/*password input */}
        <div
          id="divpassword"
          className="group flex gap-2 rounded-3xl bg-white pl-5 pr-5 ring-blue-300 hover:ring-2 active:ring-2"
        >
          <MdLockOutline className="h-auto w-10 pl-2 text-gray-600" />
          <input
            onChange={handlePasswordChange}
            id="passwordSignUp"
            value={data.password}
            type={showPassword ? "text" : "password"}
            className="w-full rounded-3xl bg-white px-[10px] py-4 text-gray-600 outline-none"
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
        <div className="group flex gap-2 rounded-3xl bg-white pl-5 pr-5 ring-blue-300 hover:ring-2 active:ring-2">
          <MdLockOutline className="h-auto w-10 pl-2 text-gray-600" />
          <input
            type={showConfirmPassword ? "text" : "password"}
            className="w-full rounded-3xl bg-white px-[10px] py-4 text-gray-600 outline-none"
            placeholder="Confirm your password"
            size="lg"
          />
          {showConfirmPassword ? (
            <AiOutlineEye
              className="h-auto w-10 cursor-pointer pr-3 text-gray-600"
              onClick={() => setShowConfirmPassword(false)}
            />
          ) : (
            <AiOutlineEyeInvisible
              className="h-auto w-10 cursor-pointer pr-3 text-gray-600"
              onClick={() => setShowConfirmPassword(true)}
            />
          )}
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <button
          onClick={handleSignUp}
          className="flex w-full items-center justify-center rounded-full bg-primary py-3 text-lg font-semibold text-white shadow-sm shadow-black hover:brightness-95"
        >
          Sign Up
        </button>
      </div>
    </AuthLayout>
  );
};

export default Signup;
