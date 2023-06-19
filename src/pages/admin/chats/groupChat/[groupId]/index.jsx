import Chatbox from "@/components/Chat/Chatbox";
// import { messages } from "@/mock/messages";
import { useRouter } from "next/router";
import ChatLayout from "../ChatLayout";
import { useEffect, useState } from "react";
import useFetch from "@/components/useFetch";

const GroupChat = () => {
  const router = useRouter();

  const [messages, setMessages] = useState([]);
  const [reciever, setReciever] = useState("");
  const [update, setUpdate] = useState(false);

  const { getGroupMessage, user, GetGroup } = useFetch("KalCompany");
  const groupId = router.query.groupId;
  const get = async (groupId) => {
    setReciever(await GetGroup(groupId))
    setMessages(await getGroupMessage(groupId))
  }

  useEffect(() => { get(groupId) }, [groupId])
  useEffect(() => {
    get(groupId);
  }, [update])
  console.log("index.jsx")


  return (
    <ChatLayout group={reciever}>
      <Chatbox messages={messages} name={reciever ? reciever.Name : ""} get={get} setUpdate={setUpdate} update={update} isgroup={true} />
    </ChatLayout>
  );
};

export default GroupChat;
