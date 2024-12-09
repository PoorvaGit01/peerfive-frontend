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

const P5History = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [p5Balance, setP5Balance] = useState<number>(); 
  const [history, setHistory] = useState<any[]>([]); 

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/users/${id}/p5`);
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
        setP5Balance(res.data.p5Balance);

      } catch (error) {
        console.error('Error fetching P5 history:', error);
      }
    };

    fetchHistory();
  }, [id]); 

  const handleDelete = async (transactionId: string, points: number) => {
    try {
      await axios.delete(`http://localhost:3000/p5/${transactionId}`);
      
      setHistory(prevHistory => prevHistory.filter(item => item._id !== transactionId));
      setP5Balance(prevBalance => prevBalance + points); 
    } catch (error) {
      console.error('Error deleting P5 transaction:', error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <div style={{ marginTop: "70px" }}>
        <h1>P5 History</h1>
        <div>
          <p>P5 Balance: {p5Balance}</p>
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
                <TableCell>P5 Given</TableCell>
                <TableCell>User Name</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {history.map((transaction, index) => (
                <TableRow key={transaction._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{new Date(transaction.dateTime).toLocaleString()}</TableCell>
                  <TableCell>{transaction.points}</TableCell> 
                  <TableCell>{transaction.userName}</TableCell> 
                  <TableCell>
                    <Button
                      variant="contained"
                      onClick={() => handleDelete(transaction._id, transaction.points)}
                    >
                      Delete
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

export default P5History;
