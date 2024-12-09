import UserForm from '../components/UserForm';
import { useNavigate } from 'react-router-dom';

function NewUserPage() {
  const navigate = useNavigate();

  const handleSubmit = (data: any) => {
    console.log('New User Data:', data);
    navigate('/');
  };

  return <UserForm onSubmit={handleSubmit} />;
}

export default NewUserPage;
