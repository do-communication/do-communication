import AuthHeader from "./AuthHeader";

const AuthLayout = ({ title, children }) => {
  return (
    <div className="relative min-h-screen w-screen">
      <img
        src="/images/bg.svg"
        alt="Background Image"
        className="absolute top-0 z-0 w-full"
      />
      <main className="relative z-10 min-h-screen">
        <AuthHeader />
        <div className="flex gap-10 px-5 lg:px-20">
          <div className="hidden w-5/12 items-center justify-center pl-10 pt-20 md:flex">
            <img src="/images/office.svg" alt="office logo" />
          </div>
          <div className="flex w-full justify-center md:w-7/12">
            <div className="flex w-full flex-col gap-8 rounded-2xl bg-black bg-opacity-5 px-9 py-8 shadow-md shadow-gray-800 lg:w-2/3">
              <h2 className="text-center text-3xl font-semibold text-white">
                {title}
              </h2>
              {children}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AuthLayout;
