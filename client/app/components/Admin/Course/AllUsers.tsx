"use client";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Modal } from "@mui/material";
import { AiOutlineDelete, AiOutlineMail } from "react-icons/ai";
import { useTheme } from "next-themes";
import Loader from "../../Common/Loader.tsx/Loader";
import { format } from "timeago.js";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useUpdateUserRoleMutation,
} from "@/redux/features/user/userApi";
import { styles } from "@/app/styles/style";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
type Props = {
  isTeam: boolean;
};
const AllUsers = ({ isTeam }: Props) => {
  const { theme, setTheme } = useTheme();
  const [active, setActive] = useState(false);
  const [role, setRole] = useState("admin");
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [open, setOpen] = useState(false);
  const [deleteUser, { isSuccess: deleteSuccess, error: deleteError }] =
    useDeleteUserMutation({});
  const [updateUserRole, { isSuccess: updateSuccess, error: updateError }] =
    useUpdateUserRoleMutation({});

  const { isLoading, data, refetch } = useGetAllUsersQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );

  useEffect(() => {
    if (deleteSuccess) {
      refetch();
      toast.success("User deleted successfully!");
    }
    if (updateSuccess) {
      refetch();
      toast.success("User role updated successfully!");
    }

    if (updateError) {
      if ("data" in updateError) {
        // Fix the error data access
        const errorData = updateError.data as {
          success?: boolean;
          message?: string;
        };
        toast.error(errorData?.message || "Deletion Failed");
      } else {
        // Handle other types of errors
        toast.error("An unexpected error occurred");
      }
    }
    if (deleteError) {
      if ("data" in deleteError) {
        // Fix the error data access
        const errorData = deleteError.data as {
          success?: boolean;
          message?: string;
        };
        toast.error(errorData?.message || "Deletion Failed");
      } else {
        // Handle other types of errors
        toast.error("An unexpected error occurred");
      }
    }
  }, [deleteSuccess, deleteError, updateError, updateSuccess]);

  const handleDelete = () => {
    if (!isLoading) {
      deleteUser(userId);
    }
  };

  const handleSubmit = async () => {
    await updateUserRole({ email, role });
  };
  const columns = [
    { field: "id", headerName: "ID", flex: 0.25 },
    { field: "name", headerName: "Username", flex: 0.5 },
    { field: "email", headerName: "Email", flex: 0.5 },
    { field: "role", headerName: "Role", flex: 0.25 },
    { field: "purchased", headerName: "Purchased Courses", flex: 0.5 },
    { field: "created_at", headerName: "Created At", flex: 0.5 },
    {
      field: "delete",
      headerName: "Delete",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <Button
            onClick={() => {
              setOpen(!open);
              setUserId(params.row.id);
            }}
          >
            <AiOutlineDelete className="dark:text-white text-black" size={20} />
          </Button>
        );
      },
    },
    {
      field: "emailUser",
      headerName: "Mail User",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <Button>
            <a
              target="_blank"
              href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
                params.row.email
              )}`}
            >
              <AiOutlineMail className="dark:text-white text-black" size={20} />
            </a>
          </Button>
        );
      },
    },
  ];

  const rows: any[] = [];
  if (isTeam) {
    if (data && data.users) {
      const newData =
        data && data.users.filter((item: any) => item.role === "admin");
      newData.forEach((item: any) => {
        rows.push({
          id: item._id,
          name: item.name,
          email: item.email,
          role: item.role,
          purchased: item.courses.length,
          created_at: format(item.createdAt),
        });
      });
    }
  } else {
    if (data && data.users) {
      data.users.forEach((item: any) => {
        rows.push({
          id: item._id,
          name: item.name,
          email: item.email,
          role: item.role,
          purchased: item.courses.length,
          created_at: format(item.createdAt),
        });
      });
    }
  }

  return (
    <div className="mt-[120px]">
      {isLoading ? (
        <Loader />
      ) : (
        <Box m="20px">
          <div className="w-full flex justify-end mb-5">
            <button
              onClick={() => setActive(true)}
              className="flex cursor-pointer items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all hover:translate-y-[-1px]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              Add New Member
            </button>
          </div>
          <Box
            m="40px 0 0 0"
            height="80vh"
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
                outline: "none",
              },
              "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-sortIcon": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-row": {
                color: theme === "dark" ? "#fff" : "#000",
                borderBottom:
                  theme === "dark"
                    ? "1px solid #ffffff30!important"
                    : "1px solid #ccc!important",
              },
              // Fix row hover color
              "& .MuiDataGrid-row:hover": {
                backgroundColor:
                  theme === "dark"
                    ? "#2d3154 !important"
                    : "#e9e9fc !important",
              },
              // Fix selected row color
              "& .MuiDataGrid-row.Mui-selected": {
                backgroundColor:
                  theme === "dark"
                    ? "#353975 !important"
                    : "#c5c8ff !important",
              },
              // Fix selected row hover color
              "& .MuiDataGrid-row.Mui-selected:hover": {
                backgroundColor:
                  theme === "dark"
                    ? "#3c4084 !important"
                    : "#b9bcff !important",
              },
              "& .MuiTablePagination-root": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none!important",
              },
              "& .name-column--cell": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: theme === "dark" ? "#A4A9FC" : "#A4A9FC",
                borderBottom: "none",
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-columnHeadersInner": {
                backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
              },
              "& .MuiDataGrid-columnHeader": {
                backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
              },
              "& .MuiDataGrid-columnHeaderCheckbox": {
                backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: theme === "dark" ? "#1F2A40" : "#F2F0F0",
              },
              "& .MuiDataGrid-footerContainer": {
                color: theme === "dark" ? "#fff" : "#000",
                borderTop: "none",
                backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
              },
              "& .MuiCheckbox-root": {
                color:
                  theme === "dark" ? `#b7ebde !important` : `#000 !important`,
              },
              // Fix white header - toolbar containers
              "& .MuiDataGrid-toolbarContainer": {
                backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
                color: theme === "dark" ? "#fff" : "#000",
              },
              // Fix filter panel colors
              "& .MuiDataGrid-panelHeader": {
                backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
              },
              // Fix column menu
              "& .MuiMenu-paper": {
                backgroundColor: theme === "dark" ? "#1F2A40" : "#F2F0F0",
                color: theme === "dark" ? "#fff" : "#000",
              },
              // Fix column headers wrapper
              "& .MuiDataGrid-main": {
                backgroundColor: theme === "dark" ? "#000" : "#A4A9FC",
              },
              // Fix header row
              "& .MuiDataGrid-columnHeaderRow": {
                backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
              },
              // Fix top filter/toolbar section
              "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: theme === "dark" ? "#fff" : "#000 !important",
              },
              // Header borders
              "& .MuiDataGrid-columnSeparator": {
                color: theme === "dark" ? "#4c52b5" : "#8288e3",
              },
            }}
          >
            <DataGrid checkboxSelection rows={rows} columns={columns} />
          </Box>
          {active && (
            <Modal
              open={active}
              onClose={() => setActive(!active)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[450px] bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none">
                <h1 className={`${styles.title}`}>Add New Member</h1>
                <div className="mt-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email..."
                    className={`${styles.input}`}
                  />
                  <select
                    name=""
                    id=""
                    className={`${styles.input} !mt-6`}
                    onChange={(e: any) => setRole(e.target.value)}
                  >
                    <option
                      className="dark:text-black text-black"
                      value="admin"
                    >
                      Admin
                    </option>
                    <option className="dark:text-black text-black" value="user">
                      User
                    </option>
                  </select>
                  <br />
                  <div
                    className={`${styles.button} my-6 !h-[30px]`}
                    onClick={handleSubmit}
                  >
                    Submit
                  </div>
                </div>
              </Box>
            </Modal>
          )}

          {open && (
            <Modal
              open={open}
              onClose={() => setOpen(!open)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[450px] bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none">
                <h1 className={`${styles.title}`}>
                  Are you sure you want to delete this user?
                </h1>
                <div className="flex w-full items-center justify-between mb-6 mt-4">
                  <div
                    className={`${styles.button} !w-[120px] h-[30px] bg-[#57c7a3]`}
                    onClick={() => {
                      setOpen(!open);
                      setUserId("");
                    }}
                  >
                    Cancel
                  </div>
                  <div
                    className={`${styles.button} !w-[120px] h-[30px] bg-[#d63f3f]`}
                    onClick={() => {
                      setOpen(false);
                      handleDelete();
                    }}
                  >
                    Delete
                  </div>
                </div>
              </Box>
            </Modal>
          )}
        </Box>
      )}
    </div>
  );
};

export default AllUsers;
