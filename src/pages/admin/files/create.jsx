import AdminLayout from "@/components/layouts/AdminLayout/AdminLayout";
import Select from 'react-select'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { auth } from "../../../../config/firebase";
import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../../../context/DbContext"
import { serverTimestamp } from '@firebase/firestore'
import { toast } from "react-toastify";


const AddFile = () => {

  const [sendFile, setSendFile] = useState(null);
  const [FileName, setFileName] = useState("");
  const [Discription, setDiscription] = useState("");
  const [progress, setProgress] = useState("");

  const UploadFile = async (e) => {

    if (sendFile !== null) {

      const storage = getStorage();
      const storageRef = ref(storage, auth.currentUser.uid + "/" + FileName);
      const uploadTask = uploadBytesResumable(storageRef, sendFile)

      uploadTask.on('state_changed',
        (snapshot) => {

          setProgress(FileName + "  " + (Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100)) + '% Done');

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
            await addDoc(collection(db, "KalCompany", "Files", auth.currentUser.uid), {
              FileName: FileName,
              CreatedAt: serverTimestamp(),
              Owner: auth.currentUser.uid,
              SenderName: auth.currentUser.displayName,
              Description: Discription,
              url: downloadURL
            });

            document.getElementById('type').value = '';
            document.getElementById('full_name').value = '';
            document.getElementById('file').value = [];
            document.getElementById('progress').value = "";

            setProgress('');
            setFileName('');
            setDiscription('');
            setSendFile(null);

            e.preventDefault();
            console.log("submit");

            // e.target.reset();

            toast.success("File uploaded successfully");
          });

        }
      );
    }
  }
  return (
    <AdminLayout>
      <div className="min-h-screen p-6 pt-8 bg-gray-100 flex  justify-center">
        <div className="container max-w-screen-lg mx-auto">
          <div>
            <h2 className="font-semibold text-xl text-gray-600 pb-4 pt-0">Add File</h2>

            <div className="bg-white rounded shadow-sm p-4 px-4 md:p-8 mb-6">
              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                <div className="text-gray-600">
                  <p className="font-medium text-lg pb-3 pl-4">File Details</p>
                  <img src="/images/addfile.svg" alt="form" width={235} height={600} className="pt-4 sm:pb-3" />
                </div>

                <div className="lg:col-span-2 ">
                  <div className="grid gap-6 gap-y-7 text-sm grid-cols-1 md:grid-cols-6">
                    <div className="md:col-span-3">
                      <label for="full_name">File Name</label>
                      <input
                        type="text"
                        name="file_name"
                        id="full_name"
                        className="h-10 border mt-1 rounded px-4  w-full bg-gray-50"
                        onChange={(e) => setFileName(e.target.value)}
                      />
                    </div>

                    {/* <div className="md:col-span-3">
                      <label for="address">Owner</label>
                      <input
                        type="text"
                        name="owner"
                        id="owner"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        placeholder=""
                      />
                    </div> */}
                    <div className="md:col-span-3">
                      <label for="email">Description</label>
                      <textarea

                        name="type"
                        id="type"
                        className="border mt-1 rounded px-4 w-full  h-24 bg-gray-50"
                        placeholder=" "
                        onChange={(e) => setDiscription(e.target.value)}
                      />
                    </div>

                    <div className="md:col-span-3">
                      <label for="state">Upload File</label>
                      <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                        <input
                          type="file"
                          name="file"
                          id="file"
                          placeholder=" "
                          className="px-4 appearance-none outline-none  text-gray-500 p-2 w-full bg-transparent text-sm border-none"
                          onChange={(e) => setSendFile(e.target.files[0])}
                        />
                      </div>
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


                    <div className="md:col-span-6 mb-10 text-right ml-auto">
                      <div className="inline-flex items-end justify-end">
                        <div className="flex-row gap-10 pt-2">
                          <button className="bg-gray-300 hover:bg-primary text-balck  font-bold py-2 px-4 mr-6 rounded border-b-2">
                            Cancel
                          </button>
                          <button onClick={(e) => UploadFile(e)} className="bg-primary hover:bg-bold text-white font-bold py-2 px-4 rounded">
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
