import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";

export default function CustomDataGrid({
  rows = [],
  columns = [],
  pageSize = 10,
  pageSizeOptions = [10, 25, 50, 100],
  paginationMode = "server",
  sortingMode = "server",
  rowCount = 0,
  offset,
  setOffset,
  isLoading,
  handleSortModelChange,
}) {
  const [paginationModel, setPaginationModel] = useState({
    page: offset / pageSize,
    pageSize: pageSize,
  });

  const handlePaginationModelChange = (offset) => {
    setPaginationModel({
      page: offset.page,
      pageSize: pageSize,
    });
    setOffset && setOffset(offset.page * pageSize);
  };

  const customPageSizeOptions =
    paginationMode === "client" ? pageSizeOptions : [pageSize];

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      rowCount={rowCount}
      pageSize={pageSize}
      sortingMode={sortingMode}
      paginationMode={paginationMode}
      paginationModel={paginationModel}
      pageSizeOptions={customPageSizeOptions}
      onPaginationModelChange={handlePaginationModelChange}
      onSortModelChange={handleSortModelChange}
      loading={isLoading}
      disableSelectionOnClick
      disableColumnResize
      disableColumnSelector
      disableDensitySelector
      disableColumnMenu
      hideFooterSelectedRowCount
      autoHeight
      slotProps={{
        loadingOverlay: {
          variant: "linear-progress",
          noRowsVariant: "linear-progress",
        },
      }}
      sx={{
        "& .MuiDataGrid-cell:focus, .MuiDataGrid-cell:focus-within, .MuiDataGrid-columnHeader:focus-within":
          {
            outline: "none !important",
          },
        "& .MuiDataGrid-cell": {
          display: "flex",
          alignItems: "center",
          "& *": {
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          },
        },
      }}
    />
  );
}
