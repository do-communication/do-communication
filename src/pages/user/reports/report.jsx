import UserLayout from "@/components/layouts/UserLayout/UserLayout";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import Select from "react-select";
import {
  doc,
  getDocs,
  getDoc,
  addDoc,
  collection,
  updateDoc,
} from "firebase/firestore";
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
  const [sendFile, setSendFile] = useState(null);
  const [progress, setProgress] = useState("");
  const [members, setMembers] = useState([]);

  let url = "";
  const [mem, setmem] = useState({});
  let name = "";
  if (auth.currentUser.displayName[auth.currentUser.displayName.length-1] === "~") {
    name = auth.currentUser.displayName.slice(0, auth.currentUser.displayName.length - 1);
  }else{
    name = auth.currentUser.displayName
  }
  const [data, setData] = useState({
    ReportBy: name,
    Title: "",
    Detail: "",
    File: "",
    Date: new Date().toDateString(),
    ReportTo: [],
  });

  const uploadFile = async (e) => {
    console.log(sendFile);
    if (sendFile !== null || sendFile) {
      const storage = getStorage();
      const storageRef = ref(storage, user.uid + "/" + sendFile.name);
      const uploadTask = uploadBytesResumable(storageRef, sendFile);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          setProgress(
            sendFile.name +
            "  " +
            Math.floor(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            ) +
            "% Done"
          );

          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            // setData({...data, File:downloadURL})
            url = downloadURL;
            await addData();
            document.getElementById("attach_file").value = [];
            document.getElementById("progress").value = "";
            setSendFile(null);
            setProgress("");
          });
        }
      );
    } else {
      await addData();
    }
  };

  const addData = async () => {
    let tempTask = [];
    let tempReport = [];
    let tempGroup = [];
    const temp =
      mem._document.data.value.mapValue.fields.Tasks.arrayValue.values;
    const report =
      mem._document.data.value.mapValue.fields.Reports.arrayValue.values;
    const group =
      mem._document.data.value.mapValue.fields.GroupId.arrayValue.values;
    if (temp) {
      temp.forEach((t) => {
        if (t) {
          tempTask.push(t.stringValue);
        }
      });
    }
    if (report) {
      report.forEach((r) => {
        if (r) {
          tempReport.push(r.stringValue);
        }
      });
    }
    if (group) {
      group.forEach((g) => {
        if (g) {
          tempGroup.push(g.stringValue);
        }
      });
    }
    tempReport.push(data.Title);
    const newData = {
      Name: mem._document.data.value.mapValue.fields.Name.stringValue,
      Address: mem._document.data.value.mapValue.fields.Address.stringValue,
      Email: mem._document.data.value.mapValue.fields.Email.stringValue,
      Gender: mem._document.data.value.mapValue.fields.Gender.stringValue,
      Department:
        mem._document.data.value.mapValue.fields.Department.stringValue,
      PhoneNumber:
        mem._document.data.value.mapValue.fields.PhoneNumber.stringValue,
      DateOfBirth:
        mem._document.data.value.mapValue.fields.DateOfBirth.stringValue,
      ProfilePic:
        mem._document.data.value.mapValue.fields.ProfilePic.stringValue,
      RegisteredAt:
        mem._document.data.value.mapValue.fields.RegisteredAt.stringValue,
      GroupId: tempGroup,
      Reports: tempReport,
      Tasks: tempTask,
    };
    const userRef = doc(db, "KalCompany", "Users", "StaffMembers", user.uid);
    updateDoc(userRef, newData)
      .then((userRef) => {
        console.log(
          "A New Document Field has been added to an existing document"
        );
      })
      .catch((error) => {
        console.log(error);
      });
    await addDoc(collection(db, "KalCompany", "Reports", "Reports"), {
      ...data,
      File: url,
    });
    toast.success("Report submitted successfully");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(sendFile)
    await uploadFile(e);
  }

  useEffect(() => {
    const values = { ...data, Detail: reportDetail, File: url };
    setData(values);
  }, [reportDetail, url]);

  const fetch = async (arr, setAssigned, tempo) =>{

    for (let m of arr){
      const refUser = doc(db, "KalCompany", "Users", "StaffMembers", m);
      const val = await getDoc(refUser);
      if(val._document){
        tempo.push(val._document.data.value.mapValue.fields.Name.stringValue)
      }else{
        const refGroup = doc(db, "KalCompany", "Users", "Admin", m);
        const val2 = await getDoc(refGroup); 
        tempo.push(val2._document.data.value.mapValue.fields.Name.stringValue)
      } 
    }

    setAssigned(tempo) 
  }
  const getData = async () => {
    let arr = [];
    let leaders = [];
    const all = collection(db, "KalCompany", "Groups", "Groups");
    const admin = collection(db, "KalCompany", "Users", "Admin");
    try {
      const doc = await getDocs(all);
      const ad = await getDocs(admin);
      doc.forEach((d) => {
        arr.push({ id: d.id, data: d.data() });
      });
      ad.forEach((d) => {
        leaders.push(d.id);
      });
    } catch (err) {
      console.log(err);
      // setMembers([{ Name: "check your connection" }]);
    }
    
    for(let m in arr){
      if (arr[m].data.Learder != "" && arr[m].data.Learder != auth.currentUser.uid){
        leaders.push(arr[m].data.Learder)
      }
    }

    let temporary = [];
    fetch(leaders, setallMembers, temporary)
  }
  useEffect(async () => {
    getData()
    const docRef = doc(db, "KalCompany", "Users", "StaffMembers", auth.currentUser.uid);
    setmem(await getDoc(docRef));
  }, []);
  return (
    <UserLayout>
      <div className="flex min-h-screen justify-center bg-gray-100 p-6 pt-4">
        <div className="container mx-auto max-w-screen-lg">
          <form>
            <h2 className="pb-4 pt-0 text-xl font-semibold text-gray-600">
              Write Report
            </h2>
            <div className="mb-6 rounded bg-white p-4 px-4 shadow-sm md:p-8">
              <div className="grid grid-cols-1 gap-4 gap-y-2 text-sm lg:grid-cols-3">
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
                  <div className="grid grid-cols-1 gap-6 gap-y-5 text-sm md:grid-cols-6">
                    <div className="md:col-span-6">
                      <label htmlFor="full_name">Report Title</label>
                      <input
                        type="text"
                        name="report_title"
                        className="mt-1 h-10 w-full rounded border bg-gray-50 px-4"
                        id="task_title"
                        placeholder="enter report title"
                        value={data.Title}
                        onChange={(e) => {
                          setData({ ...data, Title: e.target.value });
                          // setData({...data, Detail:reportDetail})
                        }}
                      />
                    </div>

                    <div className="md:col-span-6">
                      <label htmlFor="detail">Detail Description</label>
                      <QuillNoSSRWrapper
                        theme="snow"
                        value={reportDetail}
                        onChange={(e) => {
                          {
                            setReportDetail(e.slice(3, e.lastIndexOf("</p>")));
                            // setData({...data, Detail:reportDetail});
                          }
                        }}
                        placeholder="Write some description about the report"
                        style={{ height: 180 }}
                      />
                    </div>
                    <div className="mt-10 md:col-span-6 ">
                      <label htmlFor="address">Submitted To:</label>
                      <Select
                        // ref={selectInputRef}
                        isMulti
                        name="members"
                        id="assigned"
                        options={allMembers.map((member) => {
                          return {
                            label: member,
                            value: member,
                          };
                        })}
                        onChange={(selectedMembers) => {
                          setMembers(
                            selectedMembers.map((member) => member.value)
                          );
                          setData({
                            ...data,
                            ReportTo: selectedMembers.map(
                              (member) => member.value
                            ),
                          });
                          // setData({...data, Detail:reportDetail});
                          // selectedMembers.map(member => {
                          //   temp.push({Reports:member.Reports, value:member.value, id:member.id})
                          // });
                          // setassignedto(Array.from(new Set(temp)))

                          if (
                            assigned &&
                            assigned.classList.contains("ring-red-600")
                          ) {
                            assigned.classList.remove("ring-red-600");
                            assigned.classList.remove("ring-2");
                            assigned.placeholder =
                              "search for a member or a group";
                          }
                        }}
                      />
                    </div>
                    <div className="md:col-span-6 ">
                      <label htmlFor="full_name">Attach File</label>
                      <input
                        type="file"
                        name="attach_file"
                        className="mt-1 h-10 w-full rounded border bg-gray-50 px-4"
                        id="attach_file"
                        placeholder="Attach File"
                        onChange={(e) => {
                          setSendFile(e.target.files[0]);
                        }}
                      />
                    </div>
                    {progress && (
                      <div className="md:col-span-3">
                        <label htmlFor="address">Progress</label>
                        <input
                          type="text"
                          id="progress"
                          className="mt-1 h-10 w-full rounded-lg border bg-gray-50 px-4"
                          value={progress}
                          disabled
                        />
                      </div>
                    )}

                    <div className="ml-auto text-right md:col-span-6">
                      <div className="inline-flex items-end justify-end">
                        <div className="flex-row gap-10 pt-6">
                          <button className="text-balck mr-6 rounded border-b-2 bg-gray-300 px-4 py-2 font-bold hover:bg-primary">
                            Cancel
                          </button>
                          <button
                            className="rounded bg-primary px-4 py-2 font-bold text-white hover:bg-bold"
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
