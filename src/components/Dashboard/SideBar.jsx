import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import List from "@mui/material/List";
import MuiDrawer from "@mui/material/Drawer";
import { styled } from "@mui/material/styles";

/* Left Icons */
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import ForumIcon from "@mui/icons-material/Forum";
import EditIcon from "@mui/icons-material/Edit";

/* Left Icons */
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
// import BaherOsama from "../../assets/BaherOsama.JPG";

import { useLocation, useNavigate } from "react-router-dom";
import { grey } from "@mui/material/colors";
import { primaryColor } from "../../../theme";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function getInitials(name) {
  if (!name) return "";
  const words = name.trim().split(" ");
  if (words.length === 1) return words[0].charAt(0).toUpperCase();
  return (words[0].charAt(0) + words[1].charAt(0)).toUpperCase();
}

export default function SideBar({ open, handleDrawerClose }) {
  /* dh haygbly el location ely ana fyh dlw2ty 3shan ka2no active kda a7ot lon 3al icon */
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const drawerWidth = 240;

  const userName = currentUser?.name || "Guest User";
  const userRole = currentUser?.role || "guest";
  const userImage = currentUser?.image;

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),

    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));

  const openedMixin = (theme) => ({
    width: drawerWidth,
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
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
      width: `calc(${theme.spacing(8)} + 1px)`,
    },
  });

  const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme }) => ({
    width: drawerWidth,
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

  const path = location.pathname.replace(/^\/dashboard\/?/, "");

  const firstArray = [
    { text: "Home", Icon: <HomeOutlinedIcon />, path: "" },
    {
      text: "Manage Properties",
      Icon: <LocationCityIcon />,
      path: "propertiesData",
    },
    { text: "Property Editor", Icon: <EditIcon />, path: "propertyManagement" },
    { text: "Messages", Icon: <ForumIcon />, path: "messages" },
  ];

  return (
    <Drawer variant="permanent" open={open}>
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeftIcon />
        </IconButton>
      </DrawerHeader>

      {/* ha3ml condition law open azbt el props law false ashyl el text wel klam dh  */}
      <Avatar
        sx={{
          mx: "auto ",
          width: open ? 80 : 50,
          fontWeight: 600,
          height: open ? 80 : 50,
          mb: open ? 1 : 0,
          mt: open ? 1 : 2,
          transition: "0.3s",
          fontSize: open ? 30 : 20,
        }}
        alt={userName}
        src={userImage}
      >
        {!userImage && getInitials(userName)}
      </Avatar>
      <Typography
        sx={{ mx: "auto ", fontSize: open ? 17 : 0, transition: "0.3s" }}
      >
        {userName}
      </Typography>
      <Typography
        sx={{
          mx: "auto ",
          color: primaryColor,
          fontWeight: 600,
          fontSize: open ? 15 : 0,
          mb: 1,
          transition: "0.3s",
        }}
      >
        {userRole}
      </Typography>

      <Divider />

      <List>
        {firstArray.map((item) => (
          <ListItem key={item.path} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              onClick={() => {
                navigate(item.path);
                console.log(location.pathname);
                console.log(item.path);
              }}
              sx={[
                {
                  minHeight: 48,
                  px: 2.5,

                  bgcolor: path === item.path ? grey[300] : "transparent",
                  "&:hover": {
                    bgcolor:
                      path === item.path ? grey[300] : "rgba(0,0,0,0.04)",
                  },
                },
                open
                  ? {
                      justifyContent: "initial",
                    }
                  : {
                      justifyContent: "center",
                    },
              ]}
            >
              <ListItemIcon
                sx={[
                  {
                    minWidth: 0,
                    justifyContent: "center",
                    color: primaryColor,
                  },
                  open
                    ? {
                        mr: 3,
                      }
                    : {
                        mr: "auto",
                      },
                ]}
              >
                {item.Icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={[
                  open
                    ? {
                        opacity: 1,
                      }
                    : {
                        opacity: 0,
                      },
                ]}
              />
            </ListItemButton>
            <Divider />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
