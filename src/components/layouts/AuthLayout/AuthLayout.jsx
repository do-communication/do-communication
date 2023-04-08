import AuthHeader from "./AuthHeader";

const AuthLayout = ({ title, children }) => {
  return (
    <div className="relative w-screen min-h-screen">
      <img
        src="/images/bg.svg"
        alt="Background Image"
        className="absolute top-0 z-0 w-full"
      />
      <main className="relative z-10 min-h-screen">
        <AuthHeader />
        <div className="flex lg:px-20 px-5 gap-10">
          <div className="md:flex pt-20 pl-10 w-5/12 items-center justify-center hidden">
            <img src="/images/office.svg" alt="office logo" />
          </div>
          <div class="w-full md:w-7/12 flex justify-center">
            <div className="bg-black bg-opacity-5 shadow-md shadow-gray-800 w-full lg:w-2/3 flex flex-col gap-8 px-5 py-8 rounded-2xl">
              <h2 className="text-3xl font-semibold text-center">{title}</h2>
              {children}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AuthLayout;
