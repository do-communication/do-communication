import Link from "next/link";
import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
const AuthHeader = () => {
  const [showHeader, setShowHeader] = useState(false);
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
            <img src="/images/logo.png" alt="logo" className="lg:w-32  w-20" />
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
              <Link className="md:p-4 py-2 block hover:text-black" href="#">
                Home
              </Link>
            </li>
            <li>
              <Link className="md:p-4 py-2 block hover:text-black" href="#">
                About us
              </Link>
            </li>
            <li>
              <Link className="md:p-4 py-2 block hover:text-black" href="#">
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
              <Link
                className="w-full text-black px-6 py-2  font-semibold flex items-center justify-center  rounded-full hover:text-gray-700"
                href="/auth/login"
              >
                Sign in
              </Link>
            </li>
            <li>
              <Link
                className="w-full text-black px-6 py-2  font-semibold flex items-center justify-center bg-primary  rounded-full shadow-sm shadow-black hover:brightness-95"
                href="/auth/signup"
              >
                Register
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default AuthHeader;
// import React, { useState, useEffect } from "react";
// import {
//   Navbar,
//   MobileNav,
//   Typography,
//   Button,
//   IconButton,
// } from "@material-tailwind/react";

// const AuthHeader = () => {
//   const [openNav, setOpenNav] = useState(false);

//   useEffect(() => {
//     window.addEventListener(
//       "resize",
//       () => window.innerWidth >= 960 && setOpenNav(false)
//     );
//   }, []);

//   const navList = (
//     <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center px-6  lg:gap-6">
//       <Typography
//         as="li"
//         variant="h5"
//         color="blue-gray"
//         className="p-1 font-normal"
//       >
//         <a href="#" className="flex items-center">
//           Home
//         </a>
//       </Typography>
//       <Typography
//         as="li"
//         variant="h5"
//         color="blue-gray"
//         className="p-1 font-normal"
//       >
//         <a href="#" className="flex items-center">
//           About us
//         </a>
//       </Typography>
//       <Typography
//         as="li"
//         variant="h5"
//         color="blue-gray"
//         className="p-1 font-normal"
//       >
//         <a href="#" className="flex items-center">
//           Contact us
//         </a>
//       </Typography>

//     </ul>
//   );

//   return (
//     <Navbar variant="filled" color="transparent" shadow="true" className="mx-auto max-w-full py-2 px-4 lg:px-8 lg:py-4">
//       <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
//         <Typography
//           as="a"
//           href="#"
//           variant="h4"
//           className="mr-4 cursor-pointer py-1.5 font-normal"
//         >
//           <span><img src="/images/logo.png" alt="" width={100} /></span>
//         </Typography>
//         <div className="hidden lg:block">{navList}</div>
//         <div className="flex gap-4 text-lg" >
//         <Button variant="text" size="lg" className=" rounded-3xl hidden lg:inline-block" >
//           <span>Sign in</span>
//         </Button>
//         <Button variant="filled" className="rounded-3xl hidden lg:inline-block " color="90CAF9">
//           <span>Sign up</span>
//         </Button>
//         </div>
//         <IconButton
//           variant="text"
//           className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
//           ripple={false}
//           onClick={() => setOpenNav(!openNav)}
//         >
//           {openNav ? (
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               className="h-6 w-6"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//               strokeWidth={2}
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M6 18L18 6M6 6l12 12"
//               />
//             </svg>
//           ) : (
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-6 w-6"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth={2}
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M4 6h16M4 12h16M4 18h16"
//               />
//             </svg>
//           )}
//         </IconButton>
//       </div>
//       <MobileNav open={openNav}>
//         <div className="container mx-auto">
//           {navList}
//           <Button variant="gradient" size="sm" fullWidth className="mb-2">
//             <span>Sign up</span>
//           </Button>
//         </div>
//       </MobileNav>
//     </Navbar>
//   );
// }

// export default AuthHeader;
