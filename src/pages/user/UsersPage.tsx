import { useGetUsersQuery } from '@/entities/user/model/userApi';
import { UserTable } from '@/widgets/users-table/UsersTable';
import { Alert, Box, Button, CircularProgress, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function UsersPage() {
  const navigate = useNavigate();
  const { data = [], isLoading, isError } = useGetUsersQuery();

  return (
    <Box sx={{ height: 500, width: '100%' }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Box component="h2">User List</Box>

        <Button variant="contained" onClick={() => navigate('/users/new')}>
          Create User
        </Button>
      </Stack>

      {isLoading ? (
        <CircularProgress />
      ) : isError ? (
        <Alert severity="error">Failed to load users</Alert>
      ) : (
        <UserTable users={data} />
      )}
    </Box>
  );
}
