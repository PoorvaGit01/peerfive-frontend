import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Button,
  TextField,
  Paper,
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Header from '../components/Navbar';

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

const ViewUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    id: id,
    name: 'John Doe',
    p5Balance: 150,
    rewardsBalance: 200,
  });

  // Handle form changes
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser(prevState => ({ ...prevState, name: e.target.value }));
  };

  const handleSave = () => {
    console.log('User saved:', user);
  };

  return (
    <ThemeProvider theme={theme}>
      <Header></Header>
      <div>
        <h1>View User</h1>
        <Paper sx={{ padding: 2, backgroundColor: '#1E1E1E',marginTop:"70px" }}>
          <TextField
            label="User Name"
            value={user.name}
            onChange={handleNameChange}
            fullWidth
            margin="normal"
            InputProps={{
              readOnly: true, 
            }}
          />
          
          {/* Save Button */}
          <Button
            variant="contained"
            onClick={handleSave}
            sx={{ marginTop: 2, marginRight: 2 }}
          >
            Save
          </Button>

          <div style={{ marginTop: 16 }}>
            {/* P5 Balance Button */}
            <Button
              variant="outlined"
              onClick={() => navigate(`/${id}/p5`)}
              sx={{ marginRight: 2 }}
            >
              View P5 Balance: {user.p5Balance}
            </Button>

            {/* Reward Balance Button */}
            <Button
              variant="outlined"
              onClick={() => navigate(`/${id}/rewards`)}
            >
              View Reward Balance: {user.rewardsBalance}
            </Button>
          </div>
        </Paper>
      </div>
    </ThemeProvider>
  );
};

export default ViewUser;
