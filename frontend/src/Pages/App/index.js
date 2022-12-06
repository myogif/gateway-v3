import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import { setPageActive } from "../../features/appContainer/appContainerSlice";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";

import SideBar from "../../Components/SideBar";
import NavBar from "../../Components/NavBar";
import StatusPage from "../StatusPage";
import FunctionPage from "../FunctionPage";

const drawerWidth = 240;
const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function App() {
  const { pageActive } = useSelector((state) => state.appContainer);
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <NavBar handleDrawerOpen={handleDrawerOpen} open={open} />
      <SideBar
        theme={theme}
        handleDrawerClose={handleDrawerClose}
        open={open}
        onClickLink={(e) =>
          dispatch(setPageActive(e.target.textContent.toLowerCase()))
        }
      />

      <Main open={open}>
        <DrawerHeader />
        {pageActive === "home" || pageActive === "status" ? (
          <StatusPage />
        ) : null}
        {pageActive === "function" ? <FunctionPage /> : null}
      </Main>
    </Box>
  );
}
