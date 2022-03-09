import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();
  const [anchorEl, setanchorEl] = useState<HTMLElement | undefined>(undefined);
  const open = Boolean(anchorEl);

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    setanchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setanchorEl(undefined);
  };

  return (
    <>
      <AppBar position="fixed">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography
            variant="h1"
            sx={{ fontSize: "1.5rem" }}
            onClick={() => {
              navigate("/");
            }}
          >
            GenkaiDictionary
          </Typography>
          <IconButton color="inherit" onClick={handleClick}>
            <MenuIcon />
          </IconButton>
          <Menu open={open} anchorEl={anchorEl} onClose={handleClose}>
            <MenuItem
              onClick={() => {
                navigate("search");
                handleClose();
              }}
            >
              search
            </MenuItem>
            <MenuItem
              onClick={() => {
                navigate("view");
                handleClose();
              }}
            >
              view
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Box sx={{ mt: { xs: "56px", sm: "64px" } }}></Box>
    </>
  );
};
