import ChatLayout from "./ChatLayout";

const GroupChat = () => {
  return (
    <ChatLayout>
      <div className="hidden h-full items-center justify-center lg:flex">
        <h3 className="text-xl font-semibold">
          Select a group or a recent chat
        </h3>
      </div>
    </ChatLayout>
  );
};

export default GroupChat;
