import { useState } from 'react';
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

const P5History = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [p5Balance, setP5Balance] = useState(100); 
  const [history, setHistory] = useState([
    { id: '1', dateTime: '2024-12-01T10:00:00', p5Given: 10, userName: 'John Doe' },
    { id: '2', dateTime: '2024-12-02T12:30:00', p5Given: 5, userName: 'Jane Smith' },
    { id: '3', dateTime: '2024-12-03T14:15:00', p5Given: 20, userName: 'Alice Johnson' },
    { id: '4', dateTime: '2024-12-04T16:45:00', p5Given: 15, userName: 'Bob Lee' },
  ]);

  // Handle delete (reversal of P5)
  const handleDelete = (transactionId: string) => {
    setHistory(prevHistory => prevHistory.filter(item => item.id !== transactionId));
    setP5Balance(prevBalance => prevBalance + 10);
  };

  return (
    <ThemeProvider theme={theme}>
      <Header></Header>
      <div style={{marginTop:"70px"}}>
        <h1>P5 History</h1>
        <div>
          <p>P5 Balance: {p5Balance}</p>
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
                <TableCell>P5 Given</TableCell>
                <TableCell>User Name</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {history.map((transaction, index) => (
                <TableRow key={transaction.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{new Date(transaction.dateTime).toLocaleString()}</TableCell>
                  <TableCell>{transaction.p5Given}</TableCell>
                  <TableCell>{transaction.userName}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      onClick={() => handleDelete(transaction.id)}
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
