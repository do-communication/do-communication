export const RecentMessageItem = ({ name, msg }) => {
  return (
    <>
      <div className="h-8 w-8 items-center justify-center rounded-full bg-blue-200 md:flex lg:hidden xl:flex">
        <div className="flex h-full w-full items-center justify-center">
          {name[0]}
        </div>
      </div>
      <div className="ml-4 flex flex-col items-start justify-start font-semibold">
        <p>{name}</p>
        <p className="w-32 truncate text-sm font-light">{msg}</p>
      </div>
    </>
  );
};
