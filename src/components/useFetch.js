import { db } from "../../context/DbContext"
import { getDocs, collection, query, where, or, orderBy, and, addDoc, doc, getDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { auth } from "../../config/firebase";
import { serverTimestamp } from '@firebase/firestore'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const useFetch = (collectionType) => {

    const [error, setError] = useState(null);
    const user = auth.currentUser;

    // get name by id
    const GetName = async (userId) => {
        if (userId) {
            const specific_user = doc(db, collectionType, "Users", "StaffMembers", userId);
            const docSnap = await getDoc(specific_user)

            return docSnap.data().Name;
        }
    }

    // Get members in the system
    const getMessage = async (userId) => {
        // console.log("getting chat message")
        let messages = []
        if (userId) {
            const allMessages = collection(db, collectionType, "Messages", "Messages")

            const q = query(allMessages,
                or(and(where("SenderId", "==", auth.currentUser.uid), where("RecieverId", "==", userId)),
                    and(where("SenderId", "==", userId), where("RecieverId", "==", auth.currentUser.uid))
                ), orderBy("CreatedAt")
            );

            const docs = await getDocs(q)

            docs.forEach(d => {
                messages.push({ id: d.id, data: d.data() })
            });
        }

        return messages
    };

    // get all members
    const getMembersData = async () => {
        // console.log("getting member")
        let members = []
        try {
            const all = collection(db, collectionType, "Users", "StaffMembers")
            const doc = await getDocs(all)
            doc.forEach(d => {
                members.push({ id: d.id, data: d.data() })
            });

        } catch (err) {
            setError(err)
        };

        return members
    };

    // send message
    const send = async (sendMessage, sendFile, userId) => {
        if (sendMessage.trim() !== "") {
            await addDoc(collection(db, collectionType, "Messages", "Messages"), {
                Content: sendMessage,
                CreatedAt: serverTimestamp(),
                RecieverId: userId,
                SenderId: auth.currentUser.uid,
                SenderName: auth.currentUser.displayName,
                seen: false,
                file: false
            });

            //   document.getElementById('sendMessageId').value = '';
            //   await getMessage();
            //   setSendMessage('');
            //   setSendFile(null);

            document.getElementById("message_send").value = ""
        }

        if (sendFile !== null && sendMessage.trim() === "") {
            const storage = getStorage();
            const storageRef = ref(storage, sendFile.name);
            const uploadTask = uploadBytesResumable(storageRef, sendFile)
            uploadTask.on('state_changed',
                (snapshot) => {

                    const progress = Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                    // console.log('Upload is ' + progress + '% done');
                    document.getElementById("message_send").value = sendFile.name + "  " + progress + '% Done';
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                    }
                },
                (error) => {
                    console.log(error);
                },
                () => {


                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        await addDoc(collection(db, collectionType, "Messages", "Messages"), {
                            Content: sendFile.name,
                            CreatedAt: serverTimestamp(),
                            RecieverId: userId,
                            SenderId: auth.currentUser.uid,
                            SenderName: auth.currentUser.displayName,
                            seen: false,
                            file: true,
                            url: downloadURL
                        });

                        document.getElementById('message_send').value = '';
                        // await getMessage();
                        // setSendMessage('');
                        // setSendFile(null);
                    });

                }
            );
        };
    };

    return ({ send, GetName, getMessage, getMembersData, error, user });
}

export default useFetch;