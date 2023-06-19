import AdminLayout from "@/components/layouts/AdminLayout/AdminLayout";
import { useState } from "react";
import useFetch from "@/components/useFetch";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "react-toastify"
// import React,{useEffect,useState} from "react";
import Avatar from "react-avatar-edit";


const Profile = () => {
    const [src, setSrc] = useState(null);
    const [preview, setPreview] = useState(null);
    const { GetAdmin } = useFetch("KalCompany")


    const onClose = () => {
        setPreview(null);
    }
    const onCrop = view => {
        setPreview(view);
    }
    const [user, setUser] = useState({
        full_name: 'Anani Samuel',
        company_name: 'ananisamuelhope@gmail.com',
        dob: '11/11/2000',
        phone_number: '0977558899'
    });

    const handleChange = (e) => {
        setUser(
            { ...user, [e.target.name]: e.target.value }
        );
    };

    const setImage = () => {
        setPreview(view);

    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('User profile updated:', user);
    }

    const [showAvatar, setShowAvatar] = useState(true);
    const [unshowAvatar, setunShowAvatar] = useState(false);


    const handleChangePicture = () => {
        if (preview != null) {
            setSrc(preview);
            // setSrc(null); // Clear the current picture
            setShowAvatar(false); // Hide the Avatar
            setunShowAvatar(true);
        }
    };
    const changePicture = view => {
        // setPreview(view);
        // setSrc(preview);
        setunShowAvatar(false);
        setSrc(null);
        setShowAvatar(true);
        setPreview(null)
    }


    return (
        <AdminLayout>
            <div className="flex justify-center min-h-screen p-6 pt-8 bg-gray-100">
                <div className="container max-w-screen-lg mx-auto">
                    <div>
                        <h2 className="pt-0 pb-4 text-xl font-semibold text-gray-600">
                            Profile
                        </h2>

                        <div className="p-4 px-4 mb-6 bg-white rounded shadow-sm md:p-8">
                            <div className="grid grid-cols-1 gap-4 text-sm gap-y-2 lg:grid-cols-3 justify-center">
                                <div className="text-gray-600 justify-center">

                                    {showAvatar ? (
                                        <Avatar
                                            width={300}
                                            height={360}
                                            onCrop={onCrop}
                                            onClose={onClose}
                                            src={src}
                                        />
                                    ) : (
                                        <div className=" justify-center">
                                            <img
                                                src={preview}
                                                alt="Cropped"
                                                className="pt-10 sm:pb-3 justify-center"
                                            /></div>
                                    )}
                                    {showAvatar && (
                                        <button
                                            className="ml-20 mt-5 px-4 py-2 font-bold text-white rounded bg-primary hover:bg-bold"
                                            onClick={handleChangePicture}
                                        >
                                            Upload Picture
                                        </button>
                                    )}
                                    {unshowAvatar && (
                                        <button
                                            className="ml-20 mt-5 px-4 py-2 font-bold text-white rounded bg-primary hover:bg-bold"
                                            onClick={changePicture}
                                        >
                                            Upload New</button>
                                    )}
                                </div>

                                <div className="pl-6 lg:col-span-2">
                                    <div className="grid grid-cols-1 gap-6 text-sm gap-y-5 md:grid-cols-5">
                                        <div className="md:col-span-5">
                                            <label htmlFor="full_name" className="flex pr-10">Full Name</label>
                                            <input
                                                type="text"
                                                name="full_name"
                                                id="full_name"
                                                className="w-full h-10 px-4 mt-1 border rounded bg-gray-50"
                                                value={user.full_name}
                                                onChange={handleChange}

                                            />
                                        </div>
                                        <div className="md:col-span-5">
                                            <label htmlFor="company_name" className="flex pr-10">Company Name</label>
                                            <input
                                                type="text"
                                                name="company_name"
                                                id="company_name"
                                                className="w-full h-10 px-4 mt-1 border rounded bg-gray-50"
                                                value={user.company_name}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="md:col-span-5">
                                            <label htmlFor="full_name" className="flex pr-10">Date of Birth</label>
                                            <input
                                                type="date"
                                                name="date_of_birth"
                                                id="date_of_birth"
                                                className="w-full h-10 px-4 mt-1 border rounded bg-gray-50"
                                            />
                                        </div>
                                        <div className="md:col-span-5">
                                            <label htmlFor="full_name" className="flex pr-10">Phone Number</label>
                                            <input
                                                type="text"
                                                name="phone_number"
                                                id="phone_number"
                                                className="w-full h-10 px-4 mt-1 border rounded bg-gray-50"
                                                value={user.phone_number}
                                                onChange={handleChange}
                                            />
                                        </div>

                                        <div className="ml-auto text-right md:col-span-6">
                                            <div className="inline-flex items-end justify-end">
                                                <div className="flex-row gap-10 pt-8">
                                                    <button className="px-4 py-2 mr-6 font-bold bg-gray-300 border-b-2 rounded hover:bg-primary text-balck">
                                                        Cancel
                                                    </button>
                                                    <button className="px-4 py-2 font-bold text-white rounded bg-primary hover:bg-bold">
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
                        <h2 className="pt-0 pb-4 text-xl font-semibold text-gray-600">
                            Password
                        </h2>

                        <div className="p-4 px-4 mb-6 bg-white rounded shadow-sm md:p-8">
                            <div className="grid grid-cols-1 gap-4 text-sm gap-y-2 lg:grid-cols-3 justify-center">
                                <img
                                    src="/images/password.svg"
                                    alt="form"
                                    width={250}
                                    height={800}
                                    className="pt-10 sm:pb-3"
                                />

                                <div className="pl-6 lg:col-span-2">
                                    <div className="grid grid-cols-1 gap-6 text-sm gap-y-5 md:grid-cols-5">

                                        <div className="md:col-span-5">
                                            <label htmlFor="full_name" className="flex pr-10">Old Password</label>
                                            <input
                                                type="password"
                                                name="old_password"
                                                id="old_password"
                                                className="w-full h-10 px-4 mt-1 border rounded bg-gray-50"
                                            />
                                        </div>
                                        <div className="md:col-span-5">
                                            <label htmlFor="company_name" className="flex pr-10">New Password</label>
                                            <input
                                                type="password"
                                                name="new_password"
                                                id="new_password"
                                                className="w-full h-10 px-4 mt-1 border rounded bg-gray-50"
                                            />
                                        </div>
                                        <div className="md:col-span-5">
                                            <label htmlFor="full_name" className="flex pr-10">Confirm Password</label>
                                            <input
                                                type="password"
                                                name="confirm_password"
                                                id="confirm_password"
                                                className="w-full h-10 px-4 mt-1 border rounded bg-gray-50"
                                            />
                                        </div>


                                        <div className="ml-auto text-right md:col-span-6">
                                            <div className="inline-flex items-end justify-end">
                                                <div className="flex-row gap-10 pt-8">
                                                    <button className="px-4 py-2 mr-6 font-bold bg-gray-300 border-b-2 rounded hover:bg-primary text-balck">
                                                        Cancel
                                                    </button>
                                                    <button className="px-4 py-2 font-bold text-white rounded bg-primary hover:bg-bold">
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