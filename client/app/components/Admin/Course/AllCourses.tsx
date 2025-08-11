"use client";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Modal } from "@mui/material";
import { AiOutlineDelete } from "react-icons/ai";
import { LiaEditSolid } from "react-icons/lia";
import { useTheme } from "next-themes";
import {
  useDeleteCourseMutation,
  useGetAllCoursesQuery,
} from "@/redux/features/course/courseApi";
import Loader from "../../Common/Loader.tsx/Loader";
import { format } from "timeago.js";
import { useEffect, useState } from "react";
import { styles } from "@/app/styles/style";
import toast from "react-hot-toast";
import Link from "next/link";
const AllCourses = () => {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [courseId, setCourseId] = useState("");

  const { isLoading, data, refetch } = useGetAllCoursesQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const [deleteCourse, { isSuccess: deleteSuccess, error: deleteError }] =
    useDeleteCourseMutation({});

  const handleDelete = () => {
    if (!isLoading) {
      deleteCourse(courseId);
    }
  };

  useEffect(() => {
    if (deleteSuccess) {
      refetch();
      toast.success("Course deleted successfully!");
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
  }, [deleteSuccess, deleteError]);
  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "title", headerName: "Course Title", flex: 1 },
    { field: "ratings", headerName: "Ratings", flex: 0.5 },
    { field: "purchased", headerName: "Purchased", flex: 0.5 },
    { field: "created_at", headerName: "Created At", flex: 0.5 },
    {
      field: "edit",
      headerName: "Edit",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <Link href={`/admin/edit-course/${params.row.id}`}>
            <Button>
              <LiaEditSolid className="dark:text-white text-black" size={20} />
            </Button>
          </Link>
        );
      },
    },
    {
      field: "delete",
      headerName: "Delete",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <Button
            onClick={() => {
              setOpen(!open);
              setCourseId(params.row.id);
            }}
          >
            <AiOutlineDelete className="dark:text-white text-black" size={20} />
          </Button>
        );
      },
    },
  ];

  const rows: any[] = [];
  if (data && data.courses) {
    data.courses.forEach((item: any) => {
      rows.push({
        id: item._id,
        title: item.name,
        ratings: item.ratings,
        purchased: item.purchased,
        created_at: format(item.createdAt),
      });
    });
  }

  return (
    <div className="mt-[120px]">
      {isLoading ? (
        <Loader />
      ) : (
        <Box m="20px">
          <Box
            m="40px 0 0 0"
            height="80vh"
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
                outline: "none",
                borderRadius: "12px",
                overflow: "hidden",
              },
              "& .MuiDataGrid-sortIcon": {
                color: "#fff",
              },
              "& .MuiDataGrid-row": {
                color:
                  theme === "dark" ? "#fff !important" : "#1a1a1a !important",
                borderBottom: "1px solid rgba(255,255,255,0.1)",
                "&:hover": {
                  backgroundColor: "rgba(100, 116, 139, 0.1) !important",
                },
                "&.Mui-selected": {
                  backgroundColor: "rgba(59, 130, 246, 0.15) !important",
                  "&:hover": {
                    backgroundColor: "rgba(59, 130, 246, 0.25) !important",
                  },
                },
              },
              "& .MuiTablePagination-root": {
                color: "#fff",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
                fontSize: "14px",
              },
              // Unified blue header theme
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#3b82f6",
                borderBottom: "none",
                color: "#fff",
                fontSize: "15px",
                fontWeight: "600",
              },
              "& .MuiDataGrid-columnHeadersInner": {
                backgroundColor: "#3b82f6",
              },
              "& .MuiDataGrid-columnHeader": {
                backgroundColor: "#3b82f6",
                color: "#fff",
              },
              "& .MuiDataGrid-columnHeaderCheckbox": {
                backgroundColor: "#3b82f6",
              },
              "& .MuiDataGrid-columnHeaderTitle": {
                fontWeight: "600",
                color: "#fff",
              },
              // Body background adapts to theme
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor:
                  theme === "dark"
                    ? "#1e293b !important"
                    : "#f8fafc !important",
              },
              // Footer matches header
              "& .MuiDataGrid-footerContainer": {
                color: "#fff",
                borderTop: "none",
                backgroundColor: "#3b82f6",
                borderBottomLeftRadius: "12px",
                borderBottomRightRadius: "12px",
              },
              "& .MuiCheckbox-root": {
                color: "#fff !important",
              },
              "& .MuiDataGrid-toolbarContainer": {
                backgroundColor: "#3b82f6",
                color: "#fff",
                borderTopLeftRadius: "12px",
                borderTopRightRadius: "12px",
              },
              "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: "#fff !important",
              },
              "& .MuiDataGrid-columnSeparator": {
                color: "rgba(255,255,255,0.3)",
              },
              // Menu and panel styling
              "& .MuiDataGrid-panelHeader": {
                backgroundColor: "#3b82f6",
                color: "#fff",
              },
              "& .MuiMenu-paper": {
                backgroundColor:
                  theme === "dark"
                    ? "#334155 !important"
                    : "#ffffff !important",
                color:
                  theme === "dark" ? "#fff !important" : "#1a1a1a !important",
                boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
                borderRadius: "8px",
              },
              // Icon colors
              "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": {
                color: "#fff",
              },
              "& .MuiDataGrid-menuIconButton": {
                color: "#fff",
              },
              "& .MuiDataGrid-filterIcon": {
                color: "#fff",
              },
            }}
          >
            <DataGrid
              disableRowSelectionOnClick
              checkboxSelection
              rows={rows}
              columns={columns}
            />
          </Box>
          {open && (
            <Modal
              open={open}
              onClose={() => setOpen(!open)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[450px] bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none">
                <h1 className={`${styles.title}`}>
                  Are you sure you want to delete this course?
                </h1>
                <div className="flex w-full items-center justify-between mb-6 mt-4">
                  <div
                    className={`${styles.button} !w-[120px] h-[30px] bg-[#57c7a3]`}
                    onClick={() => {
                      setOpen(!open);
                      setCourseId("");
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

export default AllCourses;
