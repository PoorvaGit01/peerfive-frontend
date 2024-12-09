import React from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";

// Define custom styles
const useStyles = makeStyles({
  container: {
    margin: "2rem",
  },
  table: {
    width: "100%",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "1rem",
  },
  createButton: {
    backgroundColor: "#FFBF2E !important",
    color: "black",
    "&:hover": {
      backgroundColor: "#F2B300",
    },
  },
});

const UsersList: React.FC = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const users = [
    { id: 1, name: "John Doe", p5Balance: 500, rewardBalance: 200 },
    { id: 2, name: "Jane Smith", p5Balance: 300, rewardBalance: 150 },
    { id: 3, name: "Alice Johnson", p5Balance: 400, rewardBalance: 180 },
  ];

  const theme = createTheme({
    palette: {
      mode: "dark", 
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.container}>
        <div className={classes.header}>
          <Typography variant="h4">Users List</Typography>
          <Button
            className={classes.createButton}
            onClick={() => navigate("/new")}
            variant="contained"
          >
            Create New User
          </Button>
        </div>

        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="users table">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>P5 Balance</TableCell>
                <TableCell>Reward Balance</TableCell>
                <TableCell>Login</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {users.map((user, index) => (
                <TableRow key={user.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.p5Balance}</TableCell>
                  <TableCell>{user.rewardBalance}</TableCell>
                  <TableCell>
                    <Button
                      className={classes.createButton}
                      variant="contained"
                      onClick={() => navigate(`/${user.id}`)}
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </ThemeProvider>
  );
};

export default UsersList;
