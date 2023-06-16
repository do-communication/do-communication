import Link from "next/link";
import { BiFileBlank } from "react-icons/bi";

const ReceiverMessage = ({ msg }) => {
  return (
    <div className="col-start-1 col-end-8 p-3 rounded-lg">
      <div className="flex flex-row items-center">
        <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-full bg-primary">
          {msg.data.SenderName[0]}
        </div>
        <div className="relative px-4 py-2 ml-3 text-sm bg-white shadow rounded-xl">
          <div>{msg.data.Content}</div>
        </div>
      </div>
      <ul className="flex gap-4 ml-14">
        {msg.data.file ? (
          <li
            key={msg.id}
            className="px-2 py-1 mt-2 text-center rounded-md bg-slate-200 hover:bg-slate-300"
          >
            <Link href={msg.data.url} className="flex flex-col">
              <BiFileBlank className="w-12 h-auto text-secondary" />
              <p
                className="w-10 text-xs font-semibold truncate"
                title={msg.data.Content}
              >
                {msg.data.Content}
              </p>
            </Link>
          </li>
        ) : <div></div>}
      </ul>
    </div>
  );
};

export default ReceiverMessage;
