import { useAddUserMutation } from '@/entities/userApi';
import UserForm, { UserFormData } from '@/features/user/UserForm';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function CreateUserPage() {
  const [addUser, { isLoading }] = useAddUserMutation();
  const navigate = useNavigate();

  const handleSubmit = async (data: UserFormData) => {
    await addUser(data).unwrap();
    navigate('/users');
  };

  return (
    <Box p={4}>
      <Typography variant="h5" mb={2}>Create New User</Typography>
      <UserForm onSubmit={handleSubmit} isSubmitting={isLoading} />
    </Box>
  );
}
