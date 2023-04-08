import { useRouter } from "next/router";
import { useEffect } from "react";

const Auth = () => {
  // check if logged in and redirect to home
  const router = useRouter();

  const isLoggedIn = false;

  useEffect(() => {
    if (isLoggedIn) {
      // TODO: Redirect to admin or user page based on user
      router.push("/");
    } else {
      router.push("/auth/login");
    }
  });
};

export default Auth;
