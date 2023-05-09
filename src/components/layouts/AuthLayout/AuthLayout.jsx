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
        <div className="flex gap-10 px-5 lg:px-20">
          <div className="items-center justify-center hidden w-5/12 pt-20 pl-10 md:flex">
            <img src="/images/office.svg" alt="office logo" />
          </div>
          <div className="flex justify-center w-full md:w-7/12">
            <div className="flex flex-col w-full gap-8 py-8 bg-black shadow-md bg-opacity-5 shadow-gray-800 lg:w-2/3 px-9 rounded-2xl">
              <h2 className="text-3xl text-white font-semibold text-center">{title}</h2>
              {children}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AuthLayout;
