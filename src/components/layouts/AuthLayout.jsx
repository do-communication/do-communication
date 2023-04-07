const AuthLayout = ({children}) => {
    return (
        <div className="relative w-screen min-h-screen">
            <img src="/images/bg.svg" alt="Background Image" className="absolute top-0 z-0 w-full" />
            <main className="relative z-10 flex min-h-screen">
                <div className="flex bg-white w-96 h-96 ">
                    <h1>Hello</h1>
                </div>
            </main>
        </div>
    );
}
 
export default AuthLayout;
