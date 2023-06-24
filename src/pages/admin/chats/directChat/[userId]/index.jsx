import Chatbox from "@/components/Chat/Chatbox";
// import { messages } from "@/mock/messages";
import { useRouter } from "next/router";
import ChatLayout from "../ChatLayout";
import { useEffect, useState } from "react";
import useFetch from "@/components/useFetch";

const DirectChat = () => {
  const router = useRouter();

  const [messages, setMessages] = useState([]);
  const [reciever, setReciever] = useState("");
  const [update, setUpdate] = useState(false);

  const { getMessage, user, GetUser } = useFetch("KalCompany");
  const userId = router.query.userId;
  console.log(userId)
  const get = async (userId) => {
    setReciever(await GetUser(userId));
    await getMessage(userId, setMessages);
  };

  useEffect(() => {
    get(userId);
  }, [userId]);
  useEffect(() => {
    get(userId);
  }, [update]);

  return (
    <ChatLayout user={reciever}>
      <Chatbox
        messages={messages}
        name={
          reciever
            ? reciever.Name
              ? reciever.Name
              : reciever.RecieverName
            : ""
        }
        get={get}
        setUpdate={setUpdate}
        update={update}
        isgroup={false}
      />
    </ChatLayout>
  );
};

export default DirectChat;
