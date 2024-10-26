import { DataGrid } from "@mui/x-data-grid";

export default function CustomDataGrid({
  rows = [],
  columns = [],
  pageSize = 10,
  pageSizeOptions = [10, 25, 50, 100],
  isLoading,
}) {
  return (
    <DataGrid
      rows={rows}
      columns={columns}
      pageSize={pageSize}
      initialState={{ pagination: { paginationModel: { pageSize: pageSize } } }}
      pageSizeOptions={pageSizeOptions}
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
          display: 'flex',
          alignItems:'center',
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
