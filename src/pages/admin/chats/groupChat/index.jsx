import ChatLayout from "./ChatLayout";

const GroupChat = () => {
  return (
    <ChatLayout>
      <div className="flex items-center justify-center col-span-3">
        <h3 className="hidden text-xl font-semibold md:block">
          Select a group or a recent chat
        </h3>
      </div>
    </ChatLayout>
  );
};

export default GroupChat;
