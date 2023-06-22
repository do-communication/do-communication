import AdminLayout from "@/components/layouts/AdminLayout/AdminLayout";
import Link from "next/link";
import { db } from "../../../../context/DbContext";
import { toast } from "react-toastify";
import {
  doc,
  getDocs,
  getDoc,
  collection,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { useState, useEffect, useCallback } from "react";
import Router from "next/router";
const router = Router;
import { FaPersonCircleCheck } from "react-icons/fa";
import {
  AiFillDelete,
  AiFillEdit,
  AiOutlinePlus,
  AiOutlineSearch,
} from "react-icons/ai";
import { BiDotsVertical, BiUserMinus, BiUserPlus, BiX } from "react-icons/bi";
import { HiDocumentChartBar } from "react-icons/hi2";
import { MdChecklist, MdGroup } from "react-icons/md";
import { TbMessage } from "react-icons/tb";
import dynamic from "next/dynamic";

const ClientOnlyTable = dynamic(() => import("react-data-table-component"), {
  ssr: false,
});

const ManageGroup = () => {
  const [allGroups, setallGroups] = useState([]);
  const [groups, setGroups] = useState(allGroups);
  const [search, setSearch] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [clearSelectedRows, setClearSelectedRows] = useState(false); // this is used to clear the selected rows
  const [showManageGroupMenu, setShowManageGroupMenu] = useState(false);
  const users = [];
  const getData = async () => {
    let arr = [];
    const all = collection(db, "KalCompany", "Groups", "Groups");
    try {
      const doc = await getDocs(all);
      doc.forEach((d) => {
        arr.push({ id: d.id, data: d.data() });
      });
    } catch (err) {
      console.log(err);
      setTasks([{ Name: "check your connection" }]);
    }

    setGroups(arr);
    setallGroups(arr);
  };
  // search for groups using group name
  useEffect(() => {
    const filteredData = allGroups.filter(
      (item) =>
        (item.data.Name &&
          item.data.Name.toLowerCase().includes(search.toLowerCase())) ||
        (item.data.Type &&
          item.data.Type.toLowerCase().includes(search.toLowerCase()))
    );

    if (search) {
      setGroups(filteredData);
    } else {
      setGroups(allGroups);
    }
  }, [search]);
  //loading till fetch
  const [pending, setPending] = useState(true);
  const [rows, setRows] = useState([]);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setRows(allGroups);
      setPending(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  const columns = [
    {
      name: "Group Name",
      selector: (row) => row.data.Name,
      sortable: true,
    },
    {
      name: "Type",
      selector: (row) => row.data.Type,
    },
  ];
  const fetchGroup = async (groupId, index) => {
    const docRef = doc(db, "KalCompany", "Groups", "Groups", groupId);
    const mem = await getDoc(docRef);
    let tempTask = [];
    let tempReport = [];
    let tempGroup = [];
    let tempPeople = [];
    let lead = "";
    const task =
      mem._document.data.value.mapValue.fields.Tasks.arrayValue.values;
    const report =
      mem._document.data.value.mapValue.fields.Reports.arrayValue.values;
    const group =
      mem._document.data.value.mapValue.fields.Members.arrayValue.values;
    const people =
      mem._document.data.value.mapValue.fields.People.arrayValue.values;
    var j = 0;
    if (people) {
      people.forEach((p) => {
        if (p) {
          if (j == index) {
            lead = p.stringValue;
          }
          tempPeople.push(p.stringValue);
          users.push(p.stringValue);
          j += 1;
        }
      });
    }
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

    const data = {
      People: tempPeople,
      Type: mem._document.data.value.mapValue.fields.Type.stringValue,
      Name: mem._document.data.value.mapValue.fields.Name.stringValue,
      Members: tempGroup,
      Reports: tempReport,
      Tasks: tempTask,
      Learder: lead,
    };

    handleAssign(groupId, data);
    const leaderRef = doc(
      db,
      "KalCompany",
      "Users",
      "StaffMembers",
      data.People[index]
    );
    const selected = await getDoc(leaderRef);
    const n = selected._document.data.value.mapValue.fields.Name.stringValue;
    toast.success(`${n} is assigned as a leader of this group`);
  };
  const handleClick = async (i, name) => {
    const docRef = doc(db, "KalCompany", "Users", "StaffMembers", i);
    const mem = await getDoc(docRef);
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
          if (g.stringValue != name) {
            tempGroup.push(g.stringValue);
          }
        }
      });
    }
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
    updateDoc(docRef, newData)
      .then((docRef) => {
        console.log(
          "A New Document Field has been added to an existing document"
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleAssign = async (groupId, data) => {
    // setData({...data, Learder:data.People[index]});
    const groupRef = doc(db, "KalCompany", "Groups", "Groups", groupId);
    console.log(data);
    updateDoc(groupRef, data)
      .then((groupRef) => {
        console.log(
          "A New Document Field has been added to an existing document"
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleRemove = async (groupId, index) => {
    const docRef = doc(db, "KalCompany", "Groups", "Groups", groupId);
    const mem = await getDoc(docRef);
    let tempTask = [];
    let tempReport = [];
    let tempGroup = [];
    let tempPeople = [];
    const task =
      mem._document.data.value.mapValue.fields.Tasks.arrayValue.values;
    const report =
      mem._document.data.value.mapValue.fields.Reports.arrayValue.values;
    const group =
      mem._document.data.value.mapValue.fields.Members.arrayValue.values;
    const people =
      mem._document.data.value.mapValue.fields.People.arrayValue.values;
    // var j = 0;
    if (group) {
      group.forEach((g) => {
        if (g) {
          if (g.stringValue !== index) {
            tempGroup.push(g.stringValue);
          }
        }
      });
    }
    if (people) {
      people.forEach((p) => {
        if (p) {
          // if(j == index){
          //   lead = p.stringValue;
          // }
          tempPeople.push(p.stringValue);
          users.push(p.stringValue);
          // j += 1;
        }
      });
    }
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

    const data = {
      People: tempPeople,
      Type: mem._document.data.value.mapValue.fields.Type.stringValue,
      Name: mem._document.data.value.mapValue.fields.Name.stringValue,
      Members: tempGroup,
      Reports: tempReport,
      Tasks: tempTask,
      Learder: mem._document.data.value.mapValue.fields.Learder.stringValue,
    };

    handleAssign(groupId, data);
    toast.success(`${index} is removed from this group`);
    getData();
  };
  const handleRowSelected = useCallback((state) => {
    setSelectedRows(state.selectedRows);
  }, []);

  useEffect(() => {
    getData();
  }, []);

  return (
    <AdminLayout>
      <div className="grid min-h-full grid-cols-3 gap-x-6 gap-y-6">
        <div className="order-last col-span-full md:order-first md:col-span-2">
          <h1 className="mb-4 text-3xl font-semibold">Manage Groups</h1>
          <div className="flex flex-col gap-4 mb-4 sm:flex-row sm:justify-between md:items-center">
            <Link
              href="/admin/groups/create"
              className="flex items-center justify-center gap-2 px-4 py-2 text-base font-semibold rounded-lg bg-primary hover:bg-secondary"
            >
              <AiOutlinePlus /> Create Group
            </Link>
            <div className="flex justify-between pr-4 bg-white border-gray-700 rounded-md ">
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-11/12 py-2 pl-4 bg-transparent outline-none"
                placeholder="Search from groups"
              />
              <AiOutlineSearch className="w-6 h-auto" />
            </div>
          </div>
          <ClientOnlyTable
            columns={columns}
            data={groups}
            selectableRows
            onSelectedRowsChange={handleRowSelected}
            selectableRowsSingle={true}
            selectableRowsNoSelectAll={true}
            clearSelectedRows={clearSelectedRows}
            progressPending={pending}
            pagination={true}
          />
        </div>
        <div className="border-none col-span-full border-primary md:col-span-1 md:border-l-4">
          {/* if no row is selected */}
          {selectedRows.length === 0 && (
            <div className="flex items-center justify-center w-full h-full text-xl">
              <p>Select group to see details</p>
            </div>
          )}

          {selectedRows.length === 1 && (
            <div className="flex flex-col">
              <div className="relative flex justify-between sm:justify-end">
                <button
                  onClick={() => {
                    setSelectedRows([]);
                    setClearSelectedRows(true);
                  }}
                  className="block sm:hidden"
                >
                  <BiX className="h-auto w-9 hover:text-gray-600" />
                </button>
                <button
                  onClick={() => setShowManageGroupMenu(!showManageGroupMenu)}
                >
                  <BiDotsVertical className="w-8 h-auto hover:text-gray-600" />
                </button>
                {showManageGroupMenu && (
                  <ul className="absolute right-2 top-9 z-10 flex w-52 flex-col gap-2 rounded border-2 border-secondary bg-[#90c7ea] p-2 duration-300">
                    <li className="p-1 rounded hover:bg-primary">
                      <button
                        onClick={() => {
                          router.push(
                            `/admin/task/group/${selectedRows[0].id}`
                          );
                        }}
                        className="flex items-center gap-2"
                      >
                        <MdChecklist className="w-5 h-auto" /> Tasks
                      </button>
                    </li>
                    <li className="p-1 rounded hover:bg-primary">
                      <button
                        onClick={() => {
                          router.push(
                            `/admin/reports/group/${selectedRows[0].id}`
                          );
                        }}
                        className="flex items-center gap-2"
                      >
                        <MdChecklist className="w-5 h-auto" /> Reports
                      </button>
                    </li>
                    <li className="p-1 rounded hover:bg-primary">
                      <button
                        onClick={() => {
                          router.push(
                            `/admin/groups/edit/${selectedRows[0].id}`
                          );
                        }}
                        className="flex items-center gap-2"
                      >
                        <AiFillEdit className="w-5 h-auto" /> Edit Group
                      </button>
                    </li>
                    <li className="p-1 rounded hover:bg-primary">
                      <button
                        className="flex items-center gap-2"
                        onClick={async (e) => {
                          e.stopPropagation();
                          setSelectedRows([]);
                          setClearSelectedRows(true);
                          const id = selectedRows[0].id;
                          selectedRows[0].data.Members.map((m) => {
                            handleClick(m.id, selectedRows[0].data.Name);
                          });
                          const check = confirm(
                            "Do you want to delete the group?"
                          );
                          if (check) {
                            const docRef = doc(
                              db,
                              "KalCompany",
                              "Groups",
                              "Groups",
                              id
                            );
                            await deleteDoc(docRef);
                            getData();
                            toast.success("Group deleted successfully");
                          }
                        }}
                      >
                        <AiFillDelete className="w-5 h-auto" /> Delete Group
                      </button>
                    </li>
                  </ul>
                )}
              </div>
              <div className="flex flex-col items-center justify-center">
                <div className="flex items-center justify-center w-20 h-20 bg-red-400 rounded-full">
                  <MdGroup className="w-12 h-12" />
                </div>
                <h4 className="mt-1 text-xl font-semibold capitalize">
                  {selectedRows[0].data.Name}
                </h4>
                <p className="text-sm">{selectedRows[0].data.Type}</p>
              </div>
              <div className="relative flex justify-center py-4">
                <button className="p-2 text-white rounded-full bg-secondary bg-opacity-80">
                  <TbMessage className="w-8 h-auto" />
                </button>
              </div>

              <div className="w-full h-full p-2 ml-2 bg-gray-200 rounded-xl">
                <h3 className="p-2 text-lg font-semibold">Members</h3>

                <ul className="flex flex-col gap-2 overflow-y-auto max-h-64">
                  {selectedRows[0].data.Members &&
                    selectedRows[0].data.Members.map((row, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 rounded-md hover:bg-secondary hover:bg-opacity-25"
                      >
                        <p>{row}</p>
                        <div className="flex gap-2">
                          {selectedRows[0].data.Learder !== users[index] && (
                            <button
                              onClick={async () => {
                                await fetchGroup(selectedRows[0].id, index);
                              }}
                              className="flex items-center gap-1 p-1 px-4 text-white rounded-lg bg-secondary hover:bg-primary"
                            >
                              Assign Leader
                            </button>
                          )}
                        </div>
                        <button
                          onClick={async () => {
                            await handleRemove(selectedRows[0].id, row);
                          }}
                          className="flex gap-2"
                        >
                          <div className="flex items-center gap-1 p-1 px-2 text-red-600">
                            {/* < BiX className="w-5 h-auto" /> */}
                            Remove
                          </div>
                        </button>
                      </div>
                    ))}
                  {/* <Link
                    href="/admin/memebers/{userId}"
                    className="flex items-center justify-between p-2 rounded-md hover:bg-opacity-25 hover:bg-secondary"
                  >
                    <p>Senait Gobezie</p>
                    <div className="flex gap-2">
                      <button className="flex items-center gap-1 p-1 px-2 text-white rounded-lg bg-secondary hover:bg-primary">
                        <BiUserPlus className="w-5 h-auto" />
                        Assign Leader
                      </button>
                    </div>
                  </Link>
                  <Link
                    href="/admin/memebers/{userId}"
                    className="flex items-center justify-between p-2 rounded-md hover:bg-opacity-25 hover:bg-secondary"
                  >
                    <p>Senait Gobezie</p>
                    <div className="flex gap-2">
                      <button className="flex items-center gap-1 p-1 px-2 text-white rounded-lg bg-secondary hover:bg-primary">
                        <BiUserPlus className="w-5 h-auto" />
                        Assign Leader
                      </button>
                    </div>
                  </Link> */}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default ManageGroup;
