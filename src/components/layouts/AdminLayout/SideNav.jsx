import Link from "next/link";
import { useState } from "react";
import { BiChevronUp } from "react-icons/bi";
import { useAuth } from "../../../../context/AuthContext";
import Router from "next/router";

const router = Router;

const SideNav = ({ nav, isActive, currentPath }) => {
  const { user, logout } = useAuth();
  const [isSelected, setIsSelected] = useState(isActive);

  const handleSingout = (e) => {
    e.preventDefault();
    try {
      logout().then(() => router.push("/"));
    } catch (err) {
      console.log(err);
    }
  };

  const { Icon, url, name, children } = nav;
  return (
    <li className="text-gray-700 ">
      <Link
        href={url ? url : "#"}
        onClick={(e) => {
          if (name == "Sign Out") {
            handleSingout(e);
          }
          if (!url) {
            setIsSelected(!isSelected);
          }
        }}
        className={`relative flex w-full items-center rounded px-2 py-1 ${
          isActive && !nav.children
            ? "bg-gray-700 text-white hover:text-gray-400"
            : "hover:bg-gray-700 hover:text-white hover:active:bg-gray-700"
        }`}
      >
        <div className="pr-2">{Icon}</div>
        <div>{name}</div>
        {!url && (
          <div
            className={`absolute right-1.5 transition-transform duration-300 ${
              isSelected ? "rotate-180" : ""
            }`}
          >
            <BiChevronUp />
          </div>
        )}
      </Link>
      {children && (
        <div
          className={`translate transform overflow-hidden pl-4 pr-2 transition-all duration-200 ${
            isSelected ? "max-h-full" : "max-h-0"
          }`}
        >
          <ul className="mt-2 flex flex-col space-y-1 border-l border-gray-700 pl-2 text-xs text-gray-500">
            {children.map((child, index) => (
              <li className="text-sm text-gray-600 " key={index}>
                <Link
                  href={child.url}
                  className={`relative flex w-full items-center rounded px-2 py-1 ${
                    child.url === currentPath
                      ? "bg-gray-700 text-white hover:text-gray-400"
                      : "hover:bg-gray-700 hover:text-white hover:active:bg-gray-700"
                  }`}
                >
                  <div>{child.name}</div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </li>
  );
};

export default SideNav;
