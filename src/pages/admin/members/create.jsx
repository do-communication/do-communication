import AdminLayout from "@/components/layouts/AdminLayout/AdminLayout";
import { toast } from "react-toastify";

import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { db } from "../../../../context/DbContext";
import Router from "next/router";
import { generate } from "generate-password";
import { useAuth } from "../../../../context/AuthContext";
import { auth } from "../../../../config/firebase";
import emailjs from "@emailjs/browser";
import useFetch from "@/components/useFetch";
import { updateProfile } from "firebase/auth";

const router = Router;

const AddMember = () => {
  const { GetAdmin, GetCompanyName } = useFetch("KalCompany");
  const { signUp, logIn } = useAuth();
  const [data, setData] = useState({
    Name: "",
    Address: "",
    Email: "",
    Gender: "",
    Department: "",
    PhoneNumber: "",
    DateOfBirth: new Date("10/10/2030"),
    ProfilePic: "",
    RegisteredAt: new Date().toDateString(),
    GroupId: [],
    Reports: [],
    Tasks: [],
  });
  const select = document.getElementById("selectGender");
  const email = document.getElementById("email");
  const name = document.getElementById("full_name");
  const address = document.getElementById("address");
  const phone = document.getElementById("phoneNumber");
  const department = document.getElementById("department");
  const dob = document.getElementById("dob");
  const date = document.getElementById("date");
  const pho = document.getElementById("pho");
  const dep = document.getElementById("dep");

  select &&
    select.addEventListener("change", function handleChange(event) {
      setData({
        ...data,
        Gender: event.target.value,
      });
      if (select && select.classList.contains("ring-red-600")) {
        select.classList.remove("ring-red-600");
        select.classList.remove("ring-2");
      }
    });

  const sendEmail = async (password, adminId, toName, toEmail) => {
    GetAdmin(adminId)
      .then((admin) => {
        const templateParams = {
          from_name: admin.CompanyName,
          to_name: toName,
          email_address: toEmail,
          password: password,
          admin_name: admin.Name,
        };

        emailjs
          .send(
            "service_uerr5ct",
            "template_8jjq65l",
            templateParams,
            "e50BbMlytQDi-Ulw1"
          )
          .then(
            (response) => {
              console.log("SUCCESS!", response.status, response.text);
            },
            (error) => {
              console.log("FAILED...", error);
            }
          );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleName = (e) => {
    e.preventDefault();
    setData({
      ...data,
      Name: e.target.value,
    });
    if (name && name.classList.contains("ring-red-600")) {
      name.classList.remove("ring-red-600");
      name.classList.remove("ring-2");
      name.placeholder = "";
    }
  };
  const handleEmail = (e) => {
    e.preventDefault();
    setData({
      ...data,
      Email: e.target.value,
    });
    if (email && email.classList.contains("ring-red-600")) {
      email.classList.remove("ring-red-600");
      email.classList.remove("ring-2");
      email.placeholder = "email@employee.com";
    }
  };
  const handleAddress = (e) => {
    e.preventDefault();
    setData({
      ...data,
      Address: e.target.value,
    });
    if (address && address.classList.contains("ring-red-600")) {
      address.classList.remove("ring-red-600");
      address.classList.remove("ring-2");
      address.placeholder = "";
    }
  };
  const handleDepartment = (e) => {
    e.preventDefault();
    setData({
      ...data,
      Department: e.target.value,
    });
    if (department && department.classList.contains("ring-red-600")) {
      department.classList.remove("ring-red-600");
      department.classList.remove("ring-2");
      department.placeholder = "Department";
    }
  };
  const handlePhone = (e) => {
    e.preventDefault();
    setData({
      ...data,
      PhoneNumber: e.target.value,
    });
    if (phone && phone.classList.contains("ring-red-600")) {
      phone.classList.remove("ring-red-600");
      phone.classList.remove("ring-2");
      phone.placeholder = "+251 9";
    }
  };
  const handleDob = (e) => {
    e.preventDefault();
    setData({
      ...data,
      DateOfBirth: e.target.value,
    });
    if (dob && dob.classList.contains("ring-red-600")) {
      dob.classList.remove("ring-red-600");
      dob.classList.remove("ring-2");
      dob.placeholder = "MM/DD/YYYY";
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email && data.Email == "") {
      email.placeholder = "You should enter an Email address";
      email.classList.add("ring-red-600");
      email.classList.add("ring-2");
    }
    if (name && data.Name == "") {
      name.placeholder = "You should enter Full Name";
      name.classList.add("ring-red-600");
      name.classList.add("ring-2");
    }
    if (address && data.Address == "") {
      address.placeholder = "You should enter an Address";
      address.classList.add("ring-red-600");
      address.classList.add("ring-2");
    }
    if (department && data.Department == "") {
      department.placeholder = "You should enter a Department";
      department.classList.add("ring-red-600");
      department.classList.add("ring-2");
    }
    if (phone && data.PhoneNumber == "") {
      phone.placeholder = "You should fill out employee's phone number";
      phone.classList.add("ring-red-600");
      phone.classList.add("ring-2");
    }
    if (select && (data.Gender == "null" || data.Gender === "")) {
      select.classList.add("ring-red-600");
      select.classList.add("ring-2");
    }
    if (dob && data.DateOfBirth > new Date()) {
      dob.classList.add("ring-red-600");
      dob.classList.add("ring-2");
    }
    if (
      data.Name != "" &&
      data.Email != "" &&
      data.PhoneNumber != "" &&
      data.Address != "" &&
      data.Department != "" &&
      data.DateOfBirth != "" &&
      data.Gender != "null"
    ) {
      const password = generate({
        length: 8,
        lowercase: true,
        uppercase: true,
        numbers: true,
        symbols: true,
      });
      const email = auth.currentUser.email;
      const pass = auth.currentUser.photoURL;
      const adminId = auth.currentUser.uid;
      const company = await GetCompanyName();

      signUp(data.Email, password).then(async (cred) => {
        try {
          await setDoc(
            doc(db, "KalCompany", "Users", "StaffMembers", cred.user.uid),
            data
          );
          await updateProfile(auth.currentUser, {
            displayName: data.Name,
            photoURL: company.companyName,
          });
          logIn(email, pass);
          sendEmail(password, adminId, data.Name, data.Email);
          handleClear();
          toast.success("Member added successfully");
        } catch (errrr) {
          console.log(errrr);
        }
      });
    }
  };
  const handleClear = (e) => {
    name.value = "";
    data.Name = "";
    name.placeholder = "";
    email.value = "";
    data.Email = "";
    email.placeholder = "employee@gmail.com";
    address.value = "";
    data.Address = "";
    address.placeholder = "";
    pho.value = "";
    data.PhoneNumber = "";
    pho.placeholder = "+251 9";
    date.value = null;
    data.DateOfBirth = new Date("10/10/2030");
    date.placeholder = "MM/DD/YYYY";
    dep.value = "";
    data.Department = "";
    dep.placeholder = "Department";
    select.value = "null";
    data.Gender = "";
  };
  return (
    <AdminLayout>
      <div className="flex justify-center min-h-screen p-6 pt-8 bg-gray-100">
        <div className="container max-w-screen-lg mx-auto">
          <form>
            <h2 className="pt-0 pb-4 text-xl font-semibold text-gray-600">
              Add Member
            </h2>
            <div className="p-4 px-4 mb-6 bg-white rounded shadow-sm md:p-8">
              <div className="grid grid-cols-1 gap-4 text-sm gap-y-2 lg:grid-cols-3">
                <div className="text-gray-600">
                  <p className="pb-3 pl-4 text-lg font-medium">
                    Employee Details
                  </p>
                  <img
                    src="/images/form1.svg"
                    alt="form"
                    width={250}
                    height={800}
                    className="pt-10 sm:pb-3"
                  />
                </div>

                {/* <div className="p-4 px-4 mb-6 bg-white rounded shadow-sm md:p-8">
                  <div className="grid grid-cols-1 gap-4 text-sm gap-y-2 lg:grid-cols-3">
                    <div className="text-gray-600">
                      <p className="pb-3 pl-4 text-lg font-medium">Employee Details</p>
                      <img src="/images/form1.svg" alt="form" width={250} height={800} className="pt-10 sm:pb-3" />
                    </div> */}

                <div className="lg:col-span-2 ">
                  <div className="grid grid-cols-1 gap-6 text-sm gap-y-5 md:grid-cols-6">
                    <div className="md:col-span-3">
                      <label htmlFor="full_name">Full Name</label>
                      <input
                        onChange={handleName}
                        value={data.Name}
                        type="text"
                        name="full_name"
                        id="full_name"
                        className="w-full h-10 px-4 mt-1 border rounded bg-gray-50"
                      />
                    </div>

                    <div id="emailDiv" className="md:col-span-3">
                      <label htmlFor="email">Email Address</label>
                      <input
                        onChange={handleEmail}
                        type="text"
                        name="email"
                        value={data.Email}
                        id="email"
                        className="w-full h-10 px-4 mt-1 border rounded bg-gray-50"
                        placeholder="email@employee.com"
                      />
                    </div>

                    <div id="addressDiv" className="md:col-span-3">
                      <label htmlFor="address">Address</label>
                      <input
                        onChange={handleAddress}
                        type="text"
                        name="address"
                        value={data.Address}
                        id="address"
                        className="w-full h-10 px-4 mt-1 border rounded bg-gray-50"
                        placeholder=""
                      />
                    </div>

                    <div id="genderDiv" className="md:col-span-3">
                      <label htmlFor="Gender">Gender</label>
                      <select
                        id="selectGender"
                        className="w-full h-10 px-4 mt-1 border rounded bg-gray-50"
                      >
                        <option value="null">Select gender</option>
                        <option value="f">Female</option>
                        <option value="m">Male</option>
                      </select>
                    </div>

                    <div id="phoneDiv" className="md:col-span-3">
                      <label htmlFor="country">Phone Number</label>
                      <div
                        id="phoneNumber"
                        className="flex items-center h-10 mt-1 border border-gray-200 rounded bg-gray-50"
                      >
                        <input
                          onChange={handlePhone}
                          value={data.PhoneNumber}
                          type="tel"
                          id="pho"
                          pattern="[789][0-9]{9}"
                          required
                          name="country"
                          placeholder="+251 9 "
                          className="w-full px-4 text-gray-800 bg-transparent outline-none appearance-none"
                        />
                      </div>
                    </div>

                    <div className="md:col-span-3">
                      <label htmlFor="state">Department</label>
                      <div
                        id="department"
                        className="flex items-center h-10 mt-1 border border-gray-200 rounded bg-gray-50"
                      >
                        <input
                          onChange={handleDepartment}
                          name="state"
                          id="dep"
                          value={data.Department}
                          placeholder="Department"
                          className="w-full px-4 text-gray-800 bg-transparent outline-none appearance-none"
                        />
                      </div>
                    </div>

                    <div className="md:col-span-3">
                      <label htmlFor="state">Date of Birth</label>
                      <div
                        id="dob"
                        className="flex items-center h-10 mt-1 border border-gray-200 rounded bg-gray-50"
                      >
                        <input
                          type="date"
                          id="date"
                          onChange={handleDob}
                          value={data.DateOfBirth}
                          onFocus="(this.type='date')"
                          name="DB"
                          placeholder="MM/DD/YYYY"
                          className="w-full px-4 text-gray-800 bg-transparent outline-none appearance-none"
                        />
                      </div>
                    </div>

                    <div className="ml-auto text-right md:col-span-6">
                      <div className="inline-flex items-end justify-end">
                        <div className="flex-row gap-10 pt-8">
                          <button
                            onClick={handleClear}
                            className="px-4 py-2 mr-6 font-bold bg-gray-300 border-b-2 rounded text-balck hover:bg-primary"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={handleSubmit}
                            className="px-4 py-2 font-bold text-white rounded bg-primary hover:bg-bold"
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
    </AdminLayout>
  );
};
export default AddMember;
