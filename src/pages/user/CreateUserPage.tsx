import { useAddUserMutation } from '@/entities/user/model/userApi';
import { UserFormData } from '@/features/user/user-form/schema';
import UserForm from '@/features/user/user-form/UserForm';
import { useAppDispatch } from '@/shared/hooks';
import { showToast } from '@/widgets/toast/model/slice';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function CreateUserPage() {
  const [addUser, { isLoading }] = useAddUserMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSubmit = async (data: UserFormData) => {
    await addUser(data).unwrap();
    navigate('/users');
    dispatch(
      showToast({
        message: 'User created successfully',
        severity: 'success',
      }),
    );
  };

  return (
    <Box p={4}>
      <Typography variant="h5" mb={2}>
        Create New User
      </Typography>
      <UserForm onSubmit={handleSubmit} isSubmitting={isLoading} />
    </Box>
  );
}
