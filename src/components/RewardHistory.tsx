import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Header from '../components/Navbar';
import axios from 'axios';

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

  const [rewardsBalance, setRewardsBalance] = useState<number>();  
  const [history, setHistory] = useState<any[]>([]);  

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/users/${id}/rewards`);
        const transactions = response.data;

        const updatedHistory = await Promise.all(
          transactions.map(async (transaction: any) => {
            const userResponse = await axios.get(`http://localhost:3000/users/${transaction.givenTo}`);
            return {
              ...transaction,
              userName: userResponse.data.name,
            };
          })
        );

        setHistory(updatedHistory);

        const res = await axios.get(`http://localhost:3000/users/${id}`);
        setRewardsBalance(res.data.p5Balance);
      } catch (error) {
        console.error('Error fetching rewards history:', error);
      }
    };

    fetchHistory();
  }, [id]); 

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <div style={{ marginTop: "70px" }}>
        <h1>Rewards History</h1>
        <div>
          <p>P5 Balance: {rewardsBalance}</p>
          <Button variant="contained" onClick={() => navigate(`/${id}/rewards/new`)} style={{ marginBottom: "10px" }}>
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
                <TableRow key={transaction._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{new Date(transaction.dateTime).toLocaleString()}</TableCell>
                  <TableCell>{transaction.points}</TableCell>
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
