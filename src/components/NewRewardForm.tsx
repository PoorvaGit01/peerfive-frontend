import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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

const NewReward = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [p5Balance, setP5Balance] = useState(150); 
  const [rewardAmount, setRewardAmount] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [users] = useState([
    { id: '1', name: 'John Doe' },
    { id: '2', name: 'Jane Smith' },
    { id: '3', name: 'Alice Johnson' },
    { id: '4', name: 'Bob Lee' },
  ]);

  const filteredUsers = users.filter(user => user.id !== id);

  const handleRewardAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRewardAmount(e.target.value);
  };

  const handleSubmit = () => {
    if (parseInt(rewardAmount) <= p5Balance) {
      setP5Balance(p5Balance - parseInt(rewardAmount));
      navigate(`/${id}/rewards`);
    }
  };

  const isSubmitDisabled = !rewardAmount || parseInt(rewardAmount) > 100 || parseInt(rewardAmount) > p5Balance;

  return (
    <ThemeProvider theme={theme}>
      <Header></Header>
      <div style={{marginTop:"60px"}}>
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
              {filteredUsers.map(user => (
                <MenuItem key={user.id} value={user.id}>
                  {user.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Rewards Amount"
            type="number"
            value={rewardAmount}
            onChange={handleRewardAmountChange}
            fullWidth
            margin="normal"
            InputProps={{
              startAdornment: <InputAdornment position="start">P5</InputAdornment>,
            }}
            inputProps={{ min: 1, max: 100 }}
            error={parseInt(rewardAmount) > 100 || parseInt(rewardAmount) > p5Balance}
            helperText={
              parseInt(rewardAmount) > 100
                ? 'Maximum reward amount is 100 P5.'
                : parseInt(rewardAmount) > p5Balance
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

            <Button variant="outlined" onClick={() => navigate(`/${id}/rewards`)}>
              Cancel
            </Button>
          </div>
        </Paper>
      </div>
    </ThemeProvider>
  );
};

export default NewReward;
