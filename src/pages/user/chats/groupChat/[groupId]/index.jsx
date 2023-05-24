import Chatbox from "@/components/Chat/Chatbox";
import { messages } from "@/mock/messages";
import { useRouter } from "next/router";
import ChatLayout from "../ChatLayout";

const GroupChat = () => {
  const router = useRouter();

  const userId = router.query.userId;
  return (
    <ChatLayout>
      <Chatbox messages={messages} name="John Doe" />
    </ChatLayout>
  );
};

export default GroupChat;
