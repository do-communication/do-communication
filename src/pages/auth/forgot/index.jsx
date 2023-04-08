import AuthLayout from "@/components/layouts/AuthLayout/AuthLayout";
import {MdOutlineEmail} from "react-icons/md"
import {IoIosArrowBack} from "react-icons/io"

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
          <div className="flex flex-row gap-6 justify-center py-9">
          < IoIosArrowBack className="w-16 h-auto bg-primary rounded-full" />
            <h1 className="text-xl py-4 font-semibold vertical-align: bottom" >Back</h1>
          </div>
        
        </div>
      </AuthLayout>
    );
}
 
export default Forgot;