import ChatLayout from "./ChatLayout";

const DirectChat = () => {
  return (
    <ChatLayout>
      <div className="items-center justify-center hidden h-full lg:flex">
        <h3 className="text-xl font-semibold">
          Select a member or a recent chat
        </h3>
      </div>
    </ChatLayout>
  );
};

export default DirectChat;
