import { formatTimeAgo } from "@/utils/formatTimeAgo";
import Link from "next/link";
import { BiFileBlank } from "react-icons/bi";

const ReceiverMessage = ({ msg }) => {
  return (
    <div className="col-start-1 col-end-8 rounded-lg p-3">
      <div className="flex flex-row items-center">
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary">
          {msg.data.SenderName[0]}
        </div>
        <div className="relative ml-3 rounded-xl bg-white px-4 py-2 text-sm shadow">
          <div>{msg.data.Content}</div>
          <small className="text-[10px]">
            {formatTimeAgo(new Date(msg.data.CreatedAt?.seconds * 1000))}
          </small>
        </div>
      </div>
      <ul className="ml-14 flex gap-4">
        {msg.data.file ? (
          <li
            key={msg.id}
            className="mt-2 rounded-md bg-slate-200 px-2 py-1 text-center hover:bg-slate-300"
          >
            <Link href={msg.data.url} className="flex flex-col">
              <BiFileBlank className="h-auto w-12 text-secondary" />
              <p
                className="w-10 truncate text-xs font-semibold"
                title={msg.data.Content}
              >
                {msg.data.Content}
              </p>
              <small className="text-[10px]">
                {formatTimeAgo(new Date(msg.data.CreatedAt?.seconds * 1000))}
              </small>
            </Link>
          </li>
        ) : (
          <div></div>
        )}
      </ul>
    </div>
  );
};

export default ReceiverMessage;
