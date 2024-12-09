import React, {  } from "react";
import { AppBar, Toolbar, Typography, Container } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  navbar: {
    backgroundColor: "black !important",
    color: "white",
    width: "100%",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rightItems: {
    display: "flex",
    gap: "1rem",
  },
  button: {
    backgroundColor: "#FFBF2E !important",
    color: "black !important",
    fontWeight: "bold",
    textTransform: "capitalize",
    "&:hover": {
      backgroundColor: "#F2B300",
    },
  },
});

const Navbar: React.FC = () => {
  const classes = useStyles();

  return (
    <AppBar className={classes.navbar}>
      <Container>
        <Toolbar className={classes.toolbar}>
          {/* Logo */}
          <Typography variant="h6">Mini Peerfives</Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
