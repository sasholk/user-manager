import { User } from '@/entities/user';
import { DeleteUserButton } from '@/features/user/DeleteUserButton';
import { EditUserButton } from '@/features/user/EditUserButton';
import { Box, Stack } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

interface Props {
  users: User[];
}

export function UserTable({ users }: Props) {
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', flex: 0.2 },
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1.5 },
    { field: 'phone', headerName: 'Phone', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 0.6,
      headerAlign: 'right',
      renderCell: (params) => (
        <>
          <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
            alignItems="center"
            height="100%"
            width="100%"
          >
            <EditUserButton id={params.row.id} />
            <DeleteUserButton id={params.row.id} />
          </Stack>
        </>
      ),
    },
  ];

  return (
    <Box sx={{ width: '100%' }}>
      <DataGrid
        rows={users}
        columns={columns}
        getRowId={(row) => row.id}
        pageSizeOptions={[5, 10, 20, 50]}
        initialState={{
          pagination: { paginationModel: { pageSize: 20 } },
        }}
        disableRowSelectionOnClick
      />
    </Box>
  );
}
