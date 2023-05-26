const SenderMessage = ({ msg }) => {
  return (
    <div className="col-start-6 col-end-13 p-3 rounded-lg">
      <div className="flex flex-row-reverse items-center justify-start">
        <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-full bg-primary">
          {msg.from.fullName[0]}
        </div>
        <div className="relative px-4 py-2 mr-3 text-sm bg-indigo-100 shadow rounded-xl">
          <div>{msg.message}</div>
        </div>
      </div>
      <ul className="flex gap-4 ml-14">
        {msg.files?.map((file) => (
          <li className="px-2 py-1 mt-2 text-center rounded-md bg-slate-200 hover:bg-slate-300">
            <Link href={file.location} className="flex flex-col">
              <BiFileBlank className="w-12 h-auto text-secondary" />
              <p
                className="w-10 text-xs font-semibold truncate"
                title={file.fileName}
              >
                {file.fileName}
              </p>
            </Link>
          </li>
        ))}
      </ul>
      <div className="flex justify-end gap-2 mr-12">
        <button className="flex justify-end mt-1 text-xs">Edit</button>
        <button className="flex justify-end mt-1 text-xs">Delete</button>
      </div>
    </div>
  );
};

export default SenderMessage;
