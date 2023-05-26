import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
const AuthHeader = () => {
  const [showHeader, setShowHeader] = useState(false);
  const [loginButtonStyle, setLoginButtonStyle] = useState("");
  const [signupButtonStyle, setSignupButtonStyle] = useState("");
  const [menuHoverStyle, setMenuHoverStyle] = useState("");

  const router = useRouter();
  //change the  sign up button style
  useEffect(() => {
    const currentPath = router.asPath;

    if (currentPath === "/auth/signup") {
      setSignupButtonStyle(
        "w-full text-white px-6 py-2  font-semibold flex items-center justify-center bg-primary  rounded-full shadow-sm shadow-black hover:brightness-95"
      );
      setLoginButtonStyle(
        "w-full text-black px-6 py-2  font-semibold flex items-center justify-center  rounded-full hover:text-gray-700"
      );
      setMenuHoverStyle(
        "md:p-4 py-2 block hover:text-white"
      );
    } else if (currentPath === "/auth/login"){
      setSignupButtonStyle(
        "w-full text-black px-6 py-2  font-semibold flex items-center justify-center  rounded-full hover:text-gray-700"
      );
      setLoginButtonStyle(
        "w-full text-white px-6 py-2  font-semibold flex items-center justify-center bg-primary  rounded-full shadow-sm shadow-black hover:brightness-95"
      );
      setMenuHoverStyle(
        "md:p-4 py-2 block hover:text-white" 
      );
    } else {
      setSignupButtonStyle(
        "w-full text-black px-6 py-2  font-semibold flex items-center justify-center  rounded-full hover:text-gray-700"
      );
      setLoginButtonStyle(
        "w-full text-black px-6 py-2  font-semibold flex items-center justify-center  rounded-full hover:text-gray-700"
      );
      setMenuHoverStyle(
        "md:p-4 py-2 block hover:underline"
      );
    }
  }, [router]);
  return (
    <header className="mb-4">
      <nav
        className="
         flex flex-wrap
         items-center
         justify-between
         w-full
         py-8
         md:py-5
         md:px-20
         px-6
         text-lg text-gray-700
       "
      >
        <div>
          <Link href="/">
            <img src="/images/logo.png" alt="logo" className="lg:w-24  w-20" />
          </Link>
        </div>

        {/* menu bar for mobile */}
        <AiOutlineMenu
          className="h-auto w-8 cursor-pointer md:hidden block"
          onClick={() => setShowHeader(!showHeader)}
        />

        <div
          className={`${
            showHeader ? "visible" : "hidden"
          } w-full md:flex md:items-center md:w-auto`}
        >
          <ul
            className="
             pt-4
             text-lg text-gray-800
             md:flex
             md:justify-between 
             md:pt-0"
          >
            <li>
              <Link className={menuHoverStyle} href="/#">
                Home
              </Link>
            </li>
            <li>
              <Link
                className={menuHoverStyle}
                href="/#about"
              >
                About us
              </Link>
            </li>
            <li>
              <Link
                className={menuHoverStyle}
                href="/#contact"
              >
                Contact us
              </Link>
            </li>
          </ul>
        </div>
        <div
          className={`${
            showHeader ? "visible" : "hidden"
          } w-full md:flex md:items-center md:w-auto`}
        >
          <ul
            className="
             pt-4
             text-base text-gray-700
             md:flex
             md:justify-between 
             md:pt-0"
          >
            <li>
              <Link className={loginButtonStyle} href="/auth/login">
                Sign In
              </Link>
            </li>
            <li>
              <Link className={signupButtonStyle} href="/auth/signup">
                Sign Up
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default AuthHeader;
