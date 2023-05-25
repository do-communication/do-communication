import ChatLayout from "./ChatLayout";

const DirectChat = () => {
  return (
    <ChatLayout>
      <div className="flex items-center justify-center col-span-3">
        <h3 className="hidden text-xl font-semibold md:block">
          Select a member or a recent chat
        </h3>
      </div>
    </ChatLayout>
  );
};

export default DirectChat;
