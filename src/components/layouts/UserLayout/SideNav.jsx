import Link from "next/link";
import { useState } from "react";
import { BiChevronUp } from "react-icons/bi";
const SideNav = ({ nav }) => {
  const [isSelected, setIsSelected] = useState(false);

  const { Icon, url, name, children } = nav;
  return (
    <li className="text-gray-700 ">
      <Link
        href={url ? url : "#"}
        onClick={() => {
          if (!url) {
            setIsSelected(!isSelected);
          }
        }}
        className="relative flex items-center w-full px-2 py-1 rounded hover:text-white hover:bg-gray-700"
      >
        <div className="pr-2">{Icon}</div>
        <div>{name}</div>
        {!url && (
          <div
            className={`absolute right-1.5 transition-transform duration-300 ${
              isSelected ? "rotate-180" : ""
            }`}
          >
            <BiChevronUp></BiChevronUp>
          </div>
        )}
      </Link>
      {children && (
        <div
          className={`pl-4 pr-2 overflow-hidden transition-all transform translate duration-200 ${
            isSelected ? "max-h-full" : "max-h-0"
          }`}
        >
          <ul className="flex flex-col pl-2 mt-2 space-y-1 text-xs text-gray-500 border-l border-gray-700">
            {children.map((child, index) => (
              <li className="text-sm text-gray-600 " key={index}>
                <Link
                  href={child.url}
                  className="relative flex items-center w-full px-2 py-1 rounded hover:text-white hover:bg-gray-700"
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
