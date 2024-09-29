import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Sidebar from "./Sidebar";

export default function MainLayout({ children }) {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, overflow: 'auto'}}>
        {children}
      </Box>
    </Box>
  );
}
