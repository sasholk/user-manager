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
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'email', headerName: 'Email', width: 250 },
    { field: 'phone', headerName: 'Phone', width: 200 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
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
    <Box sx={{ height: 500, width: '100%' }}>
      <DataGrid
        rows={users}
        columns={columns}
        getRowId={(row) => row.id}
        pageSizeOptions={[10, 20, 50]}
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
        }}
        disableRowSelectionOnClick
      />
    </Box>
  );
}
