import React, { useEffect, useState } from "react";
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
import axios from "axios";

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

interface User {
  _id: string;
  name: string;
  p5Balance: number;
  rewardBalance: number;
}

const UsersList: React.FC = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const theme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.get<User[]>("http://localhost:3000/users");
        setUsers(response.data); 
      } catch (err) {
        setError("Failed to fetch users.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

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

        {loading && <Typography variant="h6">Loading...</Typography>}
        {error && (
          <Typography variant="h6" color="error">
            {error}
          </Typography>
        )}

        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="users table">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>P5 Balance</TableCell>
                <TableCell>Reward Balance</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {users.map((user, index) => (
                <TableRow key={user._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.p5Balance}</TableCell>
                  <TableCell>{user.rewardBalance}</TableCell>
                  <TableCell>
                    <Button
                      className={classes.createButton}
                      variant="contained"
                      onClick={() => navigate(`/users/${user._id}`)}
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
