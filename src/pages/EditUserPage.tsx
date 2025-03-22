import {
	useGetUsersQuery,
	useUpdateUserMutation,
} from '@/entities/userApi';
import UserForm, { UserFormData } from '@/features/user/UserForm';
import { Box, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditUserPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: users = [] } = useGetUsersQuery();
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const user = users.find((u) => u.id === Number(id));

  if (!user) return <Typography>User not found</Typography>;

  const handleSubmit = async (data: UserFormData) => {
    await updateUser({ id: Number(id), user: data }).unwrap();
    navigate('/users');
  };

  return (
    <Box p={4}>
      <Typography variant="h5" mb={2}>Edit User</Typography>
      <UserForm
        onSubmit={handleSubmit}
        initialValues={{
          name: user.name,
          email: user.email,
          phone: user.phone || '',
        }}
        isSubmitting={isLoading}
      />
    </Box>
  );
}
