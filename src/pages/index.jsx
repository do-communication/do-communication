import Link from "next/link";
import { Button } from "@material-tailwind/react";

const Home = ({ name }) => {
  return (<main className="flex flex-col items-center w-screen h-screen pt-20">
  <h1 className="text-2xl">Digital Office Communication</h1>
  <h1 className="text-lg">Landing Page Here</h1>
  <ul className="list-disc">
    <li><Button variant="outlined">Button</Button></li>
    <li><Link href="/auth/login" className="text-blue-500 hover:text-blue-400 hover:underline">Login</Link></li>
    <li><Link href="/auth/signup" className="text-blue-500 hover:text-blue-400 hover:underline">Signup</Link></li>
  </ul>
  </main>);
};

export default Home;
