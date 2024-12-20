
import { useState } from 'react';
import { Button, TextField, Container, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Header from '../components/Navbar';

const useStyles = makeStyles(() => ({
  container: {
    height: '80vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#242424 !important',
    color: '#fff',
  },
  formWrapper: {
    backgroundColor: '#333 !important', 
    padding: '2rem',
    borderRadius: '8px',
    width: '400px', 
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
  inputField: {
    marginBottom: '1.5rem !important',
  },
  button: {
    backgroundColor: '#FFBF2E !important', 
    color: '#000 !important', 
    '&:hover': {
      backgroundColor: '#F2B300',
    },
    width: '100%',
    marginBottom: '1rem !important', 
  },
  cancelButton: {
    color: '#000 !important', 
    borderColor: '#FFBF2E !important',
    width: '100% !important',
  },
}));

interface UserFormProps {
  onSubmit: (data: any) => void;
  initialData?: any;
}

function UserForm({ onSubmit, initialData = {} }: UserFormProps) {
  const classes = useStyles();
  const [name, setName] = useState(initialData.name || '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();  

    const userData = { name };

    try {
      const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Failed to create user');
      }

      const data = await response.json();

      onSubmit(data);

      setName('');

    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <Header /> 
      <div className={classes.container}>
        <Container component="main" maxWidth="xs">
          <Paper className={classes.formWrapper}>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                fullWidth
                className={classes.inputField}
              />
              <Button
                variant="contained"
                type="submit"
                className={classes.button}
              >
                Save
              </Button>
              <Button
                variant="outlined"
                onClick={() => window.history.back()}
                className={`${classes.cancelButton} ${classes.button}`}
              >
                Cancel
              </Button>
            </form>
          </Paper>
        </Container>
      </div>
    </>
  );
}

export default UserForm;

