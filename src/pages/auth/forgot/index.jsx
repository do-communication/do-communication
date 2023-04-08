import AuthLayout from "@/components/layouts/AuthLayout/AuthLayout";
import {MdOutlineEmail} from "react-icons/md"
import {IoIosArrowBack} from "react-icons/io"
import Link from "next/link";

const Forgot = () => {
    return (
        <AuthLayout title="Forgot Password">
        <div className="flex flex-col gap-9 py-10">
          {/* email input */}
          <div className="bg-white group flex rounded-3xl gap-2 hover:ring-2 active:ring-2 ring-blue-300 pl-5">
          <MdOutlineEmail className="w-10 text-gray-600 pl-2 h-auto" />
          <input
            type="email"
            className="bg-white text-gray-600 w-full rounded-3xl py-4 px-2 outline-none"
            placeholder="Enter your email"
            size="lg"
          />
        </div>
        </div>
        <div className="flex flex-col gap-4">
          <button className="w-full text-lg font-semibold flex items-center justify-center bg-primary py-4 rounded-full shadow-sm shadow-black hover:brightness-95">
            Send
          </button>
          <Link
          href="/auth/forgot"
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
}
 
export default Forgot;