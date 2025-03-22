import { useDeleteUserMutation, useGetUsersQuery } from '@/entities/userApi';
import { Box, Button, CircularProgress, Stack } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';

export default function UsersPage() {
  const navigate = useNavigate();

  const { data = [], isLoading, isError } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();

  const handleEdit = (id: number) => {
    navigate(`/users/edit/${id}`);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      await deleteUser(id);
    }
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'email', headerName: 'Email', width: 250 },
    { field: 'phone', headerName: 'Phone', width: 200 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Button
            variant="outlined"
            color="primary"
            size="small"
            onClick={() => handleEdit(params.row.id)}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={() => handleDelete(params.row.id)}
          >
            Delete
          </Button>
        </Stack>
      ),
    },
  ];

  return (
    <Box sx={{ height: 500, width: '100%' }}>
      <Stack direction="row" justifyContent="space-between" mb={2}>
        <h2>User List</h2>
        <Button variant="contained" onClick={() => navigate('/users/new')}>
          Create User
        </Button>
      </Stack>

      {isLoading ? (
        <CircularProgress />
      ) : isError ? (
        <p>Error fetching users</p>
      ) : (
        <DataGrid
          rows={data}
          columns={columns}
          getRowId={(row) => row.id}
          pageSizeOptions={[10, 20, 50]}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          disableRowSelectionOnClick
        />
      )}
    </Box>
  );
}
