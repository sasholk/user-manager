import { useDeleteUserMutation } from '@/entities/user';
import { Button } from '@mui/material';
import { useState } from 'react';
import { ConfirmModal } from './ConfirmModal';

interface Props {
  id: number;
}

export function DeleteUserButton({ id }: Props) {
  const [deleteUser] = useDeleteUserMutation();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    await deleteUser(id);
    handleClose();
  };

  return (
    <>
      <Button
        variant="outlined"
        color="error"
        size="small"
        onClick={handleClickOpen}
      >
        Delete
      </Button>

      <ConfirmModal
        open={open}
        handleClose={handleClose}
        handleDelete={handleDelete}
      />
    </>
  );
}
