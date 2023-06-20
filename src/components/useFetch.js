import { db } from "../../context/DbContext"
import { getDocs, collection, query, where, or, orderBy, and, addDoc, doc, getDoc, setDoc, deleteDoc, updateDoc, onSnapshot } from "firebase/firestore";
import { useState, useEffect } from "react";
import { auth } from "../../config/firebase";
import { serverTimestamp } from '@firebase/firestore'
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { toast } from "react-toastify";

const useFetch = (collectionType) => {

    const [error, setError] = useState(null);
    const user = auth.currentUser;

    const GetCompanyName = async () => {
        const company = doc(db, collectionType, "Company");
        const docSnap = await getDoc(company)

        return docSnap.data();
    }

    // get name by id
    const GetAdmin = async (userId) => {
        console.log(userId)
        if (userId) {
            const specific_user = doc(db, collectionType, "Users", "Admin", userId);
            const docSnap = await getDoc(specific_user)
            console.log(docSnap.data())
            return docSnap.data();
        }
    }

    const GetUser = async (userId) => {

        if (userId) {
            const specific_user = doc(db, collectionType, "Users", "StaffMembers", userId);
            const docSnap = await getDoc(specific_user)

            return docSnap.data();
        }
    }
    const GetGroup = async (groupId) => {

        if (groupId) {
            const specific_group = doc(db, collectionType, "Groups", "Groups", groupId);
            const docSnap = await getDoc(specific_group)

            return docSnap.data();
        }
    }

    // Get messages in the system
    const getMessage = async (userId, setMessages) => {
        // console.log("getting chat message")
        if (userId) {
            const allMessages = collection(db, collectionType, "Messages", "Messages")

            const q = query(allMessages,
                or(and(where("SenderId", "==", auth.currentUser.uid), where("RecieverId", "==", userId)),
                    and(where("SenderId", "==", userId), where("RecieverId", "==", auth.currentUser.uid))
                ), orderBy("CreatedAt")
            );

            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const messages = [];
                querySnapshot.forEach((doc) => {
                    messages.push({ id: doc.id, data: doc.data() });
                });
                document.getElementById("message_send").value = ""
                setMessages(messages);
            });
        }
    };
    const getGroupMessage = async (groupId, setMessages) => {

        if (groupId) {
            const allMessages = collection(db, collectionType, "GroupMessages", "Messages")

            const q = query(allMessages, where("GroupId", "==", groupId), orderBy("CreatedAt"));

            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const messages = [];
                querySnapshot.forEach((doc) => {
                    messages.push({ id: doc.id, data: doc.data() });
                });
                document.getElementById("message_send").value = ""
                setMessages(messages);
            });

        }
    };

    const getGroups = async () => {
        let groups = []
        try {
            const all = collection(db, collectionType, "Groups", "Groups")
            const doc = await getDocs(all)
            doc.forEach(d => {
                groups.push({ id: d.id, data: d.data() })
            });

        } catch (err) {
            setError(err)
            console.log(err)
        };

        return groups
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
            console.log(err)
        };

        return members
    };
    const getRecentData = async () => {
        let recentChat = []
        try {

            const all = collection(db, collectionType, "Messages", "Recent")
            const q = query(all,
                or(where("SenderId", '==', auth.currentUser.uid),
                    where("RecieverId", '==', auth.currentUser.uid)
                ), orderBy("CreatedAt", "desc")
            );

            const docs = await getDocs(q)

            docs.forEach(d => {
                recentChat.push({ id: d.data().RecieverId, data: d.data() })
            });

        } catch (err) {
            setError(err)
        };

        return recentChat
    };
    const getRecentGroup = async () => {
        let recentGroup = []
        try {

            const all = collection(db, collectionType, "GroupMessages", "Recent")
            // const q = query(all,
            //     where("SenderId", '==', auth.currentUser.uid), orderBy("CreatedAt", "desc")
            // );
            const q = query(all, orderBy("CreatedAt", "desc")
            );

            const docs = await getDocs(q)

            docs.forEach(d => {
                recentGroup.push({ id: d.data().GroupId, data: d.data() })
            });

        } catch (err) {
            setError(err)
        };

        return recentGroup
    };

    // send message
    const send = async (sendMessage, sendFile, userId, setUpdate, update, setPriorityChange, priorityChange) => {
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
            const reciever = await GetUser(userId)
            await setDoc(doc(db, collectionType, "Messages", "Recent", auth.currentUser.uid + "-" + userId), {
                Content: sendMessage,
                CreatedAt: serverTimestamp(),
                RecieverId: userId,
                Name: reciever.Name,
                SenderId: auth.currentUser.uid,
                SenderName: auth.currentUser.displayName,
                Department: reciever.Department,
                ProfilePic: reciever.ProfilePic,
                seen: false,
                file: false
            });

            setPriorityChange(!priorityChange);


        }

        if (sendFile !== null && sendMessage.trim() === "") {
            const storage = getStorage();
            const storageRef = ref(storage, "chat/" + sendFile.name);
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


                        const reciever = await GetUser(userId)
                        await setDoc(doc(db, collectionType, "Messages", "Recent", auth.currentUser.uid + "-" + userId), {
                            Content: sendFile.name,
                            CreatedAt: serverTimestamp(),
                            RecieverId: userId,
                            Name: reciever.Name,
                            SenderId: auth.currentUser.uid,
                            SenderName: auth.currentUser.displayName,
                            Department: reciever.Department,
                            ProfilePic: reciever.ProfilePic,
                            seen: false,
                            file: true,
                            url: downloadURL
                        });

                        setUpdate(!update);
                        setPriorityChange(!priorityChange);


                        // await getMessage();
                        // setSendMessage('');
                        // setSendFile(null);
                    });

                }
            );
        };


    };
    const sendGroup = async (sendMessage, sendFile, userId, setUpdate, update, setPriorityChange, priorityChange) => {
        if (sendMessage.trim() !== "") {
            await addDoc(collection(db, collectionType, "GroupMessages", "Messages"), {
                Content: sendMessage,
                CreatedAt: serverTimestamp(),
                GroupId: userId,
                SenderId: auth.currentUser.uid,
                SenderName: auth.currentUser.displayName,
                seen: false,
                file: false
            });

            const reciever = await GetGroup(userId)
            await setDoc(doc(db, collectionType, "GroupMessages", "Recent", userId), {
                Content: sendMessage,
                CreatedAt: serverTimestamp(),
                GroupId: userId,
                Name: reciever.Name,
                SenderId: auth.currentUser.uid,
                SenderName: auth.currentUser.displayName,
                seen: false,
                file: false
            });

            setPriorityChange(!priorityChange);


        }

        if (sendFile !== null && sendMessage.trim() === "") {
            const storage = getStorage();
            const storageRef = ref(storage, "Groupchat/" + sendFile.name);
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
                        await addDoc(collection(db, collectionType, "GroupMessages", "Messages"), {
                            Content: sendFile.name,
                            CreatedAt: serverTimestamp(),
                            GroupId: userId,
                            SenderId: auth.currentUser.uid,
                            SenderName: auth.currentUser.displayName,
                            seen: false,
                            file: true,
                            url: downloadURL
                        });


                        const reciever = await GetGroup(userId)
                        await setDoc(doc(db, collectionType, "GroupMessages", "Recent", userId), {
                            Content: sendFile.name,
                            CreatedAt: serverTimestamp(),
                            GroupId: userId,
                            Name: reciever.Name,
                            SenderId: auth.currentUser.uid,
                            SenderName: auth.currentUser.displayName,
                            seen: false,
                            file: true,
                            url: downloadURL
                        });

                        setUpdate(!update);
                        setPriorityChange(!priorityChange);


                        // await getMessage();
                        // setSendMessage('');
                        // setSendFile(null);
                    });

                }
            );
        };


    };

    const deleteMessage = async (selected, selectedFile, setUpdate, update) => {
        if (selected != null) {
            await deleteDoc(doc(db, collectionType, "Messages", "Messages", selected.id));
            setUpdate(!update);
        }

        if (selectedFile != null) {
            const storage = getStorage();

            // Create a reference to the file to delete
            const desertRef = ref(storage, "chat/" + selectedFile.data.Content);

            // Delete the file
            deleteObject(desertRef).then(async () => {
                console.log("successfully deleted");
                await deleteDoc(doc(db, collectionType, "Messages", "Messages", selectedFile.id));
                setUpdate(!update);
            }).catch((error) => {
                console.log(error);
            });
        }
    }
    const deleteGroupMessage = async (selected, selectedFile, setUpdate, update) => {
        if (selected != null) {
            await deleteDoc(doc(db, collectionType, "GroupMessages", "Messages", selected.id));
            setUpdate(!update);
        }

        if (selectedFile != null) {
            const storage = getStorage();

            // Create a reference to the file to delete
            const desertRef = ref(storage, "Groupchat/" + selectedFile.data.Content);

            // Delete the file
            deleteObject(desertRef).then(async () => {
                console.log("successfully deleted");
                await deleteDoc(doc(db, collectionType, "GroupMessages", "Messages", selectedFile.id));
                setUpdate(!update);
            }).catch((error) => {
                console.log(error);
            });
        }
    }

    const editMessage = async (sendMessage, selected, setUpdate, update) => {
        if (selected != null && sendMessage.trim() != "") {
            const messageRef = doc(db, collectionType, "Messages", "Messages", selected.id);

            await updateDoc(messageRef, {
                Content: sendMessage
            });

            setUpdate(!update);
        }
    }
    const editGroupMessage = async (sendMessage, selected, setUpdate, update) => {
        if (selected != null && sendMessage.trim() != "") {
            const messageRef = doc(db, collectionType, "GroupMessages", "Messages", selected.id);

            await updateDoc(messageRef, {
                Content: sendMessage
            });

            setUpdate(!update);
        }
    }

    const deleteFile = async (selectedFile, setUpdate, update, setSelectedRows) => {
        if (selectedFile != null) {

            const storage = getStorage();

            // Create a reference to the file to delete
            const desertRef = ref(storage, auth.currentUser.uid + "/" + selectedFile.data.FileName);

            // Delete the file
            deleteObject(desertRef).then(async () => {
                console.log("successfully deleted");
                await deleteDoc(doc(db, collectionType, "Files", selectedFile.data.Owner, selectedFile.id));
                setSelectedRows([]);
                setUpdate(!update);
                toast.success("File Deleted");
            }).catch((error) => {
                console.log(error);
            });
        }
    }

    return ({
        GetCompanyName, send, sendGroup, GetAdmin, GetUser, GetGroup, getMessage,
        getMembersData, getRecentData, deleteMessage, editMessage, getGroups,
        getRecentGroup, getGroupMessage, deleteGroupMessage, editGroupMessage, deleteFile, error, user
    });
}

export default useFetch;