export const RecentMessageItem = ({ name, msg }) => {
  return (
    <>
      <div className="items-center justify-center w-8 h-8 bg-blue-200 rounded-full md:flex lg:hidden xl:flex">
        <div className="flex items-center justify-center w-full h-full">
          {name[0]}
        </div>
      </div>
      <div className="flex flex-col items-start justify-start ml-4 font-semibold">
        <p>{name}</p>
        <p className="w-32 text-sm font-light truncate">{msg}</p>
      </div>
    </>
  );
};
