import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import InventoryOutlinedIcon from "@mui/icons-material/InventoryOutlined";
import HandshakeOutlinedIcon from "@mui/icons-material/HandshakeOutlined";
import LoyaltyOutlinedIcon from "@mui/icons-material/LoyaltyOutlined";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { HomeOutlined } from "@mui/icons-material";
import { useRouter } from "next/router";
import { useSidebar } from "@/contexts/SidebarContext";
import { useLogout } from "@/hooks/account";

export const SIDEBAR_WIDTH = 280;

export default function Sidebar() {
  const { isSidebarOpen, openSidebarHandler, closeSidebarHandler } =
    useSidebar();

  return (
    <Box component="aside" display="flex">
      <Drawer variant="permanent" open={isSidebarOpen} role="navigation">
        <Stack
          height={64}
          alignItems={isSidebarOpen ? "flex-end" : "center"}
          paddingRight={isSidebarOpen ? 2 : 0}
          justifyContent="center"
        >
          {!isSidebarOpen && (
            <IconButton
              onClick={openSidebarHandler}
              title="Abrir menu lateral"
              aria-label="Abrir menu lateral"
              aria-controls="sidebar-menu"
              aria-expanded={isSidebarOpen}
            >
              <ChevronRightIcon />
            </IconButton>
          )}
          {isSidebarOpen && (
            <IconButton
              onClick={closeSidebarHandler}
              title="Fechar menu lateral"
              aria-label="Fechar menu lateral"
              aria-controls="sidebar-menu"
              aria-expanded={isSidebarOpen}
            >
              <ChevronLeftIcon />
            </IconButton>
          )}
        </Stack>
        <Divider />
        <Stack
          component="nav"
          flex={1}
          sx={{ overflowY: "auto", overflowX: "hidden" }}
        >
          <SidebarItem Icon={HomeOutlined} label="Home" path="/" />
          <SidebarItem
            Icon={InventoryOutlinedIcon}
            label="Estoque e movimentações"
            path="/estoque"
          />
          <SidebarItem
            Icon={Inventory2OutlinedIcon}
            label="Produtos"
            path="/produtos"
          />
          <SidebarItem
            Icon={LoyaltyOutlinedIcon}
            label="Categorias de produto"
            path="/categorias-produto"
          />
          <SidebarItem
            Icon={HandshakeOutlinedIcon}
            label="Fornecedores"
            path="/fornecedores"
          />
        </Stack>
        <Divider />
        <LogoutContainer />
      </Drawer>
    </Box>
  );
}

function SidebarItem({ Icon, label, path }) {
  const { isSidebarOpen } = useSidebar();
  const router = useRouter();

  const handleNavigation = () => {
    router.push(path || "/");
  };

  return (
    <List disablePadding>
      <ListItem sx={{ p: 1 }}>
        <ListItemButton
          title={!isSidebarOpen ? label : ""}
          aria-labelledby={`sidebar-item-${label}`}
          aria-label={label}
          sx={{
            pl: 2,
            pr: 2,
            minHeight: 48,
            justifyContent: isSidebarOpen ? "initial" : "center",
          }}
          onClick={handleNavigation}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              justifyContent: "center",
              mr: isSidebarOpen ? 2 : "auto",
            }}
          >
            {Icon && <Icon aria-hidden="true" />}
          </ListItemIcon>
          <ListItemText
            id={`sidebar-item-${label}`}
            primary={<Typography variant="body1">{label}</Typography>}
            sx={{ display: isSidebarOpen ? "block" : "none" }}
          />
        </ListItemButton>
      </ListItem>
    </List>
  );
}

function LogoutContainer() {
  const { mutateAsync: logout } = useLogout();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <Stack onClick={handleLogout} sx={{ cursor: "pointer", p: 2 }}>
      <Typography>Sair</Typography>
    </Stack>
  );
}

const openedMixin = (theme) => ({
  width: SIDEBAR_WIDTH,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: 72,
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  width: SIDEBAR_WIDTH,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
      },
    },
  ],
}));
