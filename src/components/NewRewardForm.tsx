
import React, { useState, useEffect, ChangeEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Button,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  InputAdornment,
  Paper,
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Header from '../components/Navbar';

interface User {
  id: string;
  name: string;
  p5Balance: number;
}

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#FFEB3B' },
    background: { default: '#121212', paper: '#1E1E1E' },
    text: { primary: '#FFFFFF' },
  },
});

const NewReward: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [p5Balance, setP5Balance] = useState<number>(0);
  const [rewardAmount, setRewardAmount] = useState<string>('');
  const [selectedUser, setSelectedUser] = useState<string>('');
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    axios
      .get<User[]>('http://localhost:3000/users')
      .then((response) => {
        const fetchedUsers = response.data;
        const currentUser = fetchedUsers.find((user) => user._id === id);

        if (currentUser) {
          setP5Balance(currentUser.p5Balance);
        }

        const availableUsers = fetchedUsers.filter((user) => user._id !== id);
        setUsers(availableUsers);
      })
      .catch((error) => console.error('Error fetching users:', error));
  }, [id]);

  const handleRewardAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRewardAmount(e.target.value);
  };

  const handleSubmit = () => {
    const pointsToSend = parseInt(rewardAmount, 10);
    
    if (!selectedUser || pointsToSend <= 0 || pointsToSend > p5Balance) {
      return;
    }
  
    const payload = {
      givenBy: id!,
      givenTo: selectedUser,
      points: pointsToSend,
    };
  
    axios
      .post(`http://localhost:3000/p5/`, payload)
      .then(() => {
        alert('Reward sent successfully!');
        navigate(`/${id}/rewards`);
      })
      .catch((error) => {
        console.error('Error sending reward:', error.response ? error.response.data : error.message);
        alert('Failed to send reward.');
      });
  };

  const isSubmitDisabled =
    !rewardAmount ||
    parseInt(rewardAmount, 10) > 100 ||
    parseInt(rewardAmount, 10) > p5Balance ||
    !selectedUser;

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <div style={{ marginTop: '60px' }}>
        <h1>Create New Reward</h1>
        <Paper sx={{ padding: 2, backgroundColor: '#1E1E1E' }}>
          <FormControl fullWidth margin="normal">
            <InputLabel>User</InputLabel>
            <Select
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              label="User"
              fullWidth
            >
              {users.map((user) => (
                <MenuItem key={user._id} value={user._id}>
                  {user.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Reward Amount"
            type="number"
            value={rewardAmount}
            onChange={handleRewardAmountChange}
            fullWidth
            margin="normal"
            InputProps={{
              startAdornment: <InputAdornment position="start">P5</InputAdornment>,
            }}
            inputProps={{ min: 1, max: 100 }}
            error={
              parseInt(rewardAmount, 10) > 100 ||
              parseInt(rewardAmount, 10) > p5Balance
            }
            helperText={
              parseInt(rewardAmount, 10) > 100
                ? 'Maximum reward amount is 100 P5.'
                : parseInt(rewardAmount, 10) > p5Balance
                ? `Insufficient balance. You only have ${p5Balance} P5.`
                : ''
            }
          />

          <p>Current P5 Balance: {p5Balance}</p>

          <div>
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={isSubmitDisabled}
              sx={{ marginRight: 2 }}
            >
              Submit
            </Button>

            <Button
              variant="outlined"
              onClick={() => navigate(`/${id}/rewards`)}
            >
              Cancel
            </Button>
          </div>
        </Paper>
      </div>
    </ThemeProvider>
  );
};

export default NewReward;
