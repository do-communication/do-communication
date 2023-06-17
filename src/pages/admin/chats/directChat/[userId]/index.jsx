import Chatbox from "@/components/Chat/Chatbox";
// import { messages } from "@/mock/messages";
import { useRouter } from "next/router";
import ChatLayout from "../ChatLayout";
import { useEffect, useState } from "react";
import { auth } from "../../../../../../config/firebase"
import useFetch from "@/components/useFetch";

const DirectChat = () => {
  const router = useRouter();

  const [messages, setMessages] = useState([])
  const [Name, setName] = useState("")

  const { getMessage, user, GetName } = useFetch("KalCompany");
  const userId = router.query.userId;
  const get = async (userId) => {
    setName(await GetName(userId))
    setMessages(await getMessage(userId))
  }


  useEffect(() => { get(userId) }, [userId])
  console.log("index.jsx")


  return (
    <ChatLayout>
      <Chatbox messages={messages} name={Name} get={get} />
    </ChatLayout>
  );
};

export default DirectChat;
