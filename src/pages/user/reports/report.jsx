import UserLayout from "@/components/layouts/UserLayout/UserLayout";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import Select from "react-select";
import { doc, getDocs, getDoc, addDoc, collection, updateDoc } from "firebase/firestore";
import { db } from "../../../../context/DbContext";
import { auth } from "../../../../config/firebase";
const user = auth.currentUser;
const QuillNoSSRWrapper = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});
 
const AddReport = () => {
  const [reportDetail, setReportDetail] = useState("");
  const [allMembers, setallMembers] = useState([]);
  const [sendFile, setSendFile ] = useState(null);
  const [progress, setProgress] = useState("");
  const [members, setMembers] = useState([]);
  let url = "";
  const [mem, setmem] = useState({});
  const [data, setData] = useState({
    ReportBy: user.displayName,
    Title: '',
    Detail: '',
    File: '',
    Date: new Date().toDateString(),
    ReportTo: []
  });

  const uploadFile = async(e) =>{
    console.log(sendFile)
    if (sendFile !== null || sendFile) {

      const storage = getStorage();
      const storageRef = ref(storage, user.uid + "/" + sendFile.name);
      const uploadTask = uploadBytesResumable(storageRef, sendFile)

      uploadTask.on('state_changed',
        (snapshot) => {

          setProgress(sendFile.name + "  " + (Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100)) + '% Done');

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
            // setData({...data, File:downloadURL})
            url = downloadURL
            await addData();
            document.getElementById('attach_file').value = [];
            document.getElementById('progress').value = '';
            setSendFile(null);
            setProgress("");
          });

        }
      );
    }
  }

  const addData = async () => {
    let tempTask = [];
    let tempReport = [];
    let tempGroup = [];
    const temp = mem._document.data.value.mapValue.fields.Tasks.arrayValue.values;
    const report = mem._document.data.value.mapValue.fields.Reports.arrayValue.values;
    const group = mem._document.data.value.mapValue.fields.GroupId.arrayValue.values;
    if(temp){
    temp.forEach(t => {
      if(t){
      tempTask.push(t.stringValue);}
    });}
    if(report){
      report.forEach(r => {
        if(r){
        tempReport.push(r.stringValue);}
      });
    }
    if(group){
      group.forEach(g => {
        if(g){
        tempGroup.push(g.stringValue);}
      });}
    tempReport.push(data.Title)
    const newData = {
      Name: mem._document.data.value.mapValue.fields.Name.stringValue,
      Address: mem._document.data.value.mapValue.fields.Address.stringValue,
      Email: mem._document.data.value.mapValue.fields.Email.stringValue,
      Gender: mem._document.data.value.mapValue.fields.Gender.stringValue,
      Department: mem._document.data.value.mapValue.fields.Department.stringValue,
      PhoneNumber: mem._document.data.value.mapValue.fields.PhoneNumber.stringValue,
      DateOfBirth: mem._document.data.value.mapValue.fields.DateOfBirth.stringValue,
      ProfilePic: mem._document.data.value.mapValue.fields.ProfilePic.stringValue,
      RegisteredAt: mem._document.data.value.mapValue.fields.RegisteredAt.stringValue,
      GroupId: tempGroup,
      Reports: tempReport,
      Tasks: tempTask
    }
    const userRef = doc(db, "KalCompany", "Users", "StaffMembers", user.uid);
    updateDoc(userRef, newData)
    .then(userRef => {
        console.log("A New Document Field has been added to an existing document");
    })
    .catch(error => {
        console.log(error);
    })
        await addDoc(collection(db, "KalCompany", "Reports", "Reports"), {...data , File: url});
        toast.success("Report submitted successfully");
  } 

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(sendFile)
    await uploadFile(e);
  };


  useEffect(() => {
    const values = {...data, Detail: reportDetail, File:url}
    setData(values)
  }, [reportDetail, url])
  
  const getData = async () => {
    let arr = []
    const all = collection(db, "KalCompany", "Users", "StaffMembers");
    try {
      const doc = await getDocs(all)
      doc.forEach(d => {
        arr.push({id:d.id, data:d.data()})
      });
    } catch (err) {
      console.log(err)
      setMembers([{ Name: "check your connection" }])
    }

    setMembers(arr)
    setallMembers(arr)
  }

  useEffect(async() => {
    getData()
    const docRef = doc(db, "KalCompany", "Users", "StaffMembers", user.uid);
    setmem(await getDoc(docRef))
  }, []);
  return (
    <UserLayout>
      <div className="flex justify-center min-h-screen p-6 pt-4 bg-gray-100">
        <div className="container max-w-screen-lg mx-auto">
          <form>
            <h2 className="pt-0 pb-4 text-xl font-semibold text-gray-600">
              Write Report
            </h2>
            <div className="p-4 px-4 mb-6 bg-white rounded shadow-sm md:p-8">
              <div className="grid grid-cols-1 gap-4 text-sm gap-y-2 lg:grid-cols-3">
                <div className="text-gray-600">
                  <p className="pb-3 pl-4 text-lg font-medium">Report</p>
                  <img
                    src="/images/task.svg"
                    alt="form"
                    width={250}
                    height={800}
                    className="pt-10 sm:pb-3"
                  />
                </div>
                <div className="lg:col-span-2 ">
                  <div className="grid grid-cols-1 gap-6 text-sm gap-y-5 md:grid-cols-6">
                    <div className="md:col-span-6">
                      <label for="full_name">Report Title</label>
                      <input
                        type="text"
                        name="report_title"
                        className="w-full h-10 px-4 mt-1 border rounded bg-gray-50"
                        id="task_title"
                        placeholder="enter report title"
                        value={data.Title}
                        onChange={(e) => {
                          setData({...data, Title:e.target.value})
                          // setData({...data, Detail:reportDetail})
                        }}
                      />
                    </div>
                    
                    <div className="md:col-span-6">
                      <label for="detail">Detail Description</label>
                      <QuillNoSSRWrapper
                        theme="snow"
                        value={reportDetail}
                        onChange={(e) => 
                          {{
                            setReportDetail(e.slice(3, e.lastIndexOf('</p>')));
                            // setData({...data, Detail:reportDetail});
                      }}}
                        placeholder="Write some description about the report"
                        style={{ height: 180 }}
                      />
                    </div>
                    <div className="md:col-span-6 mt-10 ">
                    <label for="address">Submitted To:</label>
                    <Select
                        // ref={selectInputRef}
                        isMulti
                        name="members"
                        id="assigned"
                        options={allMembers.map((member) => {
                          return { label: member.data.Name, value: member.data.Name, id:member.id, Tasks:member.data.Tasks };
                        })}
                        onChange={(selectedMembers) => {
                          setMembers(
                            selectedMembers.map((member) => member.value)
                          );
                          setData({
                            ...data,
                            ReportTo: selectedMembers.map((member) => member.value)
                          })
                          // setData({...data, Detail:reportDetail});
                          // selectedMembers.map(member => {
                          //   temp.push({Reports:member.Reports, value:member.value, id:member.id})
                          // });
                          // setassignedto(Array.from(new Set(temp)))
                          
                          if (assigned && assigned.classList.contains("ring-red-600")) {
                            assigned.classList.remove("ring-red-600");
                            assigned.classList.remove("ring-2");
                            assigned.placeholder = "search for a member or a group";
                          }

                        }}
                      />
                    </div>
                    <div className="md:col-span-6 ">
                      <label for="full_name">Attach File</label>
                      <input
                        type="file"
                        name="attach_file"
                        className="w-full h-10 px-4 mt-1 border rounded bg-gray-50"
                        id="attach_file"
                        placeholder="Attach File"
                        onChange={(e)=>{setSendFile(e.target.files[0])}}
                      />
                    </div>
                    {progress && <div className="md:col-span-3">
                      <label for="address">Progress</label>
                      <input
                        type="text"
                        id="progress"
                        className="h-10 border mt-1 rounded-lg px-4 w-full bg-gray-50"
                        value={progress}
                        disabled
                      />
                    </div>}
          
                    <div className="ml-auto text-right md:col-span-6">
                      <div className="inline-flex items-end justify-end">
                        <div className="flex-row gap-10 pt-6">
                          <button className="px-4 py-2 mr-6 font-bold bg-gray-300 border-b-2 rounded hover:bg-primary text-balck">
                            Cancel
                          </button>
                          <button
                            className="px-4 py-2 font-bold text-white rounded bg-primary hover:bg-bold"
                            onClick={handleSubmit}
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </UserLayout>
  );
};

export default AddReport;
