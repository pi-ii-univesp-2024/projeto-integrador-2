import { createContext, useState, useContext } from "react";

const SidebarContext = createContext();

export const useSidebar = () => useContext(SidebarContext);

export const SidebarProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const openSidebarHandler = () => setIsSidebarOpen(true);
  const closeSidebarHandler = () => setIsSidebarOpen(false);

  return (
    <SidebarContext.Provider
      value={{ isSidebarOpen, openSidebarHandler, closeSidebarHandler }}
    >
      {children}
    </SidebarContext.Provider>
  );
};
