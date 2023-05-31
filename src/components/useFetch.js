import { db } from "../../context/DbContext"
import { getDocs, collection, query, where, or, orderBy, and, addDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { auth } from "../../config/firebase";
import { serverTimestamp } from '@firebase/firestore'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const useFetch = (collectionType) => {

    const [error, setError] = useState(null);
    const user = auth.currentUser;

    // Get members in the system
    const getMessage = async (userId) => {
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
        console.log(userId)
        console.log(messages)
        return messages
    };


    const getMembersData = async () => {
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

    return ({ getMessage, getMembersData, error, user });
}

export default useFetch;