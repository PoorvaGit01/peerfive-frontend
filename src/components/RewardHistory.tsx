import  { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Header from '../components/Navbar';

// Create a dark theme
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#FFEB3B',
    },
    background: {
      default: '#121212', 
      paper: '#1E1E1E',
    },
    text: {
      primary: '#FFFFFF', 
    },
  },
});

const RewardsHistory = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [rewardsBalance] = useState(150);  
  const [history] = useState([
    { id: '1', dateTime: '2024-12-01T10:00:00', rewardsReceived: 10, userName: 'John Doe' },
    { id: '2', dateTime: '2024-12-02T12:30:00', rewardsReceived: 5, userName: 'Jane Smith' },
    { id: '3', dateTime: '2024-12-03T14:15:00', rewardsReceived: 20, userName: 'Alice Johnson' },
    { id: '4', dateTime: '2024-12-04T16:45:00', rewardsReceived: 15, userName: 'Bob Lee' },
  ]);

  return (
    <ThemeProvider theme={theme}>
      <Header></Header>
      <div style={{marginTop:"70px"}}>
      <h1>Create New Reward</h1>
        <div>
          <p>Rewards Balance: {rewardsBalance}</p>
          <Button variant="contained" onClick={() => navigate(`/${id}/rewards/new`)} style={{marginBottom:"10px"}}>
            Create New Reward
          </Button>
        </div>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Date-Time</TableCell>
                <TableCell>Rewards Received</TableCell>
                <TableCell>User Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {history.map((transaction, index) => (
                <TableRow key={transaction.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{new Date(transaction.dateTime).toLocaleString()}</TableCell>
                  <TableCell>{transaction.rewardsReceived}</TableCell>
                  <TableCell>{transaction.userName}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </ThemeProvider>
  );
};

export default RewardsHistory;
