import AdminLayout from "@/components/layouts/AdminLayout/AdminLayout";
import { toast } from "react-toastify";
import { auth } from "../../../../../../config/firebase";
import {
  doc,
  getDocs,
  getDoc,
  collection,
  addDoc,
  updateDoc,
} from "firebase/firestore";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { db } from "../../../../../../context/DbContext";
import Router from "next/router";
const router = Router;
const AddMember = () => {
  const currentPage = usePathname();
  let i = currentPage.lastIndexOf("edit/");
  const id = currentPage.slice(i + 5);
  const [data, setData] = useState({
    Name: "",
    Address: "",
    Email: "",
    Gender: "",
    Department: "",
    PhoneNumber: "",
    DateOfBirth: new Date("10/10/2030").toDateString(),
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

  const getMem = async () => {
    const docRef = doc(db, "KalCompany", "Users", "StaffMembers", id);
    // const user = ;
    const mem = await getDoc(docRef);
    let tempTask = [];
    let tempReport = [];
    let tempGroup = [];
    const task =
      mem._document.data.value.mapValue.fields.Tasks.arrayValue.values;
    const report =
      mem._document.data.value.mapValue.fields.Reports.arrayValue.values;
    const group =
      mem._document.data.value.mapValue.fields.GroupId.arrayValue.values;
    if (task) {
      task.forEach((t) => {
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

    setData({
      Name: mem._document.data.value.mapValue.fields.Name.stringValue,
      Email: mem._document.data.value.mapValue.fields.Email.stringValue,
      Address: mem._document.data.value.mapValue.fields.Address.stringValue,
      Gender: mem._document.data.value.mapValue.fields.Gender.stringValue,
      PhoneNumber:
        mem._document.data.value.mapValue.fields.PhoneNumber.stringValue,
      Department:
        mem._document.data.value.mapValue.fields.Department.stringValue,
      DateOfBirth:
        mem._document.data.value.mapValue.fields.DateOfBirth.stringValue,
      ProfilePic:
        mem._document.data.value.mapValue.fields.ProfilePic.stringValue,
      RegisteredAt:
        mem._document.data.value.mapValue.fields.RegisteredAt.stringValue,
      GroupId: tempGroup,
      Reports: tempReport,
      Tasks: tempTask,
    });
    console.log(mem);
  };
  useEffect(() => {
    getMem();
  }, []);
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


      auth.currentUser.getIdToken(true).then((idToken) => {
        const TOKEN = idToken
        const url = `http://localhost:5000/api/users/${id}`;

        const user_info = `{
            "displayName": "${data.Name}",
            "email" : "${data.Email}"
        }`;

        fetch(url, {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${TOKEN}`,
            'Content-Type': 'application/json',
          },
          body: user_info,
        }).then(async (cred) => {
          console.log(cred)
          const docRef = doc(db, "KalCompany", "Users", "StaffMembers", id);
          updateDoc(docRef, data)
            .then((docRef) => {
              handleClear();
              toast.success("Member edited successfully");
            })
            .catch((error) => {
              console.log(error);
            });

        }).catch((error) => {
          console.log(error);

          if (error === "auth/id-token-expired") {
            toast.error("LogIn session has expired Please login again");
            setTimeout(() => {
              signOut();
            }, 5000);
          }
        })

      })


      // const docRef = doc(db, "KalCompany", "Users", "StaffMembers", id);
      // updateDoc(docRef, data)
      //   .then((docRef) => {
      //     handleClear();
      //     toast.success("Member edited successfully");
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });
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
    data.DateOfBirth = new Date("10/10/2030").toDateString();
    date.placeholder = "MM/DD/YYYY";
    dep.value = "";
    data.Department = "";
    dep.placeholder = "Department";
    select.value = "null";
    data.Gender = "";
  };
  return (
    <AdminLayout>
      <div className="flex min-h-screen justify-center bg-gray-100 p-6 pt-8">
        <div className="container mx-auto max-w-screen-lg">
          <form>
            <h2 className="pb-4 pt-0 text-xl font-semibold text-gray-600">
              Edit Member
            </h2>
            <div className="mb-6 rounded bg-white p-4 px-4 shadow-sm md:p-8">
              <div className="grid grid-cols-1 gap-4 gap-y-2 text-sm lg:grid-cols-3">
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

                {/* <div className="bg-white rounded shadow-sm p-4 px-4 md:p-8 mb-6">
                  <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                    <div className="text-gray-600">
                      <p className="font-medium text-lg pb-3 pl-4">Employee Details</p>
                      <img src="/images/form1.svg" alt="form" width={250} height={800} className="pt-10 sm:pb-3" />
                    </div> */}

                <div className="lg:col-span-2 ">
                  <div className="grid grid-cols-1 gap-6 gap-y-5 text-sm md:grid-cols-6">
                    <div className="md:col-span-3">
                      <label htmlFor="full_name">Full Name</label>
                      <input
                        onChange={handleName}
                        value={data.Name}
                        type="text"
                        name="full_name"
                        id="full_name"
                        className="mt-1 h-10 w-full rounded border  bg-gray-50 px-4"
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
                        className="mt-1 h-10 w-full rounded border bg-gray-50 px-4"
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
                        className="mt-1 h-10 w-full rounded border bg-gray-50 px-4"
                        placeholder=""
                      />
                    </div>

                    <div id="genderDiv" className="md:col-span-3">
                      <label htmlFor="Gender">Gender</label>
                      <select
                        id="selectGender"
                        className="mt-1 h-10 w-full rounded border bg-gray-50 px-4"
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
                        className="mt-1 flex h-10 items-center rounded border border-gray-200 bg-gray-50"
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
                          className="w-full appearance-none bg-transparent px-4 text-gray-800 outline-none"
                        />
                      </div>
                    </div>

                    <div className="md:col-span-3">
                      <label htmlFor="state">Department</label>
                      <div
                        id="department"
                        className="mt-1 flex h-10 items-center rounded border border-gray-200 bg-gray-50"
                      >
                        <input
                          onChange={handleDepartment}
                          name="state"
                          id="dep"
                          value={data.Department}
                          placeholder="Department"
                          className="w-full appearance-none bg-transparent px-4 text-gray-800 outline-none"
                        />
                      </div>
                    </div>

                    <div className="md:col-span-3">
                      <label htmlFor="state">Date of Birth</label>
                      <div
                        id="dob"
                        className="mt-1 flex h-10 items-center rounded border border-gray-200 bg-gray-50"
                      >
                        <input
                          type="date"
                          id="date"
                          onChange={handleDob}
                          value={data.DateOfBirth}
                          name="DB"
                          placeholder="MM/DD/YYYY"
                          className="w-full appearance-none bg-transparent px-4 text-gray-800 outline-none"
                        />
                      </div>
                    </div>

                    <div className="ml-auto text-right md:col-span-6">
                      <div className="inline-flex items-end justify-end">
                        <div className="flex-row gap-10 pt-8">
                          <button
                            onClick={handleClear}
                            className="text-balck mr-6 rounded  border-b-2 bg-gray-300 px-4 py-2 font-bold hover:bg-primary"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={handleSubmit}
                            className="rounded bg-primary px-4 py-2 font-bold text-white hover:bg-bold"
                          >
                            Edit
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
