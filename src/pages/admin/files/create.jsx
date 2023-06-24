import AdminLayout from "@/components/layouts/AdminLayout/AdminLayout";
import Select from "react-select";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { auth } from "../../../../config/firebase";
import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../../../context/DbContext";
import { serverTimestamp } from "@firebase/firestore";
import { toast } from "react-toastify";

const AddFile = () => {
  const [sendFile, setSendFile] = useState(null);
  const [FileName, setFileName] = useState("");
  const [Discription, setDiscription] = useState("");
  const [progress, setProgress] = useState("");
  const [shelfLocation, setShelfLocation] = useState("none");

  const UploadFile = async (e) => {
    if (sendFile !== null) {
      const storage = getStorage();
      console.log(storage);
      const storageRef = ref(storage, auth.currentUser.uid + "/" + FileName);
      const uploadTask = uploadBytesResumable(storageRef, sendFile);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          setProgress(
            FileName +
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
            await addDoc(
              collection(db, "KalCompany", "Files", auth.currentUser.uid),
              {
                FileName: FileName,
                CreatedAt: serverTimestamp(),
                Owner: auth.currentUser.uid,
                SenderName: auth.currentUser.displayName,
                Description: Discription,
                url: downloadURL,
                ShelfLocation: shelfLocation,
              }
            );

            document.getElementById("type").value = "";
            document.getElementById("full_name").value = "";
            document.getElementById("file").value = [];
            document.getElementById("progress").value = "";
            document.getElementById("shelfLocation").value = "";

            setProgress("");
            setFileName("");
            setDiscription("");
            setSendFile(null);
            setShelfLocation("none");

            e.preventDefault();
            console.log("submit");

            // e.target.reset();

            toast.success("File uploaded successfully");
          });
        }
      );
    }
  };
  return (
    <AdminLayout>
      <div className="flex justify-center min-h-screen p-6 pt-8 bg-gray-100">
        <div className="container max-w-screen-lg mx-auto">
          <div>
            <h2 className="pt-0 pb-4 text-xl font-semibold text-gray-600">
              Add File
            </h2>

            <div className="p-4 px-4 mb-6 bg-white rounded shadow-sm md:p-8">
              <div className="grid grid-cols-1 gap-4 text-sm gap-y-2 lg:grid-cols-3">
                <div className="text-gray-600">
                  <p className="pb-3 pl-4 text-lg font-medium">File Details</p>
                  <img
                    src="/images/addfile.svg"
                    alt="form"
                    width={235}
                    height={600}
                    className="pt-4 sm:pb-3"
                  />
                </div>

                <div className="lg:col-span-2 ">
                  <div className="grid grid-cols-1 gap-6 text-sm gap-y-7 md:grid-cols-6">
                    <div className="md:col-span-3">
                      <label htmlFor="full_name">File Name</label>
                      <input
                        type="text"
                        name="file_name"
                        id="full_name"
                        className="w-full h-10 px-4 mt-1 border rounded bg-gray-50"
                        onChange={(e) => setFileName(e.target.value)}
                      />
                    </div>

                    <div className="md:col-span-3">
                      <label htmlFor="shelfLocation">Shelf Location</label>
                      <input
                        type="text"
                        name="shelfLocation"
                        id="shelfLocation"
                        className="w-full h-10 px-4 mt-1 border rounded bg-gray-50"
                        placeholder="none"
                        onChange={(e) => setShelfLocation(e.target.value)}
                      />
                    </div>
                    <div className="md:col-span-3">
                      <label htmlFor="type">Description</label>
                      <textarea
                        name="type"
                        id="type"
                        className="w-full h-24 px-4 mt-1 border rounded bg-gray-50"
                        placeholder=" "
                        onChange={(e) => setDiscription(e.target.value)}
                      />
                    </div>

                    <div className="md:col-span-3">
                      <label htmlFor="file">Upload File</label>
                      <div className="flex items-center h-10 mt-1 border border-gray-200 rounded bg-gray-50">
                        <input
                          type="file"
                          name="file"
                          id="file"
                          placeholder=" "
                          className="w-full p-2 px-4 text-sm text-gray-500 bg-transparent border-none outline-none appearance-none"
                          onChange={(e) => setSendFile(e.target.files[0])}
                        />
                      </div>
                    </div>

                    {progress && (
                      <div className="md:col-span-3">
                        <label htmlFor="progress">Progress</label>
                        <input
                          type="text"
                          id="progress"
                          className="w-full h-10 px-4 mt-1 border rounded-lg bg-gray-50"
                          value={progress}
                          disabled
                        />
                      </div>
                    )}

                    <div className="mb-10 ml-auto text-right md:col-span-6">
                      <div className="inline-flex items-end justify-end">
                        <div className="flex-row gap-10 pt-2">
                          <button className="px-4 py-2 mr-6 font-bold bg-gray-300 border-b-2 rounded text-balck hover:bg-primary">
                            Cancel
                          </button>
                          <button
                            disabled={
                              !FileName ||
                              !Discription ||
                              !sendFile ||
                              !shelfLocation
                            }
                            onClick={(e) => UploadFile(e)}
                            className="px-4 py-2 font-bold text-white rounded bg-primary hover:bg-bold"
                          >
                            Upload
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* </form> */}
      </div>
    </AdminLayout>
  );
};

export default AddFile;
