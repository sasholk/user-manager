import { useDeleteUserMutation } from '@/entities/user';
import { useAppDispatch } from '@/shared/hooks';
import { showToast } from '@/widgets/toast/model/slice';
import { Button } from '@mui/material';

export function DeleteUserButton({ id }: { id: number }) {
  const dispatch = useAppDispatch();
  const [deleteUser] = useDeleteUserMutation();

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      await deleteUser(id);
      dispatch(
        showToast({
          message: 'User deleted successfully',
          severity: 'success',
        }),
      );
    }
  };

  return (
    <Button
      variant="outlined"
      color="error"
      size="small"
      onClick={handleDelete}
    >
      Delete
    </Button>
  );
}
