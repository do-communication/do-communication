import AdminLayout from "@/components/layouts/AdminLayout/AdminLayout";
import Select from 'react-select'
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { auth } from "../../../../../../config/firebase";
import { useState } from "react";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../../../../../../context/DbContext";
import { serverTimestamp } from "@firebase/firestore";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import useFetch from "@/components/useFetch";
import { useEffect } from "react";

const AddFile = () => {
  const router = useRouter();

  const fileId = router.query.id;

  const [sendFile, setSendFile] = useState(null);
  const [FileName, setFileName] = useState("");
  const [Discription, setDiscription] = useState("");
  const [progress, setProgress] = useState("");
  const [shelfLocation, setShelfLocation] = useState("none");
  const { GetFile } = useFetch("KalCompany");
  const [oldFileName, setOldFileName] = useState("");

  const getData = () => {
    GetFile(auth.currentUser.uid, fileId).then((file) => {
      setOldFileName(file.FileName);
      setFileName(file.FileName);
      setDiscription(file.Description);
      setShelfLocation(file.ShelfLocation);
    })
  }

  useEffect(() => {
    getData();
  }, [])

  const UploadFile = async (e) => {
    if (sendFile !== null) {
      const storage = getStorage();

      const deleteRef = ref(storage, auth.currentUser.uid + "/" + oldFileName);
      // Delete the file
      deleteObject(deleteRef).then(() => {
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
              await setDoc(doc(db, "KalCompany", "Files", auth.currentUser.uid, fileId), {
                FileName: FileName,
                CreatedAt: serverTimestamp(),
                Owner: auth.currentUser.uid,
                SenderName: auth.currentUser.displayName,
                Description: Discription,
                url: downloadURL,
                ShelfLocation: shelfLocation
              });

              document.getElementById('type').value = '';
              document.getElementById('full_name').value = '';
              document.getElementById('file').value = [];
              document.getElementById('progress').value = "";
              document.getElementById("shelfLocation").value = "";

              setProgress('');
              setFileName('');
              setDiscription('');
              setSendFile(null);
              setShelfLocation("none")

              e.preventDefault();
              console.log("submit");

              // e.target.reset();

              toast.success("File Updated successfully");
            });

          }
        );
      }).catch((error) => {
        console.log(error)
      });
    }
  };
  return (
    <AdminLayout>
      <div className="flex min-h-screen justify-center bg-gray-100 p-6  pt-8">
        <div className="container mx-auto max-w-screen-lg">
          <div>
            <h2 className="pb-4 pt-0 text-xl font-semibold text-gray-600">
              Edit File
            </h2>

            <div className="mb-6 rounded bg-white p-4 px-4 shadow-sm md:p-8">
              <div className="grid grid-cols-1 gap-4 gap-y-2 text-sm lg:grid-cols-3">
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
                  <div className="grid grid-cols-1 gap-6 gap-y-7 text-sm md:grid-cols-6">
                    <div className="md:col-span-3">
                      <label htmlFor="full_name">File Name</label>
                      <input
                        type="text"
                        name="file_name"
                        id="full_name"
                        className="mt-1 h-10 w-full rounded border  bg-gray-50 px-4"
                        onChange={(e) => setFileName(e.target.value)}
                        value={FileName}
                      />
                    </div>

                    <div className="md:col-span-3">
                      <label htmlFor="shelfLocation">Shelf Location</label>
                      <input
                        type="text"
                        name="shelfLocation"
                        id="shelfLocation"
                        className="mt-1 h-10 w-full rounded border bg-gray-50 px-4"
                        placeholder="none"
                        onChange={(e) => setShelfLocation(e.target.value)}
                        value={shelfLocation}
                      />
                    </div>
                    <div className="md:col-span-3">
                      <label htmlFor="type">Description</label>
                      <textarea
                        name="type"
                        id="type"
                        className="mt-1 h-24 w-full rounded border  bg-gray-50 px-4"
                        placeholder=" "
                        onChange={(e) => setDiscription(e.target.value)}
                        value={Discription}
                      />
                    </div>

                    <div className="md:col-span-3">
                      <label htmlFor="file">Upload File</label>
                      <div className="mt-1 flex h-10 items-center rounded border border-gray-200 bg-gray-50">
                        <input
                          type="file"
                          name="file"
                          id="file"
                          placeholder=" "
                          className="w-full appearance-none border-none  bg-transparent p-2 px-4 text-sm text-gray-500 outline-none"
                          onChange={(e) => setSendFile(e.target.files[0])}
                        />
                      </div>
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

                    <div className="mb-10 ml-auto text-right md:col-span-6">
                      <div className="inline-flex items-end justify-end">
                        <div className="flex-row gap-10 pt-2">
                          <button className="text-balck mr-6 rounded  border-b-2 bg-gray-300 px-4 py-2 font-bold hover:bg-primary">
                            Cancel
                          </button>
                          <button
                            disabled={!FileName || !Discription || !sendFile || !shelfLocation}
                            onClick={(e) => UploadFile(e)} className="bg-primary hover:bg-bold text-white font-bold py-2 px-4 rounded">
                            Update
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
