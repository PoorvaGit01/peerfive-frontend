import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Button,
  TextField,
  Paper,
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import axios from 'axios';
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

  const [user, setUser] = useState<any | null>(null); // Store user data
  const [loading, setLoading] = useState<boolean>(false); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  // Fetch user data when component mounts
  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:3000/users/${id}`);
        setUser(response.data); // Assuming the API returns a user object
      } catch (err) {
        setError('Failed to fetch user details.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchUser();
    }
  }, [id]); 

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <div>
        <h1>View User</h1>
        <Paper sx={{ padding: 2, backgroundColor: '#1E1E1E', marginTop: '70px' }}>
          {user && (
            <>
              <TextField
                label="User Name"
                value={user.name}
                fullWidth
                margin="normal"
                InputProps={{
                  readOnly: true,
                }}
              />
              <Button
                variant="contained"
                onClick={() => console.log('User saved:', user)}
                sx={{ marginTop: 2, marginRight: 2 }}
              >
                Save
              </Button>

              <div style={{ marginTop: 16 }}>
                <Button
                  variant="outlined"
                  onClick={() => navigate(`/${id}/p5`)}
                  sx={{ marginRight: 2 }}
                >
                  View P5 Balance: {user.p5Balance}
                </Button>

                <Button
                  variant="outlined"
                  onClick={() => navigate(`/${id}/rewards`)}
                >
                  View Reward Balance: {user.rewardsBalance}
                </Button>
              </div>
            </>
          )}
        </Paper>
      </div>
    </ThemeProvider>
  );
};

export default ViewUser;

