import Chatbox from "@/components/Chat/Chatbox";
import { messages } from "@/mock/messages";
import { useRouter } from "next/router";
import ChatLayout from "../ChatLayout";
import { useEffect, useState } from "react";
import { auth } from "../../../../../../config/firebase"
import useFetch from "@/components/useFetch";

const DirectChat = () => {
  const router = useRouter();

  const [messages, setMessages] = useState([])

  const { getMessage, user } = useFetch("KalCompany");
  const userId = router.query.userId;
  const get = async () => {
    setMessages(await getMessage(userId))
  }
  console.log(userId)
  console.log(user.uid)

  useEffect(() => { get() }, [userId])


  return (
    <ChatLayout>
      <Chatbox messages={messages} name={user.displayName} />
    </ChatLayout>
  );
};

export default DirectChat;
