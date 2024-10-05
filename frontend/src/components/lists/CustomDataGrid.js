import { DataGrid } from "@mui/x-data-grid";

export default function CustomDataGrid({
  rows,
  columns,
  pageSize,
  rowsPerPageOptions,
  isLoading,
}) {
  return (
    <DataGrid
      rows={rows || []}
      columns={columns || []}
      pageSize={pageSize || 10}
      rowsPerPageOptions={rowsPerPageOptions || [5, 10, 20]}
      disableSelectionOnClick
      disableColumnResize
      disableColumnSelector
      disableDensitySelector
      hideFooterSelectedRowCount
      autoHeight
      loading={isLoading}
      slotProps={{
        toolbar: {
          printOptions: { disableToolbarButton: true },
          csvOptions: { disableToolbarButton: true },
        },
      }}
      sx={{
        "& .MuiDataGrid-cell:focus, .MuiDataGrid-cell:focus-within, .MuiDataGrid-columnHeader:focus-within,":
          {
            outline: "none !important",
          },
        "& .MuiDataGrid-cell": {
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
