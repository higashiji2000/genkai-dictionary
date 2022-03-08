import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
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
    <AppBar position="fixed">
      <Toolbar>
        <Typography
          variant="h1"
          sx={{ fontSize: "1.5rem", flex: 1 }}
          onClick={() => {
            navigate("/");
          }}
        >
          限界辞典
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
  );
};