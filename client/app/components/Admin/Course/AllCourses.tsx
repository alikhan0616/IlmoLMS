"use client";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import { AiOutlineDelete } from "react-icons/ai";
import { LiaEditSolid } from "react-icons/lia";
import { useTheme } from "next-themes";
import { useGetAllCoursesQuery } from "@/redux/features/course/courseApi";
import Loader from "../../Common/Loader.tsx/Loader";
import { format } from "timeago.js";
const AllCourses = () => {
  const { theme, setTheme } = useTheme();

  const { isLoading, data, error } = useGetAllCoursesQuery({});

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
          <Button>
            <LiaEditSolid className="dark:text-white text-black" size={20} />
          </Button>
        );
      },
    },
    {
      field: "delete",
      headerName: "Delete",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <Button>
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
        </Box>
      )}
    </div>
  );
};

export default AllCourses;
