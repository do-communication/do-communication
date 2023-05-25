import UserLayout from "@/components/layouts/UserLayout/UserLayout";
import { toast } from "react-toastify";
import { useState } from "react";

const AddReport = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("submit");

        toast.success("Report submitted successfully");
    }

    return(
        <UserLayout>
            <div className="min-h-screen p-6 pt-8 bg-gray-100 flex  justify-center">
                <div className="container max-w-screen-lg mx-auto">
                    <form>
                        <h2 className="font-semibold text-xl text-gray-600 pb-4 pt-0">Write Report</h2>
                        <div className="bg-white rounded shadow-sm p-4 px-4 md:p-8 mb-6">
                            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                                <div className="text-gray-600">
                                    <p className="font-medium text-lg pb-3 pl-4">Report</p>
                                    <img src="/images/task.svg" alt="form" width={250} height={800} className="pt-10 sm:pb-3" />
                                </div>
                                <div className="lg:col-span-2 ">
                                    <div className="grid gap-6 gap-y-5 text-sm grid-cols-1 md:grid-cols-6">
                                        <div className="md:col-span-6">
                                            <label for="full_name">Report Title</label>
                                            <input
                                            type="text"
                                            name="report_title"
                                            id="task_title"
                                            className="h-10 border mt-1 rounded px-4  w-full bg-gray-50"
                                            />
                                        </div>
                                        <div className="md:col-span-6">
                                            <label for="detail">Detail Description</label>
                                            <textarea
                                            type="text"
                                            name="description"
                                            id="description"
                                            className="h-40 border mt-1 rounded px-4 w-full bg-gray-50"
                                            placeholder="Write some description about the report"
                                            rows={16} cols={50}
                                            />
                                        </div>
                                        <div className="md:col-span-6 text-right ml-auto">
                                            <div className="inline-flex items-end justify-end">
                                                <div className="flex-row gap-10 pt-8">
                                                    <button 
                                                    className="bg-gray-300 hover:bg-primary text-balck  font-bold py-2 px-4 mr-6 rounded border-b-2"
                                                    
                                                    >
                                                    Cancel
                                                    </button>
                                                    <button 
                                                    className="bg-primary hover:bg-bold text-white font-bold py-2 px-4 rounded"
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