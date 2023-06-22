import AdminLayout from "@/components/layouts/UserLayout/UserLayout";
import { useState, useEffect } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "react-toastify";
// import React,{useEffect,useState} from "react";
import Avatar from "react-avatar-edit";
import { auth } from "../../../../config/firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../../../../context/DbContext";
import {
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import useFetch from "@/components/useFetch";

const Profile = () => {
  const [src, setSrc] = useState(null);
  const [preview, setPreview] = useState(null);
  const { GetUser } = useFetch("KalCompany");
  const [picture, setPicture] = useState(null);
  const [progress, setProgress] = useState("");
  const [password, setPassword] = useState({});

  const handleSubmitPassword = async () => {
    const usr = auth.currentUser;

    const credential = EmailAuthProvider.credential(
      usr.email,
      password.oldPassword
    );

    if (password.confirmPassword === password.newPassword) {
      reauthenticateWithCredential(usr, credential)
        .then(() => {
          updatePassword(usr, password.newPassword)
            .then(() => {
              toast.success("Password updated successfully");
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
          toast.error("Old password incorrect!");
        });
    } else {
      toast.error("New password and Confirm password dont match!");
    }
  };

  const getData = async () => {
    setUser(await GetUser(auth.currentUser.uid));
  };

  const onClose = () => {
    setPreview(null);
  };
  const onCrop = (view) => {
    setPreview(view);
  };
  const [user, setUser] = useState({});

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleChangePassword = (e) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
  };

  // const setImage = () => {
  //     setPreview(view);

  // };

  const convertToFile = async (dataUrl) => {
    const res = await fetch(dataUrl);
    const blob = await res.blob();
    let newFile = new File([blob], "profilePic", { type: "image/jpeg" });
    return newFile;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await UploadFile();
    console.log("User profile updated:", user);
  };

  const [showAvatar, setShowAvatar] = useState(true);
  const [unshowAvatar, setunShowAvatar] = useState(false);

  const handleChangePicture = async () => {
    if (preview != null) {
      setSrc(preview);
      setPicture(await convertToFile(preview));
      // setSrc(null); // Clear the current picture
      setShowAvatar(false); // Hide the Avatar
      setunShowAvatar(true);
    }
  };
  const changePicture = (view) => {
    // setPreview(view);
    // setSrc(preview);
    setunShowAvatar(false);
    setSrc(null);
    setShowAvatar(true);
  };

  useEffect(() => {
    getData();
  }, []);

  const UploadFile = async (e) => {
    if (picture !== null) {
      const storage = getStorage();
      console.log(storage);
      const storageRef = ref(
        storage,
        auth.currentUser.uid + "/" + picture.name
      );
      const uploadTask = uploadBytesResumable(storageRef, picture);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          setProgress(
            picture.name +
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
            await setDoc(
              doc(
                db,
                "KalCompany",
                "Users",
                "StaffMembers",
                auth.currentUser.uid
              ),
              { ...user, ProfilePic: downloadURL }
            );

            document.getElementById("progress").value = "";

            setProgress("");
            changePicture();

            toast.success("Profile updated successfully");
          });
        }
      );
    } else {
      await setDoc(
        doc(db, "KalCompany", "Users", "StaffMembers", auth.currentUser.uid),
        user
      );
      toast.success("Profile updated successfully");
    }
  };

  return (
    <AdminLayout>
      <div className="flex min-h-screen justify-center bg-gray-100 p-6 pt-8">
        <div className="container mx-auto max-w-screen-lg">
          <div>
            <h2 className="pb-4 pt-0 text-xl font-semibold text-gray-600">
              Profile
            </h2>

            <div className="mb-6 rounded bg-white p-4 px-4 shadow-sm md:p-8">
              <div className="grid grid-cols-1 justify-center gap-4 gap-y-2 text-sm lg:grid-cols-3">
                <div className="justify-center text-gray-600">
                  {showAvatar ? (
                    <Avatar
                      width={300}
                      height={360}
                      onCrop={onCrop}
                      onClose={onClose}
                      src={src}
                    />
                  ) : (
                    <img
                      src={preview}
                      alt="Cropped"
                      className="pt-10 sm:pb-3"
                    />
                  )}
                  {showAvatar && (
                    <button
                      className="ml-20 mt-5 rounded bg-primary px-4 py-2 font-bold text-white hover:bg-bold"
                      onClick={handleChangePicture}
                    >
                      Upload Picture
                    </button>
                  )}
                  {unshowAvatar && (
                    <button
                      className="ml-20 mt-5 rounded bg-primary px-4 py-2 font-bold text-white hover:bg-bold"
                      onClick={changePicture}
                    >
                      Upload New
                    </button>
                  )}
                </div>

                <div className="pl-6 lg:col-span-2">
                  <div className="grid grid-cols-1 gap-6 gap-y-5 text-sm md:grid-cols-5">
                    <div className="md:col-span-5">
                      <label htmlFor="full_name" className="flex pr-10">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="Name"
                        id="Name"
                        className="mt-1 h-10 w-full rounded border bg-gray-50 px-4"
                        value={user.Name}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="md:col-span-5">
                      <label htmlFor="company_name" className="flex pr-10">
                        Department
                      </label>
                      <input
                        type="text"
                        name="Department"
                        id="Department"
                        className="mt-1 h-10 w-full rounded border bg-gray-50 px-4"
                        value={user.Department}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="md:col-span-5">
                      <label htmlFor="full_name" className="flex pr-10">
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        name="DateOfBirth"
                        id="DateOfBirth"
                        className="mt-1 h-10 w-full rounded border bg-gray-50 px-4"
                        value={user.DateOfBirth}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="md:col-span-5">
                      <label htmlFor="full_name" className="flex pr-10">
                        Phone Number
                      </label>
                      <input
                        type="text"
                        name="PhoneNumber"
                        id="PhoneNumber"
                        className="mt-1 h-10 w-full rounded border bg-gray-50 px-4"
                        value={user.PhoneNumber}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="md:col-span-5">
                      <label htmlFor="full_name" className="flex pr-10">
                        Gender
                      </label>
                      <input
                        type="text"
                        name="Gender"
                        id="Gender"
                        className="mt-1 h-10 w-full rounded border bg-gray-50 px-4"
                        value={user.Gender}
                        onChange={handleChange}
                        maxLength={1}
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
                        <div className="flex-row gap-10 pt-8">
                          <button className="text-balck mr-6 rounded border-b-2 bg-gray-300 px-4 py-2 font-bold hover:bg-primary">
                            Cancel
                          </button>
                          <button
                            disabled={
                              !user.Name ||
                              !user.Department ||
                              !user.PhoneNumber ||
                              !user.DateOfBirth ||
                              !user.Gender
                            }
                            onClick={handleSubmit}
                            className="rounded bg-primary px-4 py-2 font-bold text-white hover:bg-bold"
                          >
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

          {/* password change */}
          <div>
            <h2 className="pb-4 pt-0 text-xl font-semibold text-gray-600">
              Password
            </h2>

            <div className="mb-6 rounded bg-white p-4 px-4 shadow-sm md:p-8">
              <div className="grid grid-cols-1 justify-center gap-4 gap-y-2 text-sm lg:grid-cols-3">
                <img
                  src="/images/password.svg"
                  alt="form"
                  width={250}
                  height={800}
                  className="pt-10 sm:pb-3"
                />

                <div className="pl-6 lg:col-span-2">
                  <div className="grid grid-cols-1 gap-6 gap-y-5 text-sm md:grid-cols-5">
                    <div className="md:col-span-5">
                      <label htmlFor="full_name" className="flex pr-10">
                        Old Password
                      </label>
                      <input
                        type="password"
                        name="oldPassword"
                        id="oldPassword"
                        value={password.oldPassword}
                        className="mt-1 h-10 w-full rounded border bg-gray-50 px-4"
                        onChange={handleChangePassword}
                      />
                    </div>
                    <div className="md:col-span-5">
                      <label htmlFor="company_name" className="flex pr-10">
                        New Password
                      </label>
                      <input
                        type="password"
                        name="newPassword"
                        id="newPassword"
                        value={password.newPassword}
                        className="mt-1 h-10 w-full rounded border bg-gray-50 px-4"
                        onChange={handleChangePassword}
                      />
                    </div>
                    <div className="md:col-span-5">
                      <label htmlFor="full_name" className="flex pr-10">
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        value={password.confirmPassword}
                        className="mt-1 h-10 w-full rounded border bg-gray-50 px-4"
                        onChange={handleChangePassword}
                      />
                    </div>

                    <div className="ml-auto text-right md:col-span-6">
                      <div className="inline-flex items-end justify-end">
                        <div className="flex-row gap-10 pt-8">
                          <button className="text-balck mr-6 rounded border-b-2 bg-gray-300 px-4 py-2 font-bold hover:bg-primary">
                            Cancel
                          </button>
                          <button
                            disabled={
                              !password.oldPassword ||
                              !password.newPassword ||
                              !password.confirmPassword
                            }
                            onClick={handleSubmitPassword}
                            className="rounded bg-primary px-4 py-2 font-bold text-white hover:bg-bold"
                          >
                            Change
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
      </div>
    </AdminLayout>
  );
};

export default Profile;
